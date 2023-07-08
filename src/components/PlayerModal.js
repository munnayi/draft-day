import Button from "./Button";

const PlayerModal = ({ image, firstName, lastName, goBack, handlePlayerSelected, position, teamName, points}) => {
  return (
    <div className="max-w-full w-full md:max-w-1/2 md:w-3/4 bg-gradient-to-r from-slate-50 to-slate-100 grid grid-cols-3 transition-all shadow-lg">
      <div className="col-span-1 p-8">
        <div className="bg-[url('https://www.metroleague.org/wp-content/uploads/2022/05/Square-Up-A-Football-Field.jpg')] bg-top bg-cover bg-no-repeat border-white border-[10px] relative after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:bg-white after:bg-opacity-80">
          <img className="relative z-10" src={`https://resources.premierleague.com/premierleague/photos/players/250x250/p${image}.png`} alt={`${firstName} ${lastName}`} />
        </div>
      </div>
      <div className="col-span-2 p-8">
          <div className="text-2xl text-white bg-gradient-to-r from-slate-700 to-slate-900 uppercase font-bold tracking-wide font-display inline-block p-4 border-b-4 border-b-white">{firstName} {lastName}</div>
          <div className="pt-6">
            <table className="border-collapse table-auto w-full text-sm">
              <thead className="bg-slate-200">
                <tr>
                  <th className="border-b border-r font-medium p-4 pl-8 pb-3 text-slate-700 text-left">Stat</th>
                  <th className="border-b font-medium p-4 px-8 pb-3 text-slate-700 text-left">Value</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr>
                  <td className="border-b border-r border-slate-100 p-4 pl-8 text-slate-500">Team</td>
                  <td className="border-b border-slate-100 p-4 px-8 text-slate-500">{teamName}</td>
                </tr>
                <tr>
                  <td className="border-b border-r border-slate-100 p-4 pl-8 text-slate-500">Position</td>
                  <td className="border-b border-slate-100 p-4 px-8 text-slate-500">{position}</td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
      <div className="col-span-3 flex items-center justify-between p-8 bg-gradient-to-r from-slate-700 to-slate-900">
        <Button text="Go Back" onclick={goBack} />
        <Button text={`Select ${firstName} ${lastName}`} onclick={handlePlayerSelected} />
      </div>
    </div>
   );
}
 
export default PlayerModal;