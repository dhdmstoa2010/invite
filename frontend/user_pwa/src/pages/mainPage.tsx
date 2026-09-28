import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Page,
  Container,
  Content,
  Title,
  Subtitle,
  AdminLink,
  Footer,
  FooterLink,
} from './styles/mainPage.style'
import FormField from '../components/FormField'
import SubmitButton from '../components/SubmitButton'

// 관리자 페이지(admin_web)는 별도 앱이라 외부 URL로 이동. 배포 시 VITE_ADMIN_URL로 지정
const ADMIN_URL = import.meta.env.VITE_ADMIN_URL ?? 'http://localhost:5174'

export default function MainPage() {
  const [studentId, setStudentId] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate()

  // TODO: 학번/이름으로 초대장 조회 API 연동 후 응답의 초대 ID로 이동
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/invite/demo')
  }

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

          <SubmitButton>초대장 확인하기</SubmitButton>

          <AdminLink href={ADMIN_URL}>관리자이신가요? 현황판 보기 →</AdminLink>
        </Content>

        <Footer>
          <FooterLink href="#guide">이용 안내 보기</FooterLink>
        </Footer>
      </Container>
    </Page>
  )
}
