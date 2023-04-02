interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  style?: React.CSSProperties;
  callback?: () => void;
}

export default function Button({ style, callback, children, ...props }: Props) {

  const buttonStyle: React.CSSProperties = {
    fontSize: "1rem",
    textTransform: "uppercase",
    padding: "10px 20px",
    margin: "0.1rem 0.5rem",
    backgroundColor: "#0000ffbb",
    color: "white",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    ...style
  }

  return (
    <button style={buttonStyle} onClick={callback} {...props}>
      {children}
    </button>
  );
}
