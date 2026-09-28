import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";
import LoginPage from "./pages/loginPage";
import MyPage from "./pages/myPage";
import CreateInvitationPage from "./pages/createInvitationPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<AdminLayout />}>
          <Route path="/my" element={<MyPage />} />
          <Route path="/invitations/new" element={<CreateInvitationPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
