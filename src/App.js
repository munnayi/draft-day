import { React, useEffect, useState } from "react";
import {db} from "./core/firebase-config";
import {collection, query, orderBy, onSnapshot} from "firebase/firestore";
import Layout from './pages/Layout';
import Login from './pages/Login';
import DraftBoard from './pages/DraftBoard';
import AvailablePlayers from './pages/AvailablePlayers';
import AddPlayers from './pages/AddPlayers';
import Team from './pages/Team';
import NotFound from './pages/NotFound';


import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom'

const App = () => {
  const [manager, setManager] = useState("");
  const [currentPick, setCurrentPick] = useState("");

  useEffect(() => {
    const q = query(collection(db, "Managers"), orderBy("NextPick"));
    onSnapshot(q, (querySnapshot) => {
      setCurrentPick(querySnapshot.docs[0].id);
    });
  }, []);

  const router = createBrowserRouter (
    createRoutesFromElements (
      <Route path="/" element={<Layout setManager={setManager} manager={manager} />}>
        <Route index element={<Login manager={manager} setManager={setManager} />} errorElement={<NotFound />} />
        <Route path="/big-board" element={<DraftBoard currentPick={currentPick} manager={manager} setManager={setManager} />} errorElement={<NotFound />} />
        <Route path="/available" element={<AvailablePlayers manager={manager} currentPick={currentPick} setCurrentPick={setCurrentPick} />}  errorElement={<NotFound />} />
        <Route path="/teams/:id" element={<Team manager={manager} />} errorElement={<NotFound />} />
        <Route path="add-players" element={<AddPlayers />} errorElement={<NotFound />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App;
