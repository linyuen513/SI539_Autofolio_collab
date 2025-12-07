import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="Footer">
      <p>© {new Date().getFullYear()} Autofolio, All rights reserved.</p>
      <p>
        Made by{" "}
        <a href="https://dongsubkim.com" target="_blank" rel="noreferrer">
          Dongsub Kim
        </a>
        ,{" "}
        <a href="https://linyuen.framer.website/" target="_blank" rel="noreferrer">
          Anne Lin
        </a>
        .
      </p>
    </footer>
  );
}

export default Footer;