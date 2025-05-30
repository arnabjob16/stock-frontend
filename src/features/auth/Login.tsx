import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { loginApi } from "../../services/authApi";

interface LoginFormInputs {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    console.log("Login Data:", data);
    try {
      const response = await loginApi(data.username, data.password);

      if (response && response.status === 200 && response.data?.token) {
        setErrorMessage("");
        console.log("Logged in successfully:", response.data.token);
        login(JSON.stringify(response.data.user), response.data.token.toString());
        navigate("/dashboard");
      } else {
        setErrorMessage(response?.data?.message);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Login failed:", error.message);
        setErrorMessage(error.message);
      } else {
        console.error("An unknown error occurred");
        setErrorMessage("An unknown error occurred");
      }
    }
  };

  const redirectToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container vh-100 align-items-center justify-content-center pt-5">
      <div className="row">
        <div className="col-md-6 col-lg-4 mx-auto">
          <div className="card shadow-lg p-4">
            <div className='mx-4 px-4'>
              <img src="/assets/images/logo.png" alt="logo" className='img-fluid'/>
            </div>            
            <div className="card-body">
              {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
              <h3 className="text-center">Login</h3>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input 
                    type="text" 
                    className={`form-control ${errors.username ? 'is-invalid' : ''}`} 
                    id="username"
                    {...register("username", { required: "Username is required" })} 
                  />
                  {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input 
                    type="password" 
                    className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                    id="password"
                    {...register("password", { required: "Password is required" })} 
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </form>

              <button 
                className="btn btn-link w-100 mt-3" 
                onClick={redirectToRegister}
              >
                Don't have an account? Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
