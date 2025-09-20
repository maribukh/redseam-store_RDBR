
import Header from "../../components/layout/Header/Header";
import "./LoginPage.scss"; 
import HeroImage from "../../assets/images/Rectangle 10.svg";

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="login-page-container">
        <div className="login-image-section">{HeroImage}</div>
        <div className="login-form-section">
          <h2>Log in</h2>
          <form>{}</form>
        </div>
      </main>
    </>
  );
}
