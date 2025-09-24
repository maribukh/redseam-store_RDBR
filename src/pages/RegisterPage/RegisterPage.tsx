import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/layout/Header/Header";
import HeroImage from "../../assets/images/Rectangle.svg";
import VisibleIcon from "../../assets/icons/eye.svg";
import Profile from "../../assets/images/profile-img.jpg";
import DefaultAvatar from "../../assets/images/avatar.jpg";
import "./RegisterPage.scss";

type FormInputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: FileList;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<FormInputs>();

  const navigate = useNavigate();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [hasAvatar, setHasAvatar] = useState(false);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      setHasAvatar(true);
    }
  };

  const removeAvatar = () => {
    setAvatarPreview(null);
    setHasAvatar(false);
  };

  const checkFieldUnique = async (
    field: "username" | "email",
    value: string
  ) => {
    if (!value) return;
    try {
      const res = await fetch(`https://your-api.com/check-${field}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(field, {
          type: "server",
          message: data.message || `${field} is already taken`,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    if (data.avatar && data.avatar.length > 0) {
      formData.append("avatar", data.avatar[0]);
    }

    try {
      const response = await fetch("https://your-api.com/register", {
        method: "POST",
        body: formData,
      });

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

      navigate("/login");
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
              <img
                className="d-none"
                src={avatarPreview || Profile}
                alt="Avatar Preview"
              />
              <img
                className="default-avatar"
                src={avatarPreview || DefaultAvatar}
                alt="Avatar Preview"
              />
              <div className="action">
                <label htmlFor="avatar-upload" className="upload-button">
                  {hasAvatar ? "Update image" : "Update new"}
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
                {...register("username", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                  onBlur: (e) => checkFieldUnique("username", e.target.value),
                })}
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
                  onBlur: (e) => checkFieldUnique("email", e.target.value),
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

            <div className="input-group">
              <input
                type="password"
                id="confirmPassword"
                placeholder=" "
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === watch("password") || "The passwords do not match",
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
