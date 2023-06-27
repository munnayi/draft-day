import React, { useState } from 'react';

import Layout from './pages/Layout';
import Login from './pages/Login';
import DraftBoard from './pages/DraftBoard';
import AvailablePlayers from './pages/AvailablePlayers';
import Team from './pages/Team';
import NotFound from './pages/NotFound';

import {
  createBrowserRouter, 
  createRoutesFromElements,
  Route, 
  RouterProvider
} from 'react-router-dom'

const App = () => {

  const [manager, setManager] = useState();
  const [userId, setUserId] = useState();

  const router = createBrowserRouter (
    createRoutesFromElements (
      <Route path="/" element={<Layout setManager={setManager} manager={manager} userId={userId} setUserId={setUserId} />}>
        <Route index element={<Login />} errorElement={<NotFound />} />
        <Route path="big-board" element={<DraftBoard />} errorElement={<NotFound />} />
        <Route path="available" element={<AvailablePlayers userId={userId} />}  errorElement={<NotFound />} />
        <Route path="teams/:id" element={<Team manager={manager} userId={userId} />} errorElement={<NotFound />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} />
  )
}

export default App;
