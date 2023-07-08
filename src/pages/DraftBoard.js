import React from "react";
import Heading from "../components/Heading";
import PlayerPick from "../components/PlayerPick";
import PlayerSelectedModal from "../components/PlayerSelectedModal";
import Button from "../components/Button";

import { useState, useEffect } from 'react';
import {db} from "../core/firebase-config";
import { collection, onSnapshot, query, where, doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const DraftBoard = ({currentPick, manager = {}, setManager}) => {

  const navigate = useNavigate();
  const [isActive, setActive] = useState(false);
  const [players, setPlayers] = useState("");
  const [cookies, setCookie, removeCookie] = useCookies(['userId']);
  const user = cookies.userId;

  const fetchManager = async (user) => {
    const docRef = doc(db, 'Managers', user);
    const docSnapshot = await getDoc(docRef);
    setManager({ ...docSnapshot.data(), id: docSnapshot.id });
    console.log(manager)
  };

  useEffect(() => {
    if (user && manager === null) {
      fetchManager(user);
    }
  }, [user, manager]);

  useEffect(() => {

    const q = query(collection(db, "players"), where("selected", "==", true));
    onSnapshot(q, (querySnapshot) => {
      setPlayers(querySnapshot.docs.reverse().map((doc) => ({...doc.data(), id: doc.id})));
      setActive(!isActive);

      // setTimeout(() => {
      //   setActive(!isActive);
      //   if (players.length !== 0 && manager.id === currentPick) {
      //     navigate("/available");
      //   }
      // }, 6000);

    });
  }, [manager, currentPick]);

  return ( 
    <>
      <Heading text="Draft Board" />

      {players.length === 0 ? (
      <div className="grid grid-cols-7 gap-2 pt-8">
        <div className="col-span-7 flex items-center justify-center min-h-[calc(100vh-300px)]">
          {manager.id === currentPick ? (
            <>
              <Button text="Start Draft" onclick={() => {navigate("/available")}} />
            </>
          ) : (
            <p className="text-white">Waiting for first pick to start the draft.</p>
          )} 
        </div>
      </div>
      ) : (
        <>
        <div className="grid grid-cols-7 gap-2 pt-8">
          {players.map((player) => {
          return (
            <PlayerPick playerName={player.web_name} teamLogo={player.selectedTeamLogo} pick={player.pick} />            
            )  
          })}
        </div>
        <div className={isActive ? "hidden" : "fixed top-0 right-0 left-0 bottom-0 z-10 bg-black/75 flex items-center justify-center"}>
          <PlayerSelectedModal teamName={players[0].selectedTeamName} image={players[0].code} firstName={players[0].first_name} lastName={players[0].last_name} pick={players[0].pick} logo={`../images/logos/${players[0].selectedTeamLogo}`} />
        </div>
        </>
      )}
    </>
   );
}
 
export default DraftBoard;