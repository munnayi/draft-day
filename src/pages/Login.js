import { useState } from 'react'
import { auth } from '../core/firebase-config'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();


  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      navigate("/big-board");
      console.log(user)
    })
    .catch((error) => {
      const errorCode = error.code;
      setError(`Error: ${errorCode}`);
    });
  }

  return ( 

    <div className="min-h-[calc(100vh-293px)] flex items-center justify-center">
      <form className="bg-white p-4 shadow-xl w-3/4 md:w-1/2 xl:w-1/4 m-auto max-sm:w-full">
        <fieldset className="mb-4">
          <input className="bg-slate-100 p-4 w-full" type="email" placeholder="Enter email address.." onChange={(e) => setEmail(e.target.value)}/>
        </fieldset>
        <fieldset className="mb-4">
          <input className="bg-slate-100 p-4 w-full" placeholder="Enter password.." type="password" onChange={(e) => setPassword(e.target.value)}/>
        </fieldset>
        <fieldset>
          <p className={error ? "text-red-600 mb-4" : ""}>{error}</p>
        </fieldset>
        <fieldset>
          <button onClick={login} className="w-full bg-green-500 hover:bg-slate-700 focus:shadow-outline focus:outline-none text-white font-bold p-4 transition-all" type="button">Login</button>
        </fieldset>
      </form>
    </div>

   );
}
 
export default Login;
