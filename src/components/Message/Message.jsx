import styles from "./Message.module.css";
import { db } from "../../firebase-config";
import { useEffect, useState } from "react";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

function Message(props) {
  const [message, setMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [isButton, setIsButton] = useState(false);
  const msgCollectionRef = collection(db, "messages");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDocs(msgCollectionRef);
      setMessage(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0].message
      );
      setNewMessage(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))[0].message
      );
    };

    fetchData();
  }, []);

  const changeNewMessageHandler = (e) => {
    setIsButton(e.target.value.trim().length !== 0);
    setNewMessage(e.target.value);
  };

  const changeMessageHandler = async (e) => {
    e.preventDefault();
    const userDoc = doc(db, "messages", "Ib7ySGcFXflqeaZSbDox");
    const newPassword = { message: newMessage };
    await updateDoc(userDoc, newPassword);
    setIsButton(false);
  };

  return (
    <div className={styles.message}>
      {props.isLogged && (
        <form onSubmit={changeMessageHandler}>
          <input
            type="text"
            value={newMessage}
            onChange={changeNewMessageHandler}
          />
          {isButton && <button>Set</button>}
        </form>
      )}
      {!props.isLogged && <h1>{`"${message}"`}</h1>}
    </div>
  );
}

export default Message;
