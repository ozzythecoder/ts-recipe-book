import styles from './style.module.css'

interface Props extends React.PropsWithChildren {
}

export default function UList(props: Props) {


  return (
    <ul className={styles.list} style={{ padding: 'none' }}>
      {props.children ? props.children : null}
    </ul>
  )
}