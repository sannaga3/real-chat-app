import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "../common/components/layout.jsx";
import ChatRoom from "../pages/ChatRoom.jsx";
import Lobby from "../pages/Lobby.jsx";

const AppRouter = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/Lobby" element={<Lobby />} />
          <Route path="/chat_room" element={<ChatRoom />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRouter;
