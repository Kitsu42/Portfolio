import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });

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

        {/* Desktop - Slide Tabs */}
        <ul
          className="nav-links desktop"
          onMouseLeave={() =>
            setPosition((prev) => ({ ...prev, opacity: 0 }))
          }
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.path}
              to={tab.path}
              setPosition={setPosition}
            >
              {tab.name}
            </Tab>
          ))}
          <Cursor position={position} />
        </ul>

        {/* Mobile Menu */}
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

// Componente Tab reutilizável
const Tab = ({
  children,
  to,
  setPosition,
}: {
  children: React.ReactNode;
  to: string;
  setPosition: (pos: any) => void;
}) => {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      className="tab-item"
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
    >
      <NavLink to={to} className="tab-link">
        {children}
      </NavLink>
    </li>
  );
};

// Cursor deslizante
const Cursor = ({ position }: { position: any }) => {
  return (
    <motion.li
      animate={position}
      className="cursor-slide"
      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
    />
  );
};