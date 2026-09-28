import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import {
  Content,
  BackButton,
  Card,
  AddCard,
  CardTitle,
  InfoGrid,
  FieldBox,
  AddRow,
  PrimaryButton,
  Hint,
  BulkTextarea,
  BulkActions,
  OutlineButton,
  Notice,
  ListCard,
  ListHeader,
  ListTitle,
  ListCount,
  QrCard,
  QrBox,
  QrInfo,
  QrTitle,
  QrDesc,
  LinkRow,
  LinkText,
  TableWrap,
  Table,
  StatusBadge,
  EmptyRow,
  Actions,
  CancelButton,
  SaveButton,
} from "./styles/createInvitationPage.style";
import { ErrorBox, Label, Input } from "./styles/loginPage.style";
import FormField from "../components/FormField";
import { saveInvitation } from "../storage/invitations";

interface Guest {
  key: number;
  studentId: string;
  name: string;
  createdAt: string;
}

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2.2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

const pad = (n: number) => String(n).padStart(2, "0");

function formatNow() {
  const d = new Date();
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const USER_URL = import.meta.env.VITE_USER_URL ?? "http://localhost:5173";

let nextGuestKey = 1;
const createGuest = (studentId: string, name: string): Guest => ({
  key: nextGuestKey++,
  studentId,
  name,
  createdAt: formatNow(),
});

// 엑셀에서 복사하면 탭, CSV 파일은 쉼표로 열이 구분된다.
function parseGuests(text: string) {
  const parsed: { studentId: string; name: string }[] = [];
  let skipped = 0;

  text.split(/\r?\n/).forEach((line, index) => {
    if (!line.trim()) return;
    const [studentId = "", name = ""] = line
      .split(/[\t,]/)
      .map((cell) => cell.trim().replace(/^"|"$/g, ""));

    if (index === 0 && studentId === "학번") return;
    if (!studentId || !name) {
      skipped += 1;
      return;
    }
    parsed.push({ studentId, name });
  });

  return { parsed, skipped };
}

export default function CreateInvitationPage() {
  const [partyName, setPartyName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [bulkText, setBulkText] = useState("");
  const [addNotice, setAddNotice] = useState<{
    tone: "info" | "error";
    text: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  // TODO: 초대장 생성 API 연동 시 서버에서 발급한 초대장 id로 교체
  const [inviteId] = useState(() =>
    crypto.randomUUID().replaceAll("-", "").slice(0, 10),
  );
  const [copied, setCopied] = useState(false);
  const inviteUrl = `${USER_URL}/e/${inviteId}`;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const addGuests = (rows: { studentId: string; name: string }[]) => {
    const existing = new Set(guests.map((g) => g.studentId));
    const fresh = rows.filter((row) => {
      if (existing.has(row.studentId)) return false;
      existing.add(row.studentId);
      return true;
    });

    if (fresh.length > 0) {
      setGuests((prev) => [
        ...prev,
        ...fresh.map((row) => createGuest(row.studentId, row.name)),
      ]);
    }
    return { added: fresh.length, duplicated: rows.length - fresh.length };
  };

  const handleAddOne = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!studentId.trim() || !name.trim()) {
      setAddNotice({ tone: "error", text: "학번과 이름을 모두 입력해주세요." });
      return;
    }

    const { added } = addGuests([
      { studentId: studentId.trim(), name: name.trim() },
    ]);
    if (added === 0) {
      setAddNotice({ tone: "error", text: "이미 추가된 학번이에요." });
      return;
    }
    setAddNotice(null);
    setStudentId("");
    setName("");
  };

  const addBulk = (text: string) => {
    const { parsed, skipped } = parseGuests(text);
    if (parsed.length === 0) {
      setAddNotice({
        tone: "error",
        text: "추가할 명단을 찾지 못했어요. 학번과 이름을 확인해주세요.",
      });
      return false;
    }

    const { added, duplicated } = addGuests(parsed);
    const excluded = [
      duplicated > 0 && `중복 ${duplicated}명`,
      skipped > 0 && `형식이 맞지 않는 ${skipped}줄`,
    ].filter(Boolean);
    setAddNotice({
      tone: "info",
      text:
        `${added}명을 추가했어요.` +
        (excluded.length > 0 ? ` (${excluded.join(", ")} 제외)` : ""),
    });
    return true;
  };

  const handleBulkAdd = () => {
    if (addBulk(bulkText)) setBulkText("");
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (file) addBulk(await file.text());
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  const handleSave = () => {
    if (!partyName.trim() || !date || !time || !place.trim()) {
      setError("모임 이름, 일시, 장소를 모두 입력해주세요.");
      return;
    }
    if (guests.length === 0) {
      setError("초대장을 만들 참가자를 한 명 이상 추가해주세요.");
      return;
    }

    const saved = saveInvitation({
      id: inviteId,
      partyName: partyName.trim(),
      date,
      time,
      place: place.trim(),
      guests: guests.map(({ studentId, name, createdAt }) => ({
        studentId,
        name,
        createdAt,
      })),
      createdAt: formatNow(),
    });
    if (!saved) {
      setError(
        "저장하지 못했어요. 브라우저 저장 공간을 확인하고 다시 시도해주세요.",
      );
      return;
    }

    setError(null);
    navigate("/my");
  };

  return (
    <Content>
      <BackButton type="button" onClick={() => navigate("/my")}>
        <svg width={16} height={16} {...iconProps}>
          <path d="M15 5l-7 7 7 7" />
        </svg>
        내 초대장
      </BackButton>

      <Card>
        <CardTitle>모임 정보</CardTitle>
        <InfoGrid>
          <FormField
            id="partyName"
            label="모임 이름"
            placeholder="모임명"
            value={partyName}
            onChange={(event) => setPartyName(event.target.value)}
          />
          <FormField
            id="date"
            label="날짜"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
          <FormField
            id="time"
            label="시간"
            type="time"
            value={time}
            onChange={(event) => setTime(event.target.value)}
          />
          <FormField
            id="place"
            label="장소"
            placeholder="장소를 입력해주세요"
            value={place}
            onChange={(event) => setPlace(event.target.value)}
          />
        </InfoGrid>
      </Card>

      <QrCard>
        <QrBox>
          <QRCodeSVG value={inviteUrl} size={132} marginSize={0} />
        </QrBox>
        <QrInfo>
          <QrTitle>참가자 입장 QR</QrTitle>
          <QrDesc>
            참가자들이 이 QR을 찍으면 학번과 이름을 입력하는 페이지로 이동해요.
          </QrDesc>
          <LinkRow>
            <LinkText>{inviteUrl}</LinkText>
            <OutlineButton type="button" onClick={handleCopyLink}>
              <svg width={16} height={16} {...iconProps}>
                <rect x="9" y="9" width="11" height="11" rx="2" />
                <path d="M5 15V6a2 2 0 012-2h9" />
              </svg>
              {copied ? "복사됐어요" : "링크 복사"}
            </OutlineButton>
          </LinkRow>
        </QrInfo>
      </QrCard>

      <AddCard onSubmit={handleAddOne} noValidate>
        <CardTitle>새 참가자 추가</CardTitle>
        <AddRow>
          <FieldBox>
            <Label htmlFor="studentId">학번</Label>
            <Input
              id="studentId"
              inputMode="numeric"
              placeholder="학번"
              value={studentId}
              onChange={(event) => setStudentId(event.target.value)}
            />
          </FieldBox>
          <FieldBox>
            <Label htmlFor="guestName">이름</Label>
            <Input
              id="guestName"
              placeholder="이름"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FieldBox>
          <PrimaryButton type="submit">초대장 만들기</PrimaryButton>
        </AddRow>

        <Hint>
          한 명씩 추가하거나, 엑셀·명단 파일(CSV)을 올려 한 번에 여러 명을
          추가할 수 있어요.
        </Hint>

        <BulkTextarea
          aria-label="명단 붙여넣기"
          rows={4}
          placeholder={"엑셀에서 학번, 이름 두 열을 복사해 붙여넣어주세요"}
          value={bulkText}
          onChange={(event) => setBulkText(event.target.value)}
        />
        <BulkActions>
          <OutlineButton
            type="button"
            disabled={!bulkText.trim()}
            onClick={handleBulkAdd}
          >
            붙여넣은 명단 추가
          </OutlineButton>
          <OutlineButton
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            <svg width={18} height={18} {...iconProps}>
              <path d="M12 16V4M7 9l5-5 5 5M4 20h16" />
            </svg>
            명단 파일(CSV) 올리기
          </OutlineButton>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.tsv,.txt,text/csv,text/plain"
            hidden
            onChange={handleFileChange}
          />
        </BulkActions>

        {addNotice && (
          <Notice role="status" tone={addNotice.tone}>
            {addNotice.text}
          </Notice>
        )}
      </AddCard>

      <ListCard>
        <ListHeader>
          <ListTitle>
            참가자 명단<ListCount>{guests.length}명</ListCount>
          </ListTitle>
        </ListHeader>

        {guests.length === 0 ? (
          <EmptyRow>아직 추가된 참가자가 없어요.</EmptyRow>
        ) : (
          <TableWrap>
            <Table>
              <thead>
                <tr>
                  <th>학번</th>
                  <th>이름</th>
                  <th>초대장 상태</th>
                  <th>생성일시</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((guest) => (
                  <tr key={guest.key}>
                    <td>{guest.studentId}</td>
                    <td>{guest.name}</td>
                    <td>
                      <StatusBadge>
                        <svg width={16} height={16} {...iconProps}>
                          <path d="M5 12.5l4.5 4.5L19 7.5" />
                        </svg>
                        발급 완료
                      </StatusBadge>
                    </td>
                    <td>{guest.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableWrap>
        )}
      </ListCard>

      {error && (
        <ErrorBox role="alert">
          <svg width={16} height={16} {...iconProps} strokeWidth={1.8}>
            <path d="M12 3.5l9.5 16.5h-19L12 3.5z" />
            <path d="M12 10v4.5M12 17.2v.1" />
          </svg>
          {error}
        </ErrorBox>
      )}

      <Actions>
        <CancelButton type="button" onClick={() => navigate("/my")}>
          취소
        </CancelButton>
        <SaveButton type="button" onClick={handleSave}>
          저장하기
        </SaveButton>
      </Actions>
    </Content>
  );
}
