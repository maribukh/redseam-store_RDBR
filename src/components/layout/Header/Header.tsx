import Logo from "../../../assets/logo.svg";
import UserIcon from "../../../assets/icons/user.svg";
import "./Header.scss";

export default function Header() {
  return (
    <header className="header-container container">
      <div className="logo">
        <img src={Logo} alt="readseam logo" />
        <h1>ReadSeam Clothing</h1>
      </div>
      <div className="login-btn">
        <img src={UserIcon} alt="user icon" />
        <a href="/login">Log In</a>
      </div>
    </header>
  );
}
