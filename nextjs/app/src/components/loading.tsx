import { AiOutlineLoading } from "react-icons/ai";

const Loading = (): JSX.Element => {
  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center">
        <AiOutlineLoading className="animate-spin text-orange-500" size={24} />
      </div>
    </>
  );
};

export default Loading;
