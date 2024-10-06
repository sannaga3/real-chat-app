import PropTypes from "prop-types";
import { useEffect } from "react";
import useSocket from "../../features/socket/hooks/useSocket";
import socketStore from "../../stores/socketStore";

const Layout = ({ children }) => {
  const { socket } = socketStore();
  const { initializeSocket } = useSocket();

  useEffect(() => {
    if (!socket) {
      initializeSocket();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  return <div>{children}</div>;
};

export default Layout;

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
