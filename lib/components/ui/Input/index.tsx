interface Props extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({  }: Props) {
  return <input className="p-2 my-2 border-2 rounded-sm" />
}