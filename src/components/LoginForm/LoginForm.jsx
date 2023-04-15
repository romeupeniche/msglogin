import { useState } from "react";
import styles from "./LoginForm.module.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [admins, setAdmins] = useState([]);
  const userCollectionRef = collection(db, "admins");

  const loginHandler = async (e) => {
    e.preventDefault();
    const data = await getDocs(userCollectionRef);
    setAdmins(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    admins.forEach((admin) => {
      if (email === admin.email && password === admin.password) {
        props.setIsLogged(true);
        props.setIsLogin(false);
      }
    });
    setEmail("");
    setPassword("");
  };

  return (
    <div className={styles.form}>
      <h1>Login</h1>
      <form onSubmit={loginHandler}>
        <input
          type="email"
          placeholder="Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
