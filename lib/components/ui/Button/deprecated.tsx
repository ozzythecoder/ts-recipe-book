import clsx from "clsx";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function Button({ className, children, ...props }: Props) {

  return <button {...props} className={clsx(className, "h-10 px-4 rounded-md bg-blue-700 text-white", props.disabled && "bg-gray-400")}>{children}</button>;
}
