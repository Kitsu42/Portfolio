import SectionTitle from "../ui/SectionTitle"

export default function FeaturedProjects(){

  return(

    <section className="projects container">

      <SectionTitle title="Featured Projects" />

      <div className="projects-grid">

        <div className="project-card">
            <h3>Example project</h3>
            <p>Lorem ipsum there's nothing here</p>
        </div>

        <div className="project-card">
            <h3>Example project</h3>
            <p>Lorem ipsum there's nothing here</p>
        </div>

      </div>

    </section>

  )

}
