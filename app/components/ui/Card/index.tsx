import styles from './style.module.css';
import clsx from 'clsx';

interface Props extends React.PropsWithChildren {
  style?: React.CSSProperties
  clickable?: Boolean;
}

export default function Card({ children, clickable = false, style }: Props) {

  return (
    <div
      className={clsx(styles.card, clickable && styles.clickable)}
      style={style}
      >
      {children}
    </div>
  )
}