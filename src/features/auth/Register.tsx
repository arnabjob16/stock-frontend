import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface RegisterFormInputs {
  name: string;
  username: string;
  password: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormInputs>();

  const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
    console.log("Register Data:", data);
  };

  const redirectToLogin = () => {
    navigate("/login");
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
              <h3 className="text-center">Register</h3>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input 
                    type="text" 
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
                    id="name" 
                    {...register("name", { required: "Name is required" })} 
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>

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
                  Register
                </button>
              </form>

              <button 
                className="btn btn-link w-100 mt-3" 
                onClick={redirectToLogin}
              >
                Back to login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
