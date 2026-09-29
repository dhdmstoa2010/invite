import { useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Page,
  Container,
  Content,
  Title,
  Subtitle,
  ErrorBox,
} from "./styles/mainPage.style";
import FormField from "../components/FormField";
import SubmitButton from "../components/SubmitButton";
import { lookupGuest } from "../api/events";
import { saveGuestIdentity } from "../utils/guestSession";

export default function MainPage() {
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { eventId } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!eventId) {
      setError("초대장 QR을 통해 접속해주세요.");
      return;
    }
    if (!studentId.trim() || !name.trim()) {
      setError("학번과 이름을 모두 입력해주세요.");
      return;
    }

    setLoading(true);
    try {
      await lookupGuest(eventId, studentId.trim(), name.trim());
      saveGuestIdentity(eventId, { studentId: studentId.trim(), name: name.trim() });
      setError(null);
      navigate(`/invite/${eventId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "초대장을 확인하지 못했어요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Container>
        <Content onSubmit={handleSubmit}>
          <Title>모임초대</Title>
          <Subtitle>
            학번과 이름을 입력하면
            <br />
            초대장을 확인할 수 있어요.
          </Subtitle>

          <FormField
            id="studentId"
            label="학번"
            inputMode="numeric"
            placeholder="학번"
            value={studentId}
            onChange={(event) => setStudentId(event.target.value)}
          />

          <FormField
            id="name"
            label="이름"
            placeholder="이름"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          {error && <ErrorBox role="alert">{error}</ErrorBox>}

          <SubmitButton disabled={loading}>
            {loading ? "확인 중..." : "초대장 확인하기"}
          </SubmitButton>
        </Content>
      </Container>
    </Page>
  );
}
