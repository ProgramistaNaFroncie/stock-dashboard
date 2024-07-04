"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { redirectIfAuthenticated } from "@/hoc/redirectIfAuthenticated";
import Button from "@/components/Button";
import Input from "@/components/Input";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onTouched" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const password = watch("password");

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      data-testid="register-form"
      className="container py-40"
    >
      <h1 className="mb-32">Create Your Account</h1>
      <Input
        label="Email"
        type="email"
        id="email"
        placeholder="Enter Your E-mail"
        register={register("email", {
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Invalid email address",
          },
        })}
        error={errors.email}
        data-testid="email-input"
      />
      <Input
        label="Password"
        type="password"
        id="password"
        placeholder="Enter Your Password"
        register={register("password", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password must be at least 6 characters long",
          },
        })}
        error={errors.password}
        data-testid="password-input"
      />
      <Input
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        placeholder="Confirm Your Password"
        register={register("confirmPassword", {
          required: "Please confirm your password",
          validate: (value) =>
            value === password || "The passwords do not match",
        })}
        error={errors.confirmPassword}
        data-testid="confirm-password-input"
      />
      <Button
        type="submit"
        className="btn btn-primary btn-block mt-32 px-40"
        disabled={loading}
        data-testid="register-button"
      >
        {loading ? (
          <div
            className="spinner-border spinner-border-sm"
            role="status"
            data-testid="loading-spinner"
          />
        ) : (
          "Register"
        )}
      </Button>
      <div className="mt-16">
        <p>
          Already have an account?{" "}
          <Link className="text-pink" href="/login">
            Log in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default redirectIfAuthenticated(Register);
