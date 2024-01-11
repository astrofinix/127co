import { writable } from "svelte/store";

interface AlertParams {
  message: string;
  type: "fail" | "success";
}

export const alerts = writable<Array<AlertParams>>([]);
