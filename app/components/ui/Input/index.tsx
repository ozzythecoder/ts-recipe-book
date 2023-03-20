interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
}

export default function Input({ style, ...props }: Props) {
  
  const inputStyle: React.CSSProperties = {
    ...style
  }

  return <input style={inputStyle} {...props} />
}