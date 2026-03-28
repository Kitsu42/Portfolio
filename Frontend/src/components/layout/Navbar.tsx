import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const tabs = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Articles", path: "/articles" },
    { name: "Games", path: "/games" },
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        {/* Logo */}
        <div className="logo">
          <NavLink to="/" className="logo-link">
            Kitsu
          </NavLink>
        </div>

        {/* Botão Mobile */}
        <button
          className="menu-btn"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Desktop */}
        <ul className="nav-links desktop">
          {tabs.map((tab) => (
            <Tab key={tab.path} to={tab.path}>
              {tab.name}
            </Tab>
          ))}
        </ul>

        {/* Mobile */}
        <ul className={`nav-links mobile ${open ? "open" : ""}`}>
          {tabs.map((tab) => (
            <li key={tab.path}>
              <NavLink
                to={tab.path}
                onClick={() => setOpen(false)}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {tab.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

const Tab = ({ children, to }: { children: React.ReactNode; to: string }) => {
  return (
    <li className="tab-item">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `outline-link ${isActive ? "active" : ""}`
        }
      >
        <span>{children}</span>

        <span className="outline top" />
        <span className="outline right" />
        <span className="outline bottom" />
        <span className="outline left" />
      </NavLink>
    </li>
  );
};