import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainPage from "./pages/mainPage";
import InviteRoute from "./pages/inviteRoute";
import AttendCompleteRoute from "./pages/attendCompleteRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/e/:eventId" element={<MainPage />} />
        <Route path="/invite/:inviteId" element={<InviteRoute />} />
        <Route
          path="/invite/:inviteId/attended"
          element={<AttendCompleteRoute />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
