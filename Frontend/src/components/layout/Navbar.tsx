import { useState } from "react"

export default function Navbar(){

  const [open,setOpen] = useState(false)

  return(

    <nav className="navbar">

      <div className="container navbar-inner">

        <div className="logo">
          Kitsu
        </div>

        <button
          className="menu-btn"
          onClick={()=>setOpen(!open)}
        >
          ☰
        </button>

        <ul className={`nav-links ${open ? "open":""}`}>

          <li>Home</li>
          <li>Projects</li>
          <li>Articles</li>
          <li>Games</li>

        </ul>

      </div>

    </nav>

  )
}