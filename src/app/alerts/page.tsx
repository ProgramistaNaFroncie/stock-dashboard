"use client";

import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "@/App.context";
import { withAuth } from "@/hoc/withAuth";
import Button, { ButtonVariants } from "@/components/Button";
import Loading from "@/app/loading";

const Alerts = () => {
  const { user, setUserAlerts, userAlerts } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setIsLoading(true);
        const token = await user?.getIdToken();
        const response = await fetch("/api/alerts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (result.length) {
          setUserAlerts(result);
        }
      } catch (e) {
        alert("Something went wrong...");
      } finally {
        setIsLoading(false);
      }
    };

    if (!userAlerts.length) {
      fetchAlerts();
    }
  }, [userAlerts, user, setUserAlerts]);

  return !isLoading ? (
    <section className="container py-40">
      {userAlerts.length ? (
        <>
          <h1 className="mb-32">Your Alerts</h1>
          <div className="d-flex flex-column">
            {userAlerts.map((alert) => (
              <div
                key={alert.id}
                className="d-flex align-items-center w-100 justify-content-between my-8"
              >
                <span>
                  {alert.name} {alert.direction} ${alert.price}
                </span>
                <Button href={`/alerts/${alert.id}`}>EDIT</Button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h1>You dont have any alerts</h1>
      )}
      <Button
        className="mt-40"
        href="/alerts/new"
        variant={ButtonVariants.secondary}
      >
        Create new Alert
      </Button>
    </section>
  ) : (
    <div className="d-flex w-100 py-80 justify-content-center">
      <Loading />
    </div>
  );
};

export default withAuth(Alerts);
