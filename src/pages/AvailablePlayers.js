import React from "react";

import {db} from "../core/firebase-config";
import {collection, query, where, doc, updateDoc} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import PlayerCard from "../components/PlayerCard";
import Heading from "../components/Heading";
import Button from "../components/Button";
import PlayerModal from "../components/PlayerModal";

import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Pagination, Configure, useHits, RefinementList, ToggleRefinement } from 'react-instantsearch-hooks-web';


const searchClient = algoliasearch('E0YB66F8UT', '49291fa6d4341fea8e9191cd0856c567');

const AvailablePlayers = ({manager, currentPick}) => {

  const [isActive, setActive] = useState("false");
  const [visibleModal, setVisibleModal] = useState(null);

  const navigate = useNavigate();

  const handleClick = () => {
    setActive(!isActive);
  }

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

  const handleModalClick = (objectID) => {
    setVisibleModal(objectID);
  };


  const CustomHits = () => {
    const { hits } = useHits();
    return (
      <div className="py-12 px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 x xl:grid-cols-5 2xl:grid-cols-6 gap-3">
      {hits.map(hit => (
          <div key={hit.objectID}>
            <PlayerCard key={hit.objectID} firstName={hit.first_name} lastName={hit.web_name} image={hit.code} logo={hit.team} position={positions[hit.element_type-1]} onclick={() => handleModalClick(hit.objectID)} /> 
  
            <div className={visibleModal === hit.objectID ? "fixed top-0 right-0 left-0 bottom-0 bg-black/50 z-40 flex items-center justify-center transition-transform scale-100" : "scale-95 hidden"}>
            <PlayerModal key={hit.objectID} firstName={hit.first_name} lastName={hit.second_name} image={hit.code} teamName={hit.team} position={positions[hit.element_type-1]} goBack={closeModal} handlePlayerSelected={() => handlePlayerSelected(hit)} />
            </div>    
          </div>
      ))}
    </div>
    ) 
  };

  const teams = ["Arsenal", "Aston Villa", "Bournemouth", "Brentford", "Brighton", "Burnley", "Chelsea", "Crystal Palace", "Everton", "Fulham", "Liverpool", "Luton", "Man City", "Man Utd", "Newcastle Utd", "Notts Forrest", "Sheff Utd", "Spurs", "West Ham", "Wolves"]

  const transformTeamItems = (items) => {
    return items.map((item, index) => {
      return {
        ...item,
        label: teams[index],
      };
    });
  };

  const positions = ["GK", "DEF", "MID", "ATT"];

  const transformElementTypeItems = (items) => {
    return items.map((item, index) => {
      return {
        ...item,
        label: positions[index],
      };
    });
  };

  return ( 
    <InstantSearch 
      searchClient={searchClient} 
      indexName='players'
      initialUiState={{
        indexName: {
          refinementList: {
            selected: ['false']
          }
        },
      }}>
    <Configure hitsPerPage={20} />
    <div className="relative">
      <div className="flex justify-between items-center flex-col md:flex-row">
        <Heading text="Available Players" />
        <Pagination />
        <div className="flex items-center justify-center">
          <div className="pr-2 relative">
            <Button text="Filters" onclick={handleClick} />
            <div className={`${isActive ? "hidden" : ""} z-10 min-w-[250px] absolute mt-4 w-full bg-gradient-to-r from-gray-900 to-gray-700 p-4`}>
              <h3 className="text-white font-bold">Filters</h3>
              <div className="p-2">
              <h4 className="text-white font-bold text-sm pb-2 pt-4">Selected</h4>
                <ToggleRefinement 
                  attribute="selected"
                  sortBy={["team:asc", "element_type:asc"]} 
                  classNames={{
                    labelText: "text-white"
                  }} />
                <h4 className="text-white font-bold text-sm pb-2 pt-4">Teams</h4>
                <RefinementList 
                  attribute="team"
                  limit={5}
                  showMore={true}
                  transformItems={transformTeamItems}
                  sortBy={["team:asc", "element_type:asc"]} 
                  classNames={{
                    labelText: "text-white",
                    showMore: "h-[36px] rounded-none  hover:bg-gradient-to-r hover:from-slate-700 hover:to-slate-900 hover:text-white transition-all"
                  }} />

                <h4 className="text-white font-bold text-sm pb-2 pt-4">Positions</h4>
                <RefinementList 
                  attribute="element_type"
                  transformItems={transformElementTypeItems}
                  sortBy={["element_type:asc", "team:asc"]}
                  classNames={{
                    labelText: "text-white"
                  }} />
              </div>
            </div>
          </div>
          <div className='search'>
            {/* <input type='text' placeholder='Search' /> */}
            <SearchBox />
          </div>
        </div>
      </div>

      <div>
            {/* {players.length === 0 ? (
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
            )} */}

          <CustomHits />
        
      </div>
      {/* <div className="pt-8 flex items-center justify-center">
        <Button text="Load More Players" onclick={handleMorePlayers} />
      </div> */}
    </div>
    <div className="flex items-center justify-center">
    <Pagination />
    </div>
    </InstantSearch>  
   );
}
 
export default AvailablePlayers;



