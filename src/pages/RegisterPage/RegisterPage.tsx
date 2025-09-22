import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { useRef } from "react";
import Header from "../../components/layout/Header/Header";
import HeroImage from "../../assets/images/Rectangle.svg";
import VisibleIcon from "../../assets/icons/eye.svg";
import Profile from "../../assets/images/profile-img.jpg";
import "./RegisterPage.scss";
import "../LoginPage/LoginPage.scss";

type FormInputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormInputs>();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log("REGISTER SUCCESS:", data);
  };

  return (
    <div className="login-page">
      <Header />
      <main className="login-page-container">
        <div className="login-image-section">
          <img src={HeroImage} alt="Two models wearing stylish jackets" />
        </div>
        <div className="login-form-section registration-form-section">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Registration</h2>
            <div className="img-upload-section">
              <img src={Profile} alt="" />
              <div className="action">
                <span>Update</span>
                <span>Remove</span>
              </div>
            </div>
            <div className="input-group">
              <input
                type="text"
                id="username"
                placeholder=" "
                {...register("username", { required: "Username is required" })}
              />
              <label htmlFor="username">
                Username <span>*</span>
              </label>
              {errors.username && (
                <p className="error-message">{errors.username.message}</p>
              )}
            </div>

            <div className="input-group">
              <input
                type="email"
                id="email"
                placeholder=" "
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
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

            <div className="input-group">
              <input
                type="password"
                id="confirmPassword"
                placeholder=" "
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                })}
              />
              <label htmlFor="confirmPassword">
                Confirm password <span>*</span>
              </label>
              <img
                src={VisibleIcon}
                alt="Show password"
                className="password-icon"
              />
              {errors.confirmPassword && (
                <p className="error-message">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button type="submit" className="login-btn">
              Register
            </button>
            <div className="bottom">
              <span>Already a member?</span>
              <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
