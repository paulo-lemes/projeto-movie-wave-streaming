"use client"

import { requestAPI } from "@/api";
import { useEffect } from "react";

export default function Home() {
  useEffect(()=>{
  requestAPI("GET", "authentication");
  }, [])

  return <main className="mb-auto"></main>;
}
