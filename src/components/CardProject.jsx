export default function CardProject({ title, desc, link }) {
return (
<div className="card">
<h3>{title}</h3>
<p>{desc}</p>
<a href={link} target="_blank">🔗 Ver projeto</a>
</div>
);
}