import Hero from "../../components/hero/Hero"
import TechStack from "../../components/stacks/TechStack"
import NeonDivider from "../../components/ui/NeonDivider"
import FeaturedArticles from "../../components/articles/FeaturedArticles"
import FeaturedProjects from "../../components/projects/FeaturedProjects"

export default function Home(){

  return(
    <>

      <Hero />

      <TechStack />

      <NeonDivider />

      <FeaturedArticles />

      <NeonDivider />

      <FeaturedProjects />

    </>
  )

}