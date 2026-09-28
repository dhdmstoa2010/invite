import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  Content,
  Narrow,
  BackButton,
  Card,
  Title,
  Description,
  Row,
  SectionHeader,
  SectionTitle,
  AddGuestButton,
  GuestList,
  GuestRow,
  GuestInput,
  RemoveButton,
  Actions,
  CancelButton,
  SubmitButton,
} from "./styles/createInvitationPage.style";
import { ErrorBox } from "./styles/loginPage.style";
import FormField from "../components/FormField";

interface Guest {
  key: number;
  studentId: string;
  name: string;
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

let nextGuestKey = 1;
const createGuest = (): Guest => ({
  key: nextGuestKey++,
  studentId: "",
  name: "",
});

export default function CreateInvitationPage() {
  const [partyName, setPartyName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [guests, setGuests] = useState<Guest[]>(() => [createGuest()]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const updateGuest = (key: number, patch: Partial<Guest>) =>
    setGuests((prev) =>
      prev.map((guest) => (guest.key === key ? { ...guest, ...patch } : guest)),
    );

  const removeGuest = (key: number) =>
    setGuests((prev) => prev.filter((guest) => guest.key !== key));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const filledGuests = guests.filter(
      (g) => g.studentId.trim() && g.name.trim(),
    );

    if (!partyName.trim() || !date || !time || !place.trim()) {
      setError("모임 이름, 일시, 장소를 모두 입력해주세요.");
      return;
    }
    if (filledGuests.length === 0) {
      setError("초대할 사람을 한 명 이상 입력해주세요.");
      return;
    }

    setError(null);
    navigate("/my");
  };

  return (
    <Content>
      <Narrow>
        <BackButton type="button" onClick={() => navigate("/my")}>
          <svg width={16} height={16} {...iconProps}>
            <path d="M15 5l-7 7 7 7" />
          </svg>
          내 초대장
        </BackButton>

        <Card onSubmit={handleSubmit} noValidate>
          <Title>새 초대장 만들기</Title>
          <Description>
            모임 정보를 입력하고 초대할 사람을 추가해주세요.
          </Description>

          <FormField
            id="partyName"
            label="모임 이름"
            placeholder="예) 가을 생일파티"
            value={partyName}
            onChange={(event) => setPartyName(event.target.value)}
          />

          <Row>
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
          </Row>

          <FormField
            id="place"
            label="장소"
            placeholder="예) 학생회관 2층 라운지"
            value={place}
            onChange={(event) => setPlace(event.target.value)}
          />

          <SectionHeader>
            <SectionTitle>초대할 사람 {guests.length}명</SectionTitle>
            <AddGuestButton
              type="button"
              onClick={() => setGuests((prev) => [...prev, createGuest()])}
            >
              <svg width={14} height={14} {...iconProps}>
                <path d="M12 5v14M5 12h14" />
              </svg>
              추가
            </AddGuestButton>
          </SectionHeader>

          <GuestList>
            {guests.map((guest, index) => (
              <GuestRow key={guest.key}>
                <GuestInput
                  aria-label={`${index + 1}번째 학번`}
                  inputMode="numeric"
                  placeholder="학번"
                  value={guest.studentId}
                  onChange={(event) =>
                    updateGuest(guest.key, { studentId: event.target.value })
                  }
                />
                <GuestInput
                  aria-label={`${index + 1}번째 이름`}
                  placeholder="이름"
                  value={guest.name}
                  onChange={(event) =>
                    updateGuest(guest.key, { name: event.target.value })
                  }
                />
                <RemoveButton
                  type="button"
                  aria-label={`${index + 1}번째 삭제`}
                  disabled={guests.length === 1}
                  onClick={() => removeGuest(guest.key)}
                >
                  <svg width={16} height={16} {...iconProps}>
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </RemoveButton>
              </GuestRow>
            ))}
          </GuestList>

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
            <SubmitButton type="submit">초대장 만들기</SubmitButton>
          </Actions>
        </Card>
      </Narrow>
    </Content>
  );
}
