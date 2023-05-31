interface Props extends React.PropsWithChildren {
  link?: string;
}

const Card = ({ children }: Props) => {
  return (
    <div className="border-gray-200 border-2 rounded-md border-solid p-5 m-2 w-48 min-w-full hover:bg-gray-400 focus:bg-gray-400">
      {children}
    </div>
  );
};

export default Card;
