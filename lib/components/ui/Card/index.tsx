interface Props extends React.PropsWithChildren {
  style?: React.CSSProperties;
  link?: string;
}

export default function Card({ children, style }: Props) {
  const cardStyles: React.CSSProperties = {
    border: "1px solid black",
    borderRadius: "5px",
    padding: "5px",
    margin: "5px",
    ...style,
  };

  return (
    <div style={cardStyles}>{children}</div>
  )
}