import Logo from "./Logo";
import Title from "./Title";

function Hero() {
  return (
    <div className="credentials__hero">
      <Logo />
      <Title text={"Рады видеть!"} />
    </div>
  );
}

export default Hero;
