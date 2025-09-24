import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header/Header";
import HeroImage from "../../assets/images/Rectangle.svg";
import VisibleIcon from "../../assets/icons/eye.svg";
import "./LoginPage.scss";

type FormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormInputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const response = await fetch(
        "https://api.redseam.redberryinternship.ge/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        setError("root.serverError", {
          type: "server",
          message: responseData.message || "Invalid email or password",
        });
        throw new Error(responseData.message || "Login failed");
      }

      console.log("LOGIN SUCCESS:", responseData);
      localStorage.setItem("authToken", responseData.token);

      navigate("/");
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <div className="login-page">
      <Header />
      <main className="login-page-container">
        <div className="login-image-section">
          <img src={HeroImage} alt="Two models wearing stylish jackets" />
        </div>
        <div className="login-form-section">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Log in</h2>
            {errors.root?.serverError && (
              <p className="error-message">{errors.root.serverError.message}</p>
            )}
            <div className="input-group">
              <input
                type="email"
                id="email"
                placeholder=" "
                {...register("email", { required: "Email is required" })}
              />
              <label htmlFor="email">
                Email <span>*</span>
              </label>
              {errors.email && (
                <p className="error-message">{errors.email.message}</p>
              )}
            </div>

            <div className="input-group">
              <input
                type="password"
                id="password"
                placeholder=" "
                {...register("password", { required: "Password is required" })}
              />
              <label htmlFor="password">
                Password <span>*</span>
              </label>
              <img
                src={VisibleIcon}
                alt="Show password"
                className="password-icon"
              />
              {errors.password && (
                <p className="error-message">{errors.password.message}</p>
              )}
            </div>

            <button type="submit" className="login-btn">
              Log In
            </button>
            <div className="bottom">
              <span>Not a member?</span>
              <Link to="/register">Register</Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
