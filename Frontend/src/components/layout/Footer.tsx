import { Icon } from "@iconify/react"

export default function Footer(){

  return(

    <footer className="footer">

      <div className="container footer-inner">

        <p>© 2026 Kitsu</p>

        <div className="socials">

          <Icon icon="mdi:github" width="24"/>
          <Icon icon="mdi:linkedin" width="24"/>
          <Icon icon="mdi:email" width="24"/>

        </div>

      </div>

    </footer>

  )
}