import { NavLink } from "react-router-dom";
import logo from './image/logo.svg';

// retourne le composant Header, les menus
function Header () {
  return (
    <header className="header-main">
      <NavLink to="/">
        <img className="logo" src={logo} alt="logo de SportSee" />
      </NavLink>
      <nav className="navbar">
        <ul className="navbarList">
          <li className="navbarListItem">
            <NavLink className="navbarLink" to="/">Accueil</NavLink>
          </li>
          <li className="navbarListItem">
            <NavLink className="navbarLink" to="/profil">Profil</NavLink>
          </li>
          <li className="navbarListItem">
            <NavLink className="navbarLink" to="/reglages">Réglages</NavLink>
          </li>
          <li className="navbarListItem">
            <NavLink className="navbarLink" to="/communaute">Communauté</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
  
export default Header;