import express from "express";
import cors from "cors";

export type RsvpStatus = "pending" | "attend" | "decline";

export interface Guest {
  studentId: string;
  name: string;
  status: RsvpStatus;
  respondedAt: string | null;
  createdAt: string;
}

export interface EventRecord {
  id: string;
  partyName: string;
  date: string;
  time: string;
  place: string;
  guests: Guest[];
  createdAt: string;
}

// In-memory store — resets on redeploy/cold start. Swap for a real database later.
const events = new Map<string, EventRecord>();

const app = express();
app.use(cors());
app.use(express.json());

function findGuest(event: EventRecord, studentId: string, name: string) {
  return event.guests.find(
    (guest) => guest.studentId === studentId && guest.name === name,
  );
}

app.post("/api/events", (req, res) => {
  const { id, partyName, date, time, place, guests } = req.body ?? {};
  if (!id || !partyName || !date || !time || !place || !Array.isArray(guests)) {
    return res.status(400).json({
      error: "INVALID_BODY",
      message: "id, partyName, date, time, place, guests가 모두 필요해요.",
    });
  }

  const record: EventRecord = {
    id,
    partyName,
    date,
    time,
    place,
    guests: guests.map(
        (guest: { studentId: string; name: string; createdAt?: string }) => ({
        studentId: guest.studentId,
        name: guest.name,
        status: "pending",
        respondedAt: null,
        createdAt: guest.createdAt ?? new Date().toISOString(),
      }),
    ),
    createdAt: new Date().toISOString(),
  };

  events.set(id, record);
  res.status(201).json(record);
});

app.get("/api/events", (_req, res) => {
  res.json([...events.values()].sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)));
});

app.get("/api/events/:id", (req, res) => {
  const event = events.get(req.params.id);
  if (!event) {
    return res.status(404).json({ error: "NOT_FOUND", message: "초대장을 찾을 수 없어요." });
  }
  res.json(event);
});

app.post("/api/events/:id/lookup", (req, res) => {
  const event = events.get(req.params.id);
  if (!event) {
    return res.status(404).json({ error: "NOT_FOUND", message: "초대장을 찾을 수 없어요." });
  }

  const { studentId, name } = req.body ?? {};
  const guest = findGuest(event, studentId, name);
  if (!guest) {
    return res.status(404).json({
      error: "GUEST_NOT_FOUND",
      message: "일치하는 정보를 찾을 수 없어요. 학번과 이름을 다시 확인해주세요.",
    });
  }

  res.json({
    guestName: guest.name,
    partyName: event.partyName,
    date: `${event.date}T${event.time}:00+09:00`,
    place: event.place,
    status: guest.status,
  });
});

app.post("/api/events/:id/rsvp", (req, res) => {
  const event = events.get(req.params.id);
  if (!event) {
    return res.status(404).json({ error: "NOT_FOUND", message: "초대장을 찾을 수 없어요." });
  }

  const { studentId, name, status } = req.body ?? {};
  if (status !== "attend" && status !== "decline") {
    return res.status(400).json({
      error: "INVALID_STATUS",
      message: "status는 attend 또는 decline이어야 해요.",
    });
  }

  const guest = findGuest(event, studentId, name);
  if (!guest) {
    return res.status(404).json({
      error: "GUEST_NOT_FOUND",
      message: "일치하는 정보를 찾을 수 없어요. 학번과 이름을 다시 확인해주세요.",
    });
  }

  guest.status = status;
  guest.respondedAt = new Date().toISOString();

  res.json({
    guestName: guest.name,
    partyName: event.partyName,
    date: `${event.date}T${event.time}:00+09:00`,
    place: event.place,
    status: guest.status,
  });
});

export default app;
