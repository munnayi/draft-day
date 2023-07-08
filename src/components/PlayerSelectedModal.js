const PlayerSelectedModal = ({ image, firstName, lastName, pick, teamName, logo, position }) => {
  return (
    <div className="absolute max-w-full w-full md:max-w-1/2 md:w-1/2 bg-gradient-to-r from-slate-50 to-slate-100 grid grid-cols-4 transition-all shadow-lg z-20">
        <div className="col-span-4 flex items-center justify-between p-8 bg-gradient-to-r from-slate-700 to-slate-900">
          <h2 className="font-display text-white text-2xl">{teamName} select..</h2>
        </div>
        <div className="col-span-2 flex items-center justify-end relative">
          <div className="absolute top-4 left-4 font-display text-xs text-center p-2 bg-gradient-to-r from-slate-700 to-slate-900 text-white">#{pick}</div>
          <img src={image} alt={`${firstName} ${lastName}`} />
        </div>
        <div className="col-span-2 flex flex-col items-center justify-center">
          <div className="p-2 pb-4">
            <img className="max-w-[200px] w-[200px]" src={logo} alt={teamName} />
          </div>
          <h4 className="font-display text-md tracking-widest text-center">{firstName}</h4>
          <h3 className="font-display text-xl bg-gradient-to-r from-slate-700 to-slate-900 text-white p-2 text-center">{lastName}</h3>
        </div>
    </div>
   );
}
 
export default PlayerSelectedModal;