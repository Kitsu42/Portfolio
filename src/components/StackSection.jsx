export default function StackSection() {
  const stacks = [
    "React", "JavaScript", "Python", "C", "PostgreSQL", "Linux" 
  ];

  return (
    <div className="stack-section">
      <h2>Stacks</h2>

      <div className="stack-list">
        {stacks.map((stack, i) => (
          <span key={i} className="stack-item">{stack}</span>
        ))}
      </div>
    </div>
  );
}
