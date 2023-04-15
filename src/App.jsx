import { useState } from "react";
import styles from "./App.module.css";
import Header from "./components/Header/Header";
import { db } from "./firebase-config";
import LoginForm from "./components/LoginForm/LoginForm";
import Message from "./components/Message/Message";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const logHandler = () => {
    if (isLogged) {
      setIsLogged(false);
    } else {
      setIsLogin(true);
    }
  };

  return (
    <>
      <Header isLogged={isLogged} logHandler={logHandler} />
      <div className={styles.content}>
        {isLogin && (
          <LoginForm setIsLogged={setIsLogged} setIsLogin={setIsLogin} />
        )}
        {!isLogin && <Message isLogged={isLogged} />}
      </div>
    </>
  );
}

export default App;
