import { useSubscriptionStore } from "@/store/store";
import { Subscription } from "@/types/Subscription";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isPro(subscription: Subscription | null) {
  return (subscription?.role === 'pro'  && subscription?.status === 'active')
}