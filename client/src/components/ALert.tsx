import { FC } from "react";

interface Props {
  text: string;
  type: string;
}

const ALert: FC<Props> = ({ text, type }) => {
  const className =
    type === "danger"
      ? "text-center py-3 px-6 font-semibold my-3 text-red-800 bg-red-300 capitalize mx-auto w-96 rounded-lg"
      : "text-center py-3 px-6 font-semibold my-3 text-green-800 bg-green-300 capitalize mx-auto w-96 rounded-lg";
  return <div className={className}>{text}</div>;
};
export default ALert;
