import React from "react";
import { Link } from "react-router-dom";

const Button = ({href, type, text, icon, onclick}) => {
  return ( 
    <Link className="inline-block px-6 py-4 outline -outline-offset-[3px] outline-white text-white hover:bg-white hover:outline-white hover:text-slate-900 transition-all" to={href} onClick={onclick} type={type}>{icon}{text}</Link>
   );
}
 
export default Button;