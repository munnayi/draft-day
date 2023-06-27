import React from "react";

const Heading = ({text}) => {
  return ( 
    <h1 className="font-display text-white text-xl p-4 bg-black/75 border-b-4 border-b-white inline-block">{text}</h1>
   );
}
 
export default Heading;