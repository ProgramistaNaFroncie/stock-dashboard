"use client";

import { withAuth } from "@/hoc/withAuth";
import React, { ReactNode } from "react";

const AuthContainer: React.FC<{ children: ReactNode }> = ({ children }) =>
  children;

export default withAuth(AuthContainer);
