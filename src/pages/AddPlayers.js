import Button from "../components/Button";
import data from "../data/data.json"


import {db} from "../core/firebase-config";
import {collection, addDoc} from "firebase/firestore";

const AddPlayers = () => {

  const handleAddPlayers = () => {
    data.forEach(async item => {
      try {
        const docRef = await addDoc(collection(db, 'players'), item);
        console.log('Document written with ID: ', docRef.id);
      } catch (error) {
        console.error('Error writing document: ', error);
      }
    });
  }

  return ( 
    <>
    <Button text="Add Players" onclick={handleAddPlayers} />
    </>
   );
}
 
export default AddPlayers;