import express from 'express';
import cors from 'cors';

type RsvpStatus = 'PENDING' | 'ATTENDING' | 'NOT_ATTENDING';

interface Guest {
  guestId: string;
  studentId: string;
  name: string;
  status: RsvpStatus;
  respondedAt: string | null;
}

const EVENT = {
  eventName: '가을 생일파티',
  eventDate: '2026-10-15T18:00:00+09:00',
  eventLocation: '학생회관 2층 라운지',
};

// In-memory mock data — swap for a real database later.
// TODO: /api/admin/roster has no auth yet — add an admin token check before shipping.
const guests: Guest[] = [
  { guestId: 'g_abc123', studentId: '10203', name: '김은샘', status: 'PENDING', respondedAt: null },
  { guestId: 'g_abc124', studentId: '10204', name: '박태수', status: 'PENDING', respondedAt: null },
  { guestId: 'g_abc125', studentId: '10215', name: '이지훈', status: 'NOT_ATTENDING', respondedAt: new Date().toISOString() },
];

const app = express();
app.use(cors());
app.use(express.json());

function toInvitation(guest: Guest) {
  return {
    guestId: guest.guestId,
    eventName: EVENT.eventName,
    eventDate: EVENT.eventDate,
    eventLocation: EVENT.eventLocation,
    personalMessage: `${guest.name}님을 위한 초대장이에요.`,
    status: guest.status,
  };
}

app.post('/api/guests/lookup', (req, res) => {
  const { studentId, name } = req.body ?? {};
  const guest = guests.find((g) => g.studentId === studentId && g.name === name);
  if (!guest) {
    return res.status(404).json({
      error: 'NOT_FOUND',
      message: '일치하는 정보를 찾을 수 없어요. 학번과 이름을 다시 확인해주세요.',
    });
  }
  res.json(toInvitation(guest));
});

app.get('/api/invitations/:guestId', (req, res) => {
  const guest = guests.find((g) => g.guestId === req.params.guestId);
  if (!guest) {
    return res.status(404).json({ error: 'NOT_FOUND', message: '초대장을 찾을 수 없어요.' });
  }
  res.json(toInvitation(guest));
});

app.post('/api/rsvp', (req, res) => {
  const { guestId, status } = req.body ?? {};
  const guest = guests.find((g) => g.guestId === guestId);
  if (!guest) {
    return res.status(404).json({ error: 'NOT_FOUND', message: '초대 정보를 찾을 수 없어요.' });
  }
  if (status !== 'ATTENDING' && status !== 'NOT_ATTENDING') {
    return res.status(400).json({ error: 'INVALID_STATUS', message: 'status는 ATTENDING 또는 NOT_ATTENDING이어야 해요.' });
  }
  guest.status = status;
  guest.respondedAt = new Date().toISOString();
  res.json({ guestId: guest.guestId, status: guest.status, respondedAt: guest.respondedAt });
});

app.get('/api/admin/roster', (_req, res) => {
  const summary = guests.reduce(
    (acc, g) => {
      if (g.status === 'ATTENDING') acc.attending += 1;
      else if (g.status === 'NOT_ATTENDING') acc.notAttending += 1;
      else acc.noResponse += 1;
      return acc;
    },
    { attending: 0, notAttending: 0, noResponse: 0, total: guests.length },
  );
  res.json({ summary, guests });
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
app.listen(PORT, () => {
  console.log(`모임초대 API listening on http://localhost:${PORT}`);
});
