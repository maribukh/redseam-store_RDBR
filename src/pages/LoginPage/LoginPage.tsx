import Header from "../../components/layout/Header/Header";
import "./LoginPage.scss";
import HeroImage from "../../assets/images/Rectangle.svg";
import VisibleIcon from "../../assets/icons/eye.svg";

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="login-page-container">
        <div className="login-image-section">
          <img src={HeroImage} alt="Two models wearing stylish jackets" />
        </div>
        <div className="login-form-section">
          <h2>Log in</h2>
          <form>
            <div className="input-group">
              <input type="email" id="email" placeholder=" " required />
              <label htmlFor="email">Email *</label>
            </div>

            <div className="input-group">
              <input type="password" id="password" placeholder=" " required />
              <label htmlFor="password">Password *</label>
              <img
                src={VisibleIcon}
                alt="Show password"
                className="password-icon"
              />
            </div>

            <button type="submit" className="login-btn">
              Log In
            </button>
            <div className="bottom">
              <span>Not a member?</span>
              <a href="/register">Register</a>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
