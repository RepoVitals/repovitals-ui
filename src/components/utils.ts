import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tw-merge";

export default function cn(...value: ClassValue[]) {
  return twMerge(clsx(...value));
}
