"use client";

import React, { useCallback, useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AppContext } from "@/App.context";
import { IStockData } from "@/app/indexes/types";
import Button, { ButtonVariants } from "./Button";
import { useRouter, useSearchParams } from "next/navigation";
import { IAlert } from "@/app/alerts/types";
import CrossIcon from "@/icons/Cross";
import Input from "./Input";
import Select from "./Select";

interface IProps {
  stockData: IStockData[];
  defaultValues?: FormValues;
  isEdit?: boolean;
}

type FormValues = {
  id?: string;
  symbol: string;
  price: number;
  direction: string;
};

const CreateAlert: React.FC<IProps> = ({
  stockData,
  defaultValues,
  isEdit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const router = useRouter();
  const search = useSearchParams();
  const symbol = search.get("symbol");
  const { user, setUserAlerts, userAlerts } = useContext(AppContext);

  useEffect(() => {
    if (defaultValues) {
      setValue("symbol", defaultValues.symbol);
      setValue("price", defaultValues.price);
      setValue("direction", defaultValues.direction);
      if (defaultValues.id) {
        setValue("id", defaultValues.id);
      }
    }
  }, [defaultValues, setValue]);

  useEffect(() => {
    if (symbol && stockData.find((stock) => stock.symbol === symbol)) {
      setValue("symbol", symbol);
    }
  }, [symbol, setValue, stockData]);

  const onDelete = useCallback(async () => {
    if (defaultValues?.id && user) {
      try {
        setIsLoading(true);
        const token = await user.getIdToken();
        await fetch("/api/alerts", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id: defaultValues.id }),
        });
        setUserAlerts(
          userAlerts.filter((alert) => alert.id !== defaultValues.id)
        );
        router.push("/alerts");
      } finally {
        setIsLoading(false);
      }
    }
  }, [defaultValues, user, setIsLoading, router, setUserAlerts, userAlerts]);

  const openModal = useCallback(() => {
    setIsModal(true);
  }, [setIsModal]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!user) {
      return;
    }

    try {
      setIsLoading(true);

      const token = await user.getIdToken();
      const name = stockData.find(
        (stock) => stock.symbol === data.symbol
      )?.name;

      const response = await fetch("/api/alerts", {
        method: isEdit ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...data,
          email: user.email,
          name: name,
        }),
      });

      const reponseData = (await response.json()) as IAlert;

      if (isEdit) {
        setUserAlerts(
          userAlerts.map((alert) =>
            alert.id === data.id ? { ...alert, ...data } : alert
          )
        );
      } else {
        setUserAlerts([...userAlerts, reponseData]);
      }

      if (response.ok) {
        reset();
        router.push("/alerts");
      }
    } catch (error) {
      alert(`Something went wrong. Try again later`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-40">
      <Select
        label="Symbol"
        id="symbol"
        data-testid="symbol-select"
        register={register("symbol", { required: "Symbol is required" })}
        error={errors.symbol}
        options={stockData.map((stock) => ({
          value: stock.symbol,
          label: stock.name,
        }))}
      />

      <Input
        label="Price"
        type="number"
        id="price"
        placeholder="Enter alert's price"
        register={register("price", {
          required: "Price is required",
          valueAsNumber: true,
        })}
        error={errors.price}
        data-testid="price-input"
      />

      <Select
        label="Direction"
        id="direction"
        data-testid="direction-select"
        register={register("direction", { required: "Direction is required" })}
        error={errors.direction}
        options={[
          { value: "above", label: "Above" },
          { value: "below", label: "Below" },
        ]}
      />

      <div className="d-flex flex-column flex-md-row w-100 justify-content-between">
        <Button
          type="submit"
          className="btn btn-primary btn-block mt-32 px-40"
          disabled={isLoading}
          data-testid="alert-button"
          variant={ButtonVariants.secondary}
        >
          {isLoading ? (
            <div
              className="spinner-border spinner-border-sm"
              role="status"
              data-testid="loading-spinner"
            />
          ) : isEdit ? (
            "Update Alert"
          ) : (
            "Create Alert"
          )}
        </Button>

        {isEdit && (
          <Button
            type="button"
            className="btn btn-primary btn-block mt-lg-32 mt-24 px-40 text-red border-red"
            disabled={isLoading}
            onClick={openModal}
            data-testid="alert-button"
            variant={ButtonVariants.secondary}
          >
            {isLoading ? (
              <div
                className="spinner-border spinner-border-sm"
                role="status"
                data-testid="loading-spinner"
              />
            ) : (
              "Delete Alert"
            )}
          </Button>
        )}
      </div>
      {isModal && isEdit && (
        <div className="confimation-modal d-flex align-items-center justify-content-center px-16">
          <div className="bg-darkGray d-flex flex-column p-40 text-center confimation-modal-content">
            <div className="d-flex w-100 justify-content-end mb-32">
              <div className="cursor-pointer" onClick={() => setIsModal(false)}>
                <CrossIcon />
              </div>
            </div>
            <h2>Are you sure you want to delete this Alert?</h2>
            <p className="mt-24 bold">
              {defaultValues?.symbol} {defaultValues?.direction} $
              {defaultValues?.price}
            </p>
            <Button
              className="btn btn-primary btn-block mt-32 px-40 text-red border-red"
              disabled={isLoading}
              onClick={onDelete}
              data-testid="alert-button"
              variant={ButtonVariants.secondary}
            >
              Yes, Delete Alert
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};

export default CreateAlert;
