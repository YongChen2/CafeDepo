// Otevírací doba ověřená klientkou (2026-07-28).
export const OTEVIRACI_DOBA = [
  { den: "PO", open: "08:00", close: "18:00" },
  { den: "UT", open: "08:00", close: "18:00" },
  { den: "ST", open: "08:00", close: "18:00" },
  { den: "CT", open: "08:00", close: "18:00" },
  { den: "PA", open: "08:00", close: "22:00" },
  { den: "SO", open: "09:00", close: "22:00" },
  { den: "NE", open: "09:00", close: "14:00" },
] as const;

export const VYDEJ_OBEDU = { open: "11:00", close: "14:45" };

export { dnesniIndexPraha as dnesniIndex } from "./date";
