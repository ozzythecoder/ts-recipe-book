import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({ onClick, className, children }: Props) {

  return <button className={clsx(className, "h-10 px-4 rounded-md bg-blue-700 text-white")} onClick={onClick}>{children}</button>;
}
