import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function properCase(str: string | null | undefined, wordToUpper: string[] = []): string {
	if (!str || str === null || str === undefined) return "";
	return str
	  .split(" ")
	  .map((word) => 
		wordToUpper.includes(word.toLowerCase())
		  ? word.toUpperCase()
		  : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
	  )
	  .join(" ");
  }
