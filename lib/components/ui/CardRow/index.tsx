import React from "react";

interface Props extends React.PropsWithChildren {
  style?: React.CSSProperties;
  link?: string;
}

const CardRow = ({ style, link, children }: Props) => {

  return <div className="flex flex-row flex-wrap justify-evenly">{children}</div>;
}

export default CardRow;