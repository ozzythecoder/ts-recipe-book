import React from "react";

interface Props extends React.PropsWithChildren {
  style?: React.CSSProperties;
  link?: string;
}

const CardRow = ({ style, link, children }: Props) => {

  return <div className="flex flex-col gap-1 md:flex-row md:flex-wrap justify-evenly align-middle">{children}</div>;
}

export default CardRow;