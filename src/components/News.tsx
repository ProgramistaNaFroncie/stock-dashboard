import Arrow from "@/icons/Arrow";
import React from "react";

interface IProps {
  title: string;
  text: string;
}

const News: React.FC<IProps> = ({ title, text }) => (
  <div className="border-top py-16 d-flex row cursor-pointer w-100">
    <div className="col-11">
      <h4 className="fs-20 mb-8">{title}</h4>
      <p className="fs-12 text-ellipsis">{text}</p>
    </div>
    <div className="col-1 d-flex align-items-center justify-content-end">
      <Arrow />
    </div>
  </div>
);

export default News;
