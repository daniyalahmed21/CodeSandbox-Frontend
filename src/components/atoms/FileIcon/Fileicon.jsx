import { FaCss3, FaHtml5, FaJs } from "react-icons/fa";
import { GrReactjs } from "react-icons/gr";

export const FileIcon = ({ extension }) => {
  const IconMapper = {
    js: <FaJs className="w-5 h-5" color="yellow" />,
    jsx: <GrReactjs className="w-5 h-5" color="#61dbfa" />,
    css: <FaCss3 className="w-5 h-5" color="#3c99dc" />,
    html: <FaHtml5 className="w-5 h-5" color="#e34c26" />,
  };

  return <>{IconMapper[extension]}</>;
};