import { useEffect, useState } from "react";
import { nb } from "../data/site";

function getGreeting(): string {
  const hour = new Date().getHours();

  if (hour < 12) return nb("Good Morning ☀️");
  if (hour < 18) return nb("Good Afternoon 🌤️");
  return nb("Good Evening 🌙");
}

/** Time-based greeting that stays correct if the tab is left open past midnight. */
export function useGreeting(): string {
  const [greeting, setGreeting] = useState(getGreeting);

  useEffect(() => {
    const intervalId = window.setInterval(() => setGreeting(getGreeting()), 60_000);
    return () => window.clearInterval(intervalId);
  }, []);

  return greeting;
}
