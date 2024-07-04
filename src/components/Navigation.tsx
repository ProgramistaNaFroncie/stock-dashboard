"use client";

import React, { useContext } from "react";
import { usePathname } from "next/navigation";
import { AppContext } from "@/App.context";
import Logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import Button from "./Button";
import HomeIcon from "@/icons/Home";
import IndexesIcon from "@/icons/Indexes";
import AlertsIcon from "@/icons/Alerts";
import { useRouter } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useContext(AppContext);

  const handleLogout = async () => {
    router.push("/login");
    await logout();
  };

  return (
    <nav className="d-flex flex-column nav-container">
      <div className="px-32 py-16 d-flex align-items-center logo-container border-bottom">
        <Image src={Logo} width={50} height={50} alt="Logo" />
        <h2 className="ml-8 fs-24">Dashboard</h2>
      </div>
      <div className="m-32 h-100 relative">
        {user ? (
          <>
            <div className="d-flex flex-column">
              <Link
                className={clsx("mb-16 fs-24 d-flex align-items-center", {
                  "text-pink": pathname === "/",
                })}
                href="/"
              >
                <HomeIcon isActive={pathname === "/"} className="mr-8" />
                Home
              </Link>
              <Link
                className={clsx("mb-16 fs-24", {
                  "text-pink": pathname.includes("/indexes"),
                })}
                href="/indexes"
              >
                <IndexesIcon
                  isActive={pathname.includes("/indexes")}
                  className="mr-8"
                />
                Indexes
              </Link>
              <Link
                className={clsx("mb-16 fs-24", {
                  "text-pink": pathname.includes("/alerts"),
                })}
                href="/alerts"
              >
                <AlertsIcon
                  isActive={pathname.includes("/alerts")}
                  className="mr-8"
                />
                Alerts
              </Link>
            </div>
            <Button
              className="logout-button"
              data-testid="logout-button"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </>
        ) : (
          <div className="d-flex flex-column">
            <Link
              className={clsx("mb-16 fs-24", {
                "text-pink": pathname === "/login",
              })}
              href="/login"
            >
              Login
            </Link>
            <Link
              className={clsx("mb-16 fs-24", {
                "text-pink": pathname === "/register",
              })}
              href="/register"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
