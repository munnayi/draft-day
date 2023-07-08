import React, { useState } from 'react';
import { auth } from '../core/firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Login = ({manager, setManager}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cookies, setCookie] = useCookies();
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setCookie('userId', user.uid, { path: '/' });
        navigate("/big-board");
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(`Error: ${errorCode}`);
      });
  };

  return (
    <div className="min-h-[calc(100vh-293px)] flex items-center justify-center">
      {!cookies.userId ? (
        <form
          onSubmit={login}
          className="bg-white p-4 shadow-xl w-3/4 md:w-1/2 xl:w-1/4 m-auto max-sm:w-full"
        >
          <fieldset className="mb-4">
            <input
              className="bg-slate-100 p-4 w-full"
              type="email"
              placeholder="Enter email address.."
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset className="mb-4">
            <input
              className="bg-slate-100 p-4 w-full"
              placeholder="Enter password.."
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <p className={error ? 'text-red-600 mb-4' : ''}>{error}</p>
          </fieldset>
          <fieldset>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-slate-700 focus:shadow-outline focus:outline-none text-white font-bold p-4 transition-all"
            >
              Login
            </button>
          </fieldset>
        </form>
      ) : (
        <div className="bg-white p-8 shadow-xl w-3/4 md:w-1/2 xl:w-1/4 m-auto max-sm:w-full flex items-center justify-center flex-col relative">
          <div className="absolute -top-6 rounded-full w-[68px] h-[68px] text-xl bg-orange-500 text-white border-8 border-white p-2 flex items-center justify-center">
            {manager && manager.Initials}
          </div>
          <p className="mt-6 mb-8">Hi {manager && manager.Name}, You are already logged in..</p>
          <Link
            className="font-bold p-4 bg-green-500 text-white transition-all hover:bg-slate-900"
            to="/big-board"
          >
            Return to the Big Board
          </Link>
        </div>
      )}
    </div>
  );
};

export default Login;
