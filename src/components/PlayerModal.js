import Button from "./Button";

const PlayerModal = ({ image, firstName, lastName, goBack, handlePlayerSelected}) => {
  return (
    <div className="max-w-full w-full md:max-w-1/2 md:w-3/4 bg-gradient-to-r from-slate-50 to-slate-100 grid grid-cols-3 transition-all shadow-lg">
      <div className="col-span-1 p-8">
        <div className="bg-[url('https://www.metroleague.org/wp-content/uploads/2022/05/Square-Up-A-Football-Field.jpg')] bg-top bg-cover bg-no-repeat border-white border-[10px] relative after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:bg-white after:bg-opacity-80">
          <img className="relative z-10" src={image} alt={`${firstName} ${lastName}`} />
        </div>
      </div>
      <div className="col-span-2 p-8">
          <div className="text-2xl text-white bg-gradient-to-r from-slate-700 to-slate-900 uppercase font-bold tracking-wide font-display inline-block p-4 border-b-4 border-b-white">{firstName} {lastName}</div>
      </div>
      <div className="col-span-3 flex items-center justify-between p-8 bg-gradient-to-r from-slate-700 to-slate-900">
        <Button text="Go Back" onclick={goBack} />
        <Button text={`Select ${firstName} ${lastName}`} onclick={handlePlayerSelected} />
      </div>
    </div>
   );
}
 
export default PlayerModal;