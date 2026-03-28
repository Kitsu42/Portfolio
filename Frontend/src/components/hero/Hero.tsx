import avatar from "../../assets/images/Test.png"
import TechStack from "../../components/stacks/TechStack"

export default function Hero() {
  return (
    <section className="hero container">

      <div className="hero-content">

        <div className="hero-image">
          <img
            src={avatar}
            className="hero-photo"
            alt="Kitsu"
          />
        </div>

        <div className="hero-text">

          <h1>
            Building secure and scalable systems
          </h1>

          <p>
            I'm Kitsu, a software developer focused on backend engineering,
            application security, and system architecture. I design and build
            robust solutions that scale efficiently and stay resilient.
          </p>

          <div className="hero-stack">
            <h2>Tech Stack</h2>
            <TechStack />
          </div>

        </div>

      </div>

    </section>
  )
}