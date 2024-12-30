import { Link, NavLink, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    // <ul>
    //   <li onClick={() => navigate('/')}>Home</li>
    //   <li onClick={() => navigate('/about')}>About</li>
    //   <li onClick={() => navigate('/contact')}>Contact</li>
    // </ul>
    <ul>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? 'text-blue-700' : '')}
          to={'/'}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? 'text-blue-700' : '')}
          to={'/about'}
        >
          About
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? 'text-blue-700' : '')}
          to={'/contact'}
        >
          Contact
        </NavLink>
      </li>
    </ul>
  );
}

export default Header;
