import { Outlet } from "react-router-dom";
import { Page, Frame } from "../pages/styles/adminLayout.style";

export default function AdminLayout() {
  return (
    <Page>
      <Frame>
        <Outlet />
      </Frame>
    </Page>
  );
}
