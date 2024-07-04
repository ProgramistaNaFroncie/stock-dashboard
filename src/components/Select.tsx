import React, { SelectHTMLAttributes } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  options: { value: string; label: string }[];
}

const Select: React.FC<SelectProps> = ({
  label,
  error,
  register,
  options,
  ...selectProps
}) => {
  return (
    <div className="form-group mt-16">
      <label className="mb-4" htmlFor={selectProps.id}>
        {label}
      </label>
      <select
        className={`form-control text-white ${error ? "is-invalid" : ""}`}
        {...selectProps}
        {...register}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error.message}</div>}
    </div>
  );
};

export default Select;
