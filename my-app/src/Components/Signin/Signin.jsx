import React, { useState } from "react";
import "./Signin.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/authActions";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const dispatch = useDispatch();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setLoadingText("Signing in...");
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    const timeout = setTimeout(() => {
      setLoadingText("This is taking longer than usual...");
    }, 1000);
    const response = dispatch(loginUser(formData));
    console.log("response", response);
    response.then((res) => {
      setIsLoading(false);
      clearTimeout(timeout);
      navigate("/home");
    });

  };

  const errors = useSelector((state) => state?.authReducer?.errors);
  //const success = useSelector((state) => state?.authReducer.success);

  const handleMessage = () =>{
    dispatch({type: "CLEAR_ERRORS"});
  }



  return (
    <>
      <div className="bg">
        <div className="sign-container">
          <h3 className="signin-title">LOGIN</h3>
          <div className="signin-form">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded-md text-black"
                />
                
              </div>

              <div className="mb-3">
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded-md text-black"
                />
              </div>

              <button
                type="submit"
                className="signin-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Submit"}
                
              </button>
              <button type="reset" className="signin-reset-btn">
                Reset
              </button>
            </form>
            <div className="signin-signup-link">
              Don't have an account?
              <button type="button" className="signin-signup-btn">
                <a href="/signup"> Sign Up</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;