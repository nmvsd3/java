import "./Navbar.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
// import { DarkModeContext } from "../../context/darkModeContext";


const Navbar = () => {
  return (
    <header className="header">
      <h1>Crime Information Management System</h1>
      <div className="user-info">
        <span>Logged </span>
        <button>Logout</button>
      </div>
    </header>
  );
};

export default Navbar;
