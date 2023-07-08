import React, { useState } from "react";
import Heading from "../components/Heading";
import PlayerCard from "../components/PlayerCard";
import {db} from "../core/firebase-config";
import { collection, getDocs, where, query } from "firebase/firestore";

const Team = ({manager}) => {

  const positions = ["GK", "DEF", "MID", "ATT"];

  const [goalkeepers, setGoalkeepers] = useState([]);
  const [defenders, setDefenders] = useState([]);
  const [midfielders, setMidfielders] = useState([]);
  const [attackers, setAttackers] = useState([]);

  const selectedPlayersRef = collection(db, "Players");
  const selectedPlayers = query(selectedPlayersRef, where("Manager", "==", `${manager.id}`));
  const gks = query(selectedPlayers, where("Position", "==", "GK"));
  const defs = query(selectedPlayers, where("Position", "==", "DEF"));
  const mids = query(selectedPlayers, where("Position", "==", "MID"));
  const atts = query(selectedPlayers, where("Position", "==", "ATT"));


  const getPlayers = async () => {
    const gkData = await getDocs(gks);
    setGoalkeepers(gkData.docs.map((doc) => ({...doc.data(), id: doc.id})));
    const defData = await getDocs(defs);
    setDefenders(defData.docs.map((doc) => ({...doc.data(), id: doc.id})));
    const midData = await getDocs(mids);
    setMidfielders(midData.docs.map((doc) => ({...doc.data(), id: doc.id})));
    const attData = await getDocs(atts);
    setAttackers(attData.docs.map((doc) => ({...doc.data(), id: doc.id})));
  }

  getPlayers();

  return ( 
    <>
      <Heading text={manager.TeamName} />

      <div className="py-6 px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 x xl:grid-cols-5 2xl:grid-cols-6 gap-3">
      <div className="col-span-6">
        <h2 className="text-2xl text-white font-bold pb-2">GKs</h2>
      </div>    
      {goalkeepers.length === 0 ? (
        <div className="col-span-6">
          <p className="text-white">No players selected for this position.</p>
        </div>
      ) : (
        <>
          {goalkeepers.map((player) => {
          return (
            <PlayerCard key={player.id} firstName={player.first_name} lastName={player.web_name} image={player.code} position={positions[player.element_type-1]} logo={`../images/logos/${player.SelectedTeamLogo}`} pick={player.pick} />             
            )
          })}
        </>
      )}
      </div>

      <div className="py-6 px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 x xl:grid-cols-5 2xl:grid-cols-6 gap-3">
      <div className="col-span-6">
        <h2 className="text-2xl text-white font-bold pb-2">DEFs</h2>
      </div>  
      {defenders.length === 0 ? (
        <div className="col-span-6">
          <p className="text-white">No players selected for this position.</p>
        </div>
      ) : (
        <>
          {defenders.map((player) => {
          return (
            <PlayerCard key={player.id} firstName={player.FirstName} lastName={player.LastName} image={player.Image} points={player.Points} position={player.Position} logo={`../images/logos/${player.SelectedTeamLogo}`} />             
            )
          })}
        </>
      )}
      </div>

      <div className="py-6 px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 x xl:grid-cols-5 2xl:grid-cols-6 gap-3">
      <div className="col-span-6">
        <h2 className="text-2xl text-white font-bold pb-2">MIDs</h2>
      </div>  
      {midfielders.length === 0 ? (
        <div className="col-span-6">
          <p className="text-white">No players selected for this position.</p>
        </div>
      ) : (
        <>
          {midfielders.map((player) => {
          return (
            <PlayerCard key={player.id} firstName={player.FirstName} lastName={player.LastName} image={player.Image} points={player.Points} position={player.Position} logo={`../images/logos/${player.SelectedTeamLogo}`} />             
            )
          })}
        </>
      )}
      </div>

      <div className="py-6 px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 x xl:grid-cols-5 2xl:grid-cols-6 gap-3">
      <div className="col-span-6">
        <h2 className="text-2xl text-white font-bold pb-2">ATTs</h2>
      </div>  
      {attackers.length === 0 ? (
        <div className="col-span-6">
          <p className="text-white">No players selected for this position.</p>
        </div>
      ) : (
        <>
          {attackers.map((player) => {
          return (
            <PlayerCard key={player.id} firstName={player.FirstName} lastName={player.LastName} image={player.Image} points={player.Points} position={player.Position} logo={`../images/logos/${player.SelectedTeamLogo}`} />             
            )
          })}
        </>
      )}
      </div>
    </>
   );
}
 
export default Team;