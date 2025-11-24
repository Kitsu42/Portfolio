import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function ArticleCard({ title, summary, file }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");

  const toggleOpen = () => {
    setOpen(!open);

    if (!open && content === "") {
      fetch(`/src/articles/${file}`)
        .then(res => res.text())
        .then(text => setContent(text));
    }
  };

  return (
    <div className="article-card">
      <div className="article-header" onClick={toggleOpen}>
        <div>
          <h3>{title}</h3>
          {!open && (
            <p className="article-summary">{summary}</p>
          )}
        </div>

        <span className="arrow">{open ? "▲" : "▼"}</span>
      </div>

      {open && (
        <div className="article-body">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}
