"use client";
import { Graph, ThemeController } from "./components/Components";
import { useEffect } from "react";
import { themeChange } from "theme-change";

export default function Home() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <>
      <div className="">
        <ThemeController />
        <Graph />
      </div>
    </>
  );
}
