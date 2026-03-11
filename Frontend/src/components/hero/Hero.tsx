import avatar from "../../assets/images/Test.png"

export default function Hero(){

  return(

    <section className="hero container">

      <div className="hero-content">

        <img
          src={avatar}
          className="hero-photo"
          alt="Kitsu"
        />

        <div className="hero-text">

          <h1>My name is Kitsu</h1>

          <p>
            Software developer focused on backend,
            security and system architecture.
          </p>

        </div>

      </div>

    </section>

  )
}