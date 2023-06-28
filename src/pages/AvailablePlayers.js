import React from "react";

import {db} from "../core/firebase-config";
import {collection, getDocs, query, limit, startAfter, doc, setDoc, deleteDoc} from "firebase/firestore";
import { useEffect, useState } from "react";

import PlayerCard from "../components/PlayerCard";
import Heading from "../components/Heading";
import Search from "../components/Search";
import Button from "../components/Button";
import PlayerModal from "../components/PlayerModal";

const AvailablePlayers = ({userId}) => {

  const [isActive, setActive] = useState("false");
  const [visibleModal, setVisibleModal] = useState(null);

  const handleClick = () => {
    setActive(!isActive);
  }

  const handleModalClick = (id) => {
    setVisibleModal(id);
  };

  const closeModal = () => {
    setVisibleModal(null);
  };


  const handlePlayerSelected = async (player) => {
    console.log(`${player.id} ${player.FirstName} ${player.LastName} selected`)

    const newSelectedPlayerRef = doc(collection(db, "SelectedPlayers"));

    await setDoc(newSelectedPlayerRef, {
      FirstName: player.FirstName,
      LastName: player.LastName,
      Image: player.Image,
      Logo: player.Logo,
      Manager: userId,
      Points: player.Points,
      Position: player.Position,
      Team: player.Team
    });

    await deleteDoc(doc(db, "AvailablePlayers", `${player.id}`));

    // getPlayers();

    closeModal();

  }


  const [players, setPlayers] = useState([]);
  const [lastPlayer, setLastPlayer] = useState('');

  const availablePlayersRef = collection(db, "AvailablePlayers");
  const availablePlayers = query(availablePlayersRef, limit(3));


  const getPlayers = async () => {
    const data = await getDocs(availablePlayers);
      setPlayers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLastPlayer(data.docs[data.docs.length-1]);
  }

  useEffect(()=> {
    getPlayers();
  }, [])

  const getMorePlayers = async () => {

    const availablePlayersRef = collection(db, "AvailablePlayers");
    const getNext = query(availablePlayersRef, startAfter(lastPlayer), limit(3));

    const data = await getDocs(getNext);

    const newPlayers = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
      setPlayers((players) => [...players, ...newPlayers]);
      setLastPlayer(data.docs[data.docs.length-1]);
  }

  const handleMorePlayers = () => {
    getMorePlayers();
  }


  const teams = ["Arsenal", "Aston Villa", "Bournemouth", "Brentford", "Brighton", "Burnley", "Chelsea", "Crystal Palace", "Everton", "Fulham", "Liverpool", "Luton", "Man City", "Man Utd", "Newcastle Utd", "Notts Forrest", "Sheff Utd", "Spurs", "West Ham", "Wolves"]

  const positions = ["GK", "DEF", "MID", "ATT"];

  return ( 
    <div className="relative">
      <div className="flex justify-between items-center flex-col md:flex-row">
        <Heading text="Available Players" />
        <div className="flex items-center justify-center">
          <div className="pr-2 relative">
            <Button text="Filters" onclick={handleClick} />
            <div className={`${isActive ? "hidden" : ""} z-10 min-w-[250px] absolute mt-4 w-full bg-gradient-to-r from-gray-900 to-gray-700 p-4`}>
              <h3 className="text-white font-bold">Filters</h3>
              <div className="p-2">
                <h4 className="text-white font-bold text-sm pb-2">Sort By</h4>
                <select className="p-2 min-w-full bg-white/95">
                 <option value="Team">Sort By Team</option>
                 <option value="LastName">Sort By Name</option>
                 <option value="Points">Sort By 22/23 Points</option>
                </select>

                <h4 className="text-white font-bold text-sm pb-2 pt-4">Teams</h4>
                <select className="p-2 min-w-full bg-white/95">
                  <option value="">All Teams</option>
                  {teams.map((team) => {
                    return (
                      <option key={team} value={team}>{team}</option>
                    )
                  })}
                </select>

                <h4 className="text-white font-bold text-sm pb-2 pt-4">Positions</h4>
                <select className="p-2 min-w-full bg-white/95">
                  <option value="">All Positions</option>
                  {positions.map((position) => {
                    return (
                      <option key={position} value={position}>{position}</option>
                    )
                  })}
                </select>
              </div>
            </div>
          </div>
          <Search placeholder="Quick search for a player..." />
        </div>
      </div>

      <div className="py-12 px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 x xl:grid-cols-5 2xl:grid-cols-6 gap-3">
            {players.length === 0 ? (
              <div className="col-span-6 flex items-center justify-center min-h-[calc(100vh-293px)]">
                <p className="text-white">No players available for this search term - Try again.</p>
              </div>
            ) : (
              <>
                {players.map((player) => {
                return (
                  <div key={player.id}>
                    <PlayerCard key={player.id} onclick={() => handleModalClick(player.id)} firstName={player.FirstName} lastName={player.LastName} image={player.Image} points={player.Points} position={player.Position} logo={player.Logo} /> 
                    <div className={visibleModal === player.id ? "fixed top-0 right-0 left-0 bottom-0 bg-black/50 z-40 flex items-center justify-center transition-transform scale-100" : "scale-95 hidden"}>
                      <PlayerModal key={player.id} firstName={player.FirstName} lastName={player.LastName} image={player.Image} goBack={closeModal} handlePlayerSelected={() => handlePlayerSelected(player)} />
                    </div>    
                  </div>             
                  )
                })}
              </>
            )}
      </div>
      <div className="pt-8 flex items-center justify-center">
        <Button text="Load More Players" onclick={handleMorePlayers} />
      </div>
    </div>
   );
}
 
export default AvailablePlayers;