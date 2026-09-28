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

const ADMIN_URL = import.meta.env.VITE_ADMIN_URL ?? 'http://localhost:5174'

export default function MainPage() {
  const [studentId, setStudentId] = useState('')
  const [name, setName] = useState('')
  const navigate = useNavigate()

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
