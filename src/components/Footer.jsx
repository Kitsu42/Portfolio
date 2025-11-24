export default function Footer() {
return (
<footer style={{
padding: "2rem",
textAlign: "center",
color: "#AABACA"
}}>
© {new Date().getFullYear()} — Kitsu
</footer>
);
}