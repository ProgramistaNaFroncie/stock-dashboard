import React from "react";

interface IProps {
  isActive: boolean;
  className?: string;
}

const IndexesIcon: React.FC<IProps> = ({ isActive, className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={isActive ? "rgb(255, 97, 190)" : "white"}
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M3 20h18v-2H3v2zm2-4h2v-5H5v5zm4 0h2v-9H9v9zm4 0h2V7h-2v9zm4 0h2V4h-2v12z" />
  </svg>
);

export default IndexesIcon;
