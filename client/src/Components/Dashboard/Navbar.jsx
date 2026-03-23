function Navbar(props) {
  return (
    <div className="navbar">
      <div className="title">
        <h1>Dashboard</h1>
        {props.user && <p>{props.user.email}</p>}
      </div>
      <button onClick={props.logout}>Logout</button>
    </div>
  );
}

export default Navbar;
