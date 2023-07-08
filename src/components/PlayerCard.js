import React from "react";
import { Link } from "react-router-dom";

const PlayerCard = ({firstName, lastName, image, pick, position, logo, points, to, onclick}) => {
  return ( 
    <Link to={to} onClick={onclick}>
        <div className="grid grid-rows-5 grid-cols-4 w-full max-w-[275px] max-h-[350px] p-3 pb-0 bg-[url('https://www.metroleague.org/wp-content/uploads/2022/05/Square-Up-A-Football-Field.jpg')] bg-top bg-cover bg-no-repeat  drop-shadow-sm shadow-sm relative border-[12px] border-white overflow-hidden m-auto after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:bg-white after:bg-opacity-80 before:absolute before:top-[-800px] before:left-[-600px] before:opacity-30 before:bg-white before:w-[200px] before:h-[2000px] before:rotate-45 before:z-20 before:animate-slide-right scale-100 hover:scale-105 transition-transform">
        <div className="col-span-4 row-span-1 bg-gradient-to-r from-slate-700 to-slate-900 text-white p-3 flex items-center justify-center z-10 flex-col -mt-3 -mx-3">
          <div className="text-xs text-center uppercase tracking-wide font-display">{firstName}</div>
          <div className="text-xl text-center uppercase font-bold tracking-wide font-display">{lastName}</div>
          <p className="font-sans text-xs uppercase tracking-widest">{pick}</p>
        </div>
        <div className="col-span-4 row-span-1 border-t border-slate-300 grid grid-cols-3 mt-4 z-10">
          <div className="col-span-1 relative flex items-center justify-center border-r border-slate-300 pt-3">
            <em className="absolute top-1 left-1 text-[10px] uppercase">POS</em>
            <div className="uppercase text-xl font-bold text-gray-700 font-body">{position}</div>
          </div>
          <div className="col-span-1 relative flex items-center justify-center border-r border-slate-300 pt-3">
            <div>
              <img className="w-[40px]" src={`../images/epl/logos/${logo}.svg`} alt={`${firstName} ${lastName}`}  />
            </div>
          </div>
          <div className="col-span-1 relative flex items-center justify-center pt-3">
            <em className="absolute top-1 left-1 text-[10px] uppercase">Pick</em>
          <div className="uppercase text-xl font-bold text-gray-700 font-body">
            {pick ? (`#${pick}`) : ("#")}
          </div>
          </div>
        </div>

        <div className="col-span-4 row-span-4 relative flex items-end justify-center z-10">
          <img className="max-w-[200px]" src={`https://resources.premierleague.com/premierleague/photos/players/250x250/p${image}.png`} alt={`${firstName} ${lastName}`}  />
        </div>
      </div>
    </Link>
   );
}
 
export default PlayerCard;