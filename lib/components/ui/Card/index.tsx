interface Props extends React.PropsWithChildren {
  style?: React.CSSProperties;
  link?: string;
}

const Card = ({ children, style }: Props) => {
  const cardStyles: React.CSSProperties = {
    border: "1px solid black",
    borderRadius: "5px",
    padding: "10px",
    margin: "5px",
    minWidth: "200px",
    ...style,
  };

  return (
    <div style={cardStyles}>{children}</div>
  )
}

export default Card;