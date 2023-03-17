

interface Props extends React.PropsWithChildren {

}

export default function CardTable({ children }: Props) {

  const cardTableStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    margin: '10px 20%',
  }

  return (
    <section style={cardTableStyles}>
      {children}
    </section>
  )
}