import React, { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

const Input: React.FC<IInputProps> = ({
  label,
  error,
  register,
  ...inputProps
}) => {
  return (
    <div className="form-group mt-16">
      <label className="mb-4" htmlFor={inputProps.id}>
        {label}
      </label>
      <input
        className={`form-control text-white ${error ? "is-invalid" : ""}`}
        {...inputProps}
        {...register}
      />
      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
};

export default Input;
