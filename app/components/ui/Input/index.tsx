interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
}

export default function Input({ style, ...props }: Props) {
  
  const inputStyle: React.CSSProperties = {
    height: "calc(1rem + 10px)",
    fontSize: "1.2rem",
    margin: "5px",
    ...style
  }

  return <input style={inputStyle} {...props} />
}