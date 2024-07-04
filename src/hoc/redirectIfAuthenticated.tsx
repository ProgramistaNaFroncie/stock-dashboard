"use client";

import React, { useContext, useEffect } from "react";
import { AppContext } from "@/App.context";
import { useRouter } from "next/navigation";

export const redirectIfAuthenticated = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return function AuthRedirectComponent(props: P) {
    const { user } = useContext(AppContext);
    const router = useRouter();

    useEffect(() => {
      if (user) {
        router.replace("/");
      }
    }, [user, router]);

    return !user ? <WrappedComponent {...props} /> : null;
  };
};
