import React from "react";
import { Link } from "react-router-dom";

const Button = ({href, type, text, icon, onclick}) => {
  return ( 
    <Link className="h-[40px] inline-block px-6 py-2 outline -outline-offset-[1px] outline-white text-white hover:bg-white hover:outline-white hover:text-slate-900 transition-all" to={href} onClick={onclick} type={type}>{icon}{text}</Link>
   );
}
 
export default Button;