import "../styles/HeroSection.css";

function HeroSection() {
  const title1 = "Craft Your";
  const title2 = "Perfect Portfolio";

  return (
    <div className="HeroSection">
      <h1 className="Title1">{title1}</h1>
      <h1 className="Title2">{title2}</h1>
      <p>
        Fill in your details below and watch your professional portfolio come to
        life automatically
      </p>
    </div>
  );
}

export default HeroSection;
