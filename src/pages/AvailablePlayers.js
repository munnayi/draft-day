import React from "react";

import {db} from "../core/firebase-config";
import {collection, getDocs, query, where, orderBy, limit, startAfter, doc, updateDoc} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import PlayerCard from "../components/PlayerCard";
import Heading from "../components/Heading";
import Search from "../components/Search";
import Button from "../components/Button";
import PlayerModal from "../components/PlayerModal";

const AvailablePlayers = ({manager, currentPick}) => {

  const [isActive, setActive] = useState("false");
  const [visibleModal, setVisibleModal] = useState(null);

  const navigate = useNavigate();

  const handleClick = () => {
    setActive(!isActive);
  }

  const handleModalClick = (id) => {
    setVisibleModal(id);
  };

  const closeModal = () => {
    setVisibleModal(null);
  };

  const playersRef = collection(db, "players");
  const availablePlayers = query(playersRef, where("selected", "==", false))

  const handlePlayerSelected = async (player) => {
    console.log(`${player.id} ${player.first_name} ${player.second_name} selected`)


    const playerRef = doc(db, "players", player.id);
    await updateDoc(playerRef, {
      selected: true,
      selectedTeamLogo: manager.TeamLogo,
      selectedManager: currentPick,
      selectedTeamName: manager.TeamName,
      pick: manager.NextPick
    });

    const managerNextPickRef = doc(db, "Managers", currentPick);
    const picks = manager.Picks;

    await updateDoc(managerNextPickRef, {
      "NextPick": picks.pop(),
      "Picks": picks
    })

    closeModal();
    navigate("/big-board");
    navigate(0);
  }


  const [players, setPlayers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedPositionOption, setSelectedPositionOption] = useState(0);
  const [lastPlayer, setLastPlayer] = useState('');

  const handleDropdownChange = (event) => {
    setSelectedOption(parseInt(event.target.value));
  };

  const handlePositionDropdownChange = (event) => {
    setSelectedPositionOption(parseInt(event.target.value));
  };

  const sortBy = query(availablePlayers, orderBy("team"), orderBy("element_type"), limit(3));
  const playersByTeam = query(availablePlayers, where("team", "==", selectedOption), orderBy("element_type"), limit(3));
  const playersByPosition = query(availablePlayers, where("element_type", "==", selectedPositionOption), orderBy("team"), limit(3));


  const getPlayers = async () => {
    const data = await getDocs(sortBy);
    const filterData = await getDocs(playersByTeam);
    const filterPositionData = await getDocs(playersByPosition);

    if (selectedOption) {
      setPlayers(filterData.docs.map((doc) => ({...doc.data(), id: doc.id})));
      setLastPlayer(filterData.docs[filterData.docs.length-1]);
    } else if (selectedPositionOption) {
      setPlayers(filterPositionData.docs.map((doc) => ({...doc.data(), id: doc.id})));
      setLastPlayer(filterPositionData.docs[filterPositionData.docs.length-1]);
    } else {
      setPlayers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLastPlayer(data.docs[data.docs.length-1]);
    }
  }

  useEffect(()=> {
    getPlayers();
  }, [selectedOption, selectedPositionOption])

  const getMorePlayers = async () => {

    const sortBy = query(availablePlayers, orderBy("team"), orderBy("element_type"), startAfter(lastPlayer), limit(3));
    const playersByTeam = query(availablePlayers, where("team", "==", selectedOption), orderBy("element_type"), startAfter(lastPlayer), limit(3));
    const playersByPosition = query(availablePlayers, where("element_type", "==", selectedPositionOption), orderBy("team"), startAfter(lastPlayer), limit(3));

    const data = await getDocs(sortBy);
    const filterData = await getDocs(playersByTeam);
    const filterPositionData = await getDocs(playersByPosition);

    if (selectedOption) {
      const newPlayers = filterData.docs.map((doc) => ({...doc.data(), id: doc.id}))
      setPlayers((players) => [...players, ...newPlayers]);
      setLastPlayer(filterData.docs[filterData.docs.length-1]);
    } else if (selectedPositionOption) {
      const newPlayers = filterPositionData.docs.map((doc) => ({...doc.data(), id: doc.id}))
      setPlayers((players) => [...players, ...newPlayers]);
      setLastPlayer(filterPositionData.docs[filterPositionData.docs.length-1]);
    } else {
      const newPlayers = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
      setPlayers((players) => [...players, ...newPlayers]);
      setLastPlayer(data.docs[data.docs.length-1]);
    }
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
                <h4 className="text-white font-bold text-sm pb-2 pt-4">Teams</h4>
                <select className="p-2 min-w-full bg-white/95" value={selectedOption} onChange={handleDropdownChange}>
                  <option value="">All Teams</option>
                  {teams.map((team, index) => {
                    return (
                      <option key={team} value={index+1}>{team}</option>
                    )
                  })}
                </select>

                <h4 className="text-white font-bold text-sm pb-2 pt-4">Positions</h4>
                <select className="p-2 min-w-full bg-white/95" value={selectedPositionOption} onChange={handlePositionDropdownChange}>
                  <option value="">All Positions</option>
                  {positions.map((position, index) => {
                    return (
                      <option key={position} value={index+1}>{position}</option>
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
                    <PlayerCard key={player.id} onclick={() => handleModalClick(player.id)} firstName={player.first_name} lastName={player.web_name} image={player.code} position={positions[player.element_type-1]} logo={player.team} /> 
                    <div className={visibleModal === player.id ? "fixed top-0 right-0 left-0 bottom-0 bg-black/50 z-40 flex items-center justify-center transition-transform scale-100" : "scale-95 hidden"}>
                      <PlayerModal key={player.id} firstName={player.first_name} lastName={player.second_name} image={player.code} teamName={player.team} position={positions[player.element_type-1]} goBack={closeModal} handlePlayerSelected={() => handlePlayerSelected(player)} />
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