"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { redirectIfAuthenticated } from "@/hoc/redirectIfAuthenticated";
import Button from "@/components/Button";
import Input from "@/components/Input";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ mode: "onTouched" });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();
  const email = watch("email");
  const password = watch("password");

  useEffect(() => {
    setIsError(false);
  }, [email, password]);

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      data-testid="login-form"
      className="container py-40"
    >
      <h1 className="mb-32">Welcome back to Dashboard</h1>
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
      {isError && (
        <div className="text-red mt-8">
          Incorrect username or password. Please try again.
        </div>
      )}
      <Button
        type="submit"
        className="btn btn-primary btn-block mt-32 px-40"
        disabled={isLoading}
        data-testid="login-button"
      >
        {isLoading ? (
          <div
            className="spinner-border spinner-border-sm"
            role="status"
            data-testid="isLoading-spinner"
          />
        ) : (
          "Login"
        )}
      </Button>
      <div className="mt-16">
        <p>
          You do not have an account yet?{" "}
          <Link className="text-pink" href="/register">
            Register
          </Link>
        </p>
      </div>
    </form>
  );
};

export default redirectIfAuthenticated(Login);
