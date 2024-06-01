import React from "react";
import "./Signin.css";
import { useAuthStore } from "../../utils/authStore";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AtSymbolIcon, KeyIcon } from '@heroicons/react/24/outline';

interface SigninForm {
  username: string;
  password: string;
}

const Signin: React.FC = () => {
  const { handleSignIn } = useAuthStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SigninForm>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await handleSignIn(formData);
      console.log('Sign in successful:', response);
      navigate('/home');
  
    } catch (err) {
      console.error('Sign in error:', err);
    }
  };
  
  return (
    <form>
        <div className="min-h-screen flex items-center justify-center bg">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
            <h1 className={`mb-3 text-2xl`}>Please log in to continue.</h1>
            <div className="w-full">
                <div>
                    <label className="mb-3 mt-5 text-xs font-medium text-black" htmlFor="username">
                        Username
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full rounded-md border text-black border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            id="username"
                            type="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                        />
                        <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
                <div className="mt-4">
                    <label className="mb-3 mt-5 text-xs font-medium text-black" htmlFor="password">
                        Password
                    </label>
                    <div className="relative">
                        <input
                            className="peer block w-full rounded-md border text-black border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                            id="password"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                            minLength={6}
                        />
                        <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                    </div>
                </div>
            </div>
            <LoginButton handleSubmit={handleSubmit} />
            <LinkToSignup />
        </div>
      </div>
    </form>
);
}

function LoginButton({handleSubmit}) {
return (
    <button onClick={handleSubmit}
        type="submit"
        className="mt-6 w-full rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400">
        Log in
    </button>
);
}

function LinkToSignup() {
return (
    <p className="mt-4 text-center text-xs text-gray-500">
        Don't have an account?{" "}
        <Link to="/signup" className="text-blue-500">
            Sign up
        </Link>
    </p>
);
}
export default Signin;
