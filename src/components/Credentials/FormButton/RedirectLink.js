import { Link } from "react-router-dom";

function RedirectLink({ endpoint, text }) {
  return (
    <Link className="credentials__redirect opacity" to={endpoint}>
      {text}
    </Link>
  );
}

export default RedirectLink;
