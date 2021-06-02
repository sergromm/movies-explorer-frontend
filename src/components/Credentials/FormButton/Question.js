import RedirectLink from "./RedirectLink";

function Question({ text, endpoint, linkText }) {
  return (
    <p className="credentials__question">
      {text}
      <RedirectLink endpoint={endpoint} text={linkText} />
    </p>
  );
}

export default Question;
