import clsx from "clsx";

interface Props extends React.PropsWithChildren {
  className?: string;
  link?: string;
}

const Card = ({ children, className }: Props) => {

  return (
    <div className={clsx(className, "border-gray-200 border-2 rounded-md border-solid p-5 md:w-48 min-w-full")}>
      {children}
    </div>
  );
};

export default Card;
