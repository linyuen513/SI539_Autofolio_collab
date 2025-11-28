import Logo from '../../src/assets/LogoWithText.svg'
import '../styles/NavBar.css'

function NavBar() {

  return (
    <>
      <div className='NavBar'>
        <a href="https://vite.dev" target="_blank">
          <img src={Logo} className="logo" alt="logo with text" />
        </a>
      </div>
    </>
  )
}

export default NavBar