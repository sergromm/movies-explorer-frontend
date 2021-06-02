import "./ShowMore.css";

function ShowMore({ handleClick }) {
  return (
    <button onClick={handleClick} className="show-more opacity">
      Ещё
    </button>
  );
}

export default ShowMore;
