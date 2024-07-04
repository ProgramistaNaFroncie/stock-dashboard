"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import React from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  href?: string;
}

export enum ButtonVariants {
  "primary",
  "secondary",
}

const Button: React.FC<IProps> = ({
  children,
  href,
  variant = ButtonVariants.primary,
  className,
  onClick,
  ...props
}) => {
  const router = useRouter();

  return (
    <button
      onClick={href ? () => router.push(href) : onClick}
      className={clsx(
        "fs-16 py-8 px-16 d-flex align-items-center justify-content-center fw-bold border-solid",
        className,
        {
          "bg-pink text-black border-pink": variant === ButtonVariants.primary,
          "bg-transparent text-pink border-pink border-1":
            variant === ButtonVariants.secondary,
        }
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
