import { Graph } from "./components/Centralized";

export default function Home() {
  return (
    <>
      <div className="flex h-screen w-screen place-content-center">
        <Graph />
      </div>
    </>
  );
}
