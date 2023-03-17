
interface Props extends React.PropsWithChildren {
  style?: React.CSSProperties
}

export default function Card({ children, style }: Props) {


  const cardStyles: React.CSSProperties = {
    border: '1px solid black',
    borderRadius: '5px',
    padding: '2rem',
    width: '250px',
    ...style
  }

  return (
    <div style={cardStyles}>
      {children}
    </div>
  )
}