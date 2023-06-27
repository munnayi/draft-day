import { useState, useEffect } from 'react';
import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from 'react-router-dom';
import {db} from "../core/firebase-config";
import {doc, getDoc} from "firebase/firestore";

const Layout = ({manager, setManager, userId, setUserId}) => {

  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = () => {               
    signOut(auth).then(() => {
    // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully")
        handleNav();
        setManager(null);
    }).catch((error) => {
    // An error happened.
    });
  }

  const [isNavActive, setIsNavActive] = useState("false");

  const handleNav = () => {
    setIsNavActive(!isNavActive);
  }

  useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          const uid = user.uid;
          setUserId(uid);
          fetchDocument(userId);
        } else {
          // User is signed out
          console.log("user is logged out")
        }
      });

      const fetchDocument = async (userId) => {
        try {
          const docRef = doc(db, "Managers", userId)
          const docSnapshot = await getDoc(docRef);
      
          if (docSnapshot.exists) {
            const data = docSnapshot.data();
            setManager(data);
          } else {
            console.log("Wrong")
          }
        } catch (error) {
          // Handle any errors that occur during the retrieval process
        }
      };
  
  }, [auth, setUserId, userId, setManager, manager]);

  return ( 
    <div className="bg-[url('https://static.vecteezy.com/system/resources/previews/001/975/222/original/abstract-background-stadium-stage-hall-with-scenic-lights-of-round-futuristic-technology-free-vector.jpg')] bg-cover bg-no-repeat bg-center relative after:absolute after:top-0 after:bottom-0 after:left-0 after:right-0 after:bg-black/50">
      <ScrollRestoration />
      <div className="min-h-screen relative z-10">
        <header className="p-4 text-center grid grid-cols-3">
          <div className="col-span-1 col-start-2 bg-white p w-[300px] max-w-[300px] m-auto">
            <img src="../images/logo.svg" alt="The League" />
          </div>
          <div className="col-span-1 col-start-3 flex flex-col items-end relative">
            {manager ? <div className="rounded-full bg-orange-500 text-white p-2 border-4 border-orange-500 transition-all hover:border-white cursor-pointer" onClick={handleNav}>{manager.Initials}</div> : null }
            <div className={isNavActive ? ("hidden") : ("absolute top-16 bg-white min-w-[200px] z-40")}>
              <Link className="p-4 block transition-all hover:bg-slate-100" to="/big-board" onClick={handleNav}>Big Board</Link>
              {manager ? <Link className="p-4 block transition-all hover:bg-slate-100" onClick={handleNav} to={`/teams/${manager.ShortName}`}>My Team</Link> : null }
              <div className="p-4">
                <Link className="p-4 block transition-all bg-slate-700 text-white hover:bg-slate-900 cursor-pointer" onClick={handleLogout}>Log out</Link>
              </div>
            </div>
          </div>

        </header>

        <main className="p-8 relative pb-20">
          <Outlet />
        </main>
        
        <footer className="fixed bottom-0 left-0 right-0 z-50">
        </footer>
      </div>
    </div>
   );
}
 
export default Layout;