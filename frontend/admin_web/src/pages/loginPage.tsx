import { useState, type FormEvent } from "react";
import {
  Page,
  Wrapper,
  BackLink,
  Card,
  IconBadge,
  Description,
  ErrorBox,
  SubmitButton,
} from "./styles/loginPage.style";
import FormField from "../components/FormField";

// 메인(user_pwa)은 별도 앱이라 외부 URL로 이동. 배포 시 VITE_USER_URL로 지정
const USER_URL = import.meta.env.VITE_USER_URL ?? "http://localhost:5173";

export default function LoginPage() {
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // TODO: 관리자 로그인 API 연동 후 실패 시 setError, 성공 시 현황판으로 이동
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!adminId.trim() || !password) {
      setError("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }
    setError(null);
  };

  return (
    <Page>
      <Wrapper>
        <BackLink href={USER_URL}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 5l-7 7 7 7" />
          </svg>
          메인으로
        </BackLink>
        <Card onSubmit={handleSubmit} noValidate>
          <IconBadge>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="4.5" y="10.5" width="15" height="10" rx="2.5" />
              <path d="M8 10.5V8a4 4 0 018 0v2.5" />
            </svg>
          </IconBadge>
          <Description>
            학생회 관리자만 접근할 수 있어요.
            <br />
            아이디와 비밀번호를 입력해주세요.
          </Description>

          <FormField
            id="adminId"
            label="관리자 아이디"
            placeholder="아이디 입력"
            autoComplete="username"
            value={adminId}
            invalid={error !== null}
            onChange={(event) => setAdminId(event.target.value)}
          />

          <FormField
            id="password"
            label="비밀번호"
            type="password"
            placeholder="비밀번호 입력"
            autoComplete="current-password"
            value={password}
            invalid={error !== null}
            onChange={(event) => setPassword(event.target.value)}
          />

          {error && (
            <ErrorBox role="alert">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3.5l9.5 16.5h-19L12 3.5z" />
                <path d="M12 10v4.5M12 17.2v.1" />
              </svg>
              {error}
            </ErrorBox>
          )}

          <SubmitButton type="submit">로그인</SubmitButton>
        </Card>
      </Wrapper>
    </Page>
  );
}
