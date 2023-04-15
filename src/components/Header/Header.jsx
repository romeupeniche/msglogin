import styles from "./Header.module.css";

function Header(props) {
  const buttonClasses = props.isLogged ? styles.logout : styles.login;

  return (
    <header className={styles.header}>
      <h1>Pinico's Pneus</h1>
      {props.isLogged && <h2>Admin</h2>}
      <button onClick={props.logHandler} className={buttonClasses}>
        {props.isLogged ? "Logout" : "Login"}
      </button>
    </header>
  );
}

export default Header;
