import { Icon } from "@iconify/react"
import { stacks } from "../../data/stacks"

export default function TechStack(){

  return(

    <section className="techstack container">

      <div className="stack-icons">

        {stacks.map((icon,index)=>(
          <Icon
            key={index}
            icon={icon}
            width="40"
            className="stack-icon"
          />
        ))}

      </div>

    </section>

  )
}