import { Mail, Instagram, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <p className="footer-title">Carlos Vinicius — Portfólio</p>

        <div className="social-icons">

          <a href="mailto:cviniciusoliveira15@gmail.com" target="_blank">
            <Mail size={22} />
          </a>

          <a href="#" target="_blank">
            <Instagram size={22} />
          </a>

          <a href="https://www.linkedin.com/in/carlos-vinicius-de-oliveira-lima-55bb5320b/" target="_blank">
            <Linkedin size={22} />
          </a>

          <a href="https://github.com/Kitsu42" target="_blank">
            <Github size={22} />
          </a>

        </div>
      </div>
    </footer>
  );
}
