import { useForm, type SubmitHandler } from "react-hook-form";
import Header from "../../components/layout/Header/Header";
import "./LoginPage.scss";
import HeroImage from "../../assets/images/Rectangle.svg";
import VisibleIcon from "../../assets/icons/eye.svg";
import { Link } from "react-router-dom";

type FormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log("SUCCESS:", data);
  };

  return (
    <>
      <div className="login-page">
        <Header />
        <div className="login-page-container">
          <div className="login-image-section">
            <img src={HeroImage} alt="Two models wearing stylish jackets" />
          </div>
          <div className="login-form-section">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h2>Log in</h2>
              <div className="input-group">
                <input
                  type="email"
                  id="email"
                  placeholder=" "
                  {...register("email", {
                    required: "Email is required",
                    minLength: {
                      value: 3,
                      message: "Email must be at least 3 characters",
                    },
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Please enter a valid email address",
                    },
                  })}
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
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 3,
                      message: "Password must be at least 3 characters",
                    },
                  })}
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
                <Link to="/register">Register</Link>{" "}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
