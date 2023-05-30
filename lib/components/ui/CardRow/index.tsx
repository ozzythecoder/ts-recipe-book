import React from "react";

interface Props extends React.PropsWithChildren {
  style?: React.CSSProperties;
  link?: string;
}

const CardRow = ({ style, link, children }: Props) => {
  const cardRowStyles: React.CSSProperties = {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "space-evenly",
  };

  return <div style={cardRowStyles}>{children}</div>;
}

export default CardRow;