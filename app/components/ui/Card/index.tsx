import './styles.css';
import clsx from 'clsx';

interface Props extends React.PropsWithChildren {
  style?: React.CSSProperties
  className?: string;
  clickable?: Boolean;
}

export default function Card({ children, className = "", clickable = false, style }: Props) {

  return (
    <div
      className={clsx("card", className, clickable && "clickable")}
      style={style}
      >
      {children}
    </div>
  )
}