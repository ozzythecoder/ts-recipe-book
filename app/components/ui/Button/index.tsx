interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  style?: React.CSSProperties;
  callback?: () => void;
}

export default function Button({ style, callback, children, ...props }: Props) {

  const buttonStyle: React.CSSProperties = {
    ...style
  }

  return (
    <button style={buttonStyle} onClick={callback} {...props}>
      {children}
    </button>
  );
}
