type Props = {
  title: string
}

export default function SectionTitle({ title }: Props){

  return(

    <div className="section-title container">
      <h2>{title}</h2>
    </div>

  )

}