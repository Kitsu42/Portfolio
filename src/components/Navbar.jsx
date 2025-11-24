import { Link, useLocation } from "react-router-dom";


export default function Navbar() {
const { pathname } = useLocation();


const menu = [
{ label: "Início", to: "/" },
{ label: "Games", to: "/games" },
{ label: "Arts", to: "/arts" },
{ label: "Artigos", to: "/artigos" }
];


return (
<nav style={{
display: "flex",
justifyContent: "center",
gap: "1rem",
padding: "1.2rem",
background: "#12121A",
position: "sticky",
top: 0,
zIndex: 10
}}>
{menu.map(item => (
<Link key={item.to} to={item.to}
style={{
padding: "0.5rem 1rem",
background: pathname === item.to ? "#0b0c0cff" : "#1A1A26",
borderRadius: "20px",
color: "#EAF6FF"
}}>
{item.label}
</Link>
))}
</nav>
);
}