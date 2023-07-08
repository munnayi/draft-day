const PlayerPick = ({pick, playerName, teamLogo, shortName}) => {
  return ( 
    <div className="bg-white flex items-center col-span-1">
      <div className="bg-slate-900 text-white p-4 font-display">{pick}</div>
      <div className="px-2"><img src={`../images/logos/${teamLogo}`} alt={shortName} className="w-[48px]" /></div>
      <div className="flex-1 font-display text-ellipsis">{playerName}</div>
    </div>
   );
}
 
export default PlayerPick;