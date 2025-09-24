import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header/Header";
import HeroImage from "../../assets/images/Rectangle.svg";
import VisibleIcon from "../../assets/icons/eye.svg";
import DefaultAvatar from "../../assets/images/avatar.jpg";
import "./RegisterPage.scss";

type FormInputs = {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  avatar: FileList;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    resetField,
  } = useForm<FormInputs>();

  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const removeAvatar = () => {
    setAvatarPreview(null);
    resetField("avatar");
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);

    if (data.avatar && data.avatar.length > 0) {
      formData.append("avatar", data.avatar[0]);
    }

    try {
      const response = await fetch(
        "https://api.redseam.redberryinternship.ge/register",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        if (responseData.errors) {
          (Object.keys(responseData.errors) as Array<keyof FormInputs>).forEach(
            (field) => {
              setError(field, {
                type: "server",
                message: responseData.errors[field][0],
              });
            }
          );
        }
        throw new Error(responseData.message || "Registration failed");
      }

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
        <div className="login-form-section registration-form-section">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Registration</h2>
            <div className="img-upload-section">
              {/* 4. Упрощен JSX для аватара */}
              <img
                className="default-avatar"
                src={avatarPreview || DefaultAvatar}
                alt="Avatar Preview"
              />
              <div className="action">
                <label htmlFor="avatar-upload" className="upload-button">
                  Update new
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  {...register("avatar", { onChange: handleAvatarChange })}
                />
                <span onClick={removeAvatar} className="remove-avatar">
                  Remove
                </span>
              </div>
            </div>
            <div className="input-group">
              <input
                type="text"
                id="username"
                placeholder=" "
                {...register("username", { required: "Username is required" })}
              />
              <label htmlFor="username">Username*</label>
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
              <label htmlFor="email">Email*</label>
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
              <label htmlFor="password">Password*</label>
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
                id="password_confirmation"
                {...register("password_confirmation", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "The passwords do not match",
                })}
              />
              <label htmlFor="password_confirmation">Confirm password*</label>
              <img
                src={VisibleIcon}
                alt="Show password"
                className="password-icon"
              />
              {errors.password_confirmation && (
                <p className="error-message">
                  {errors.password_confirmation.message}
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
