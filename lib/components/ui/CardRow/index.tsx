interface Props extends React.PropsWithChildren {
  style?: React.CSSProperties;
  link?: string;
}

const CardRow = ({ style, link, children }: Props) => {

  return <div className="grid grid-cols-1 mobile:grid-cols-2 lg:grid-cols-3 gap-2 justify-evenly align-middle">{children}</div>;
}

export default CardRow;