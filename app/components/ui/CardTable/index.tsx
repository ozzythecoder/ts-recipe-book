import styles from './style.module.css';

interface Props extends React.PropsWithChildren {
  style? : React.CSSProperties;
}

export default function CardTable({ children, style }: Props) {

  return (
    <section style={style} className={styles.cardTable}>
      {children}
    </section>
  )
}