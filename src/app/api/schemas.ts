import { z } from "zod";

export const alertSchema = z.object({
  symbol: z.string().min(3),
  price: z.number(),
  direction: z.enum(["above", "below"]),
  name: z.string().optional(),
});

export const idSchema = z.object({
  id: z.string(),
});

export const apiRequestSchema = z.object({
  endpoint: z.string().min(5),
  timestamp: z.number(),
  status: z.enum(["rejected", "fulfilled"]),
});

export type IAlert = z.infer<typeof alertSchema>;

export interface IAlertDoc extends IAlert {
  uid: string;
}

export type ApiRequestData = z.infer<typeof apiRequestSchema>;
