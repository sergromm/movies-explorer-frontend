import "./Burger.css";

function Burger({ handleOpen }) {
  return <button onClick={handleOpen} className="burger opacity" />;
}

export default Burger;
