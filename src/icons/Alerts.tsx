import React from "react";

interface IProps {
  isActive: boolean;
  className?: string;
}

const HomeIcon: React.FC<IProps> = ({ isActive, className }) => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="24"
    height="24"
    fill={isActive ? "rgb(255, 97, 190)" : "white"}
  >
    <path
      d="M12 2C10.9 2 10 2.9 10 4H14C14 2.9 13.1 2 12 2ZM18 8V11C18 12.1 18.4 13.2 19 14L20 16H4L5 14C5.6 13.2 6 12.1 6 11V8C6 5.8 7.8 4 10 4H14C16.2 4 18 5.8 18 8ZM22 16V17H2V16H22ZM16 19H8V20C8 21.1 8.9 22 10 22H14C15.1 22 16 21.1 16 20V19Z"
      fill={isActive ? "rgb(255, 97, 190)" : "white"}
    />
  </svg>
);

export default HomeIcon;
