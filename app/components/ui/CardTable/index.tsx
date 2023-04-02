import './styles.css'

interface Props extends React.PropsWithChildren {
  style? : React.CSSProperties;
  className? : string;
}

export default function CardTable({ children, className, style }: Props) {

  return (
    <section style={style} className={className}>
      <div className="card-table">
        {children}
      </div>
    </section>
  )
}