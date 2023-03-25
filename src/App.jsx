import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./App.css";

const firebaseConfig = {
  apiKey: "AIzaSyA-o2ZHzqM2WTSkfCl7IAoSjTB14xaFb0s",
  authDomain: "msg-login-8b212.firebaseapp.com",
  projectId: "msg-login-8b212",
  storageBucket: "msg-login-8b212.appspot.com",
  messagingSenderId: "273483830872",
  appId: "1:273483830872:web:083f98ec4022f5afd11c2d",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  const db = getFirestore(app);
  const msgsCollection = collection(db, "messages");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [currentMsgDoc, setCurrentMsgDoc] = useState("");
  const [message, setMessage] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [isAdm, setIsAdm] = useState(false);

  useEffect(() => {
    const getMsg = async () => {
      const data = await getDocs(msgsCollection);
      setCurrentMsgDoc(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))[0]
      );
    };
    getMsg();
  }, []);

  function handleSignIn(e) {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    signInWithEmailAndPassword(email, password);
  }

  // if (loading) {
  //   return <p>carregando...</p>;
  // }

  if (user) {
    console.log(user);
  }

  async function setNewMsg(e) {
    e.preventDefault();
    await deleteMsg(currentMsgDoc.id);
    await addDoc(msgsCollection, { message });
  }

  async function deleteMsg(id) {
    const msgDoc = doc(db, "messages", id);
    await deleteDoc(msgDoc);
  }

  function logout() {
    setIsAdm(false);
    setIsLogin(false);
  }

  return (
    <>
      <nav className="header">
        {isAdm ? (
          <>
            <button className="header-logout" onClick={() => logout()}>
              Logout
            </button>
            <h1>You're now an ADMIN, you can edit the message</h1>
          </>
        ) : (
          <button className="header-login" onClick={() => setIsLogin(true)}>
            Login
          </button>
        )}
      </nav>
      {message !== "undefined" ? (
        <div id="content">
          {isLogin ? (
            <div className="login-container">
              <h1 className="login-title">Login</h1>
              <form className="login-form" onSubmit={handleSignIn}>
                <input type="email" />
                <input type="password" />
                <button type="submit">Logar</button>
                <button onClick={() => setIsLogin(false)}>Cancel</button>
              </form>
            </div>
          ) : (
            <div className="message-container">
              {isAdm ? (
                <form className="msg-form" onSubmit={setNewMsg}>
                  <input
                    type="text"
                    value={message === null ? currentMsgDoc.message : message}
                    onChange={(e) => {
                      document
                        .getElementById("submit-msg")
                        .classList.add("show-msg-save-button");
                      setMessage(e.target.value);
                    }}
                  />
                  <button
                    id="submit-msg"
                    type="submit"
                    onClick={() =>
                      document
                        .getElementById("submit-msg")
                        .classList.remove("show-msg-save-button")
                    }
                  >
                    Salvar
                  </button>
                </form>
              ) : (
                <h1 className="message">
                  {isAdm
                    ? message
                      ? `"${message}"`
                      : `"${currentMsgDoc.message}"`
                    : currentMsgDoc
                    ? `"${currentMsgDoc.message}"`
                    : ""}
                </h1>
              )}
            </div>
          )}
        </div>
      ) : (
        "deu pessimo"
      )}
    </>
  );
}

export default App;
