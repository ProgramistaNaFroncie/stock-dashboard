"use client";

import { IStockData } from "@/app/indexes/types";
import CreateAlert from "./CreateAlert";
import { AppContext } from "@/App.context";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

interface IProps {
  id: string;
  stockData: IStockData[];
}

const EditAlert: React.FC<IProps> = ({ id, stockData }) => {
  const { userAlerts } = useContext(AppContext);
  const router = useRouter();
  const alert = userAlerts.find((userAlert) => userAlert.id === id);

  useEffect(() => {
    if (id && !alert) {
      router.push("/alerts");
    }
  }, [alert, id, router]);

  return <CreateAlert defaultValues={alert} stockData={stockData} isEdit />;
};

export default EditAlert;
