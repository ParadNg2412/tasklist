import TodoApp from "@/components/Todo";
import Image from "next/image";

export default function Home() {
  return (
    <div className="mt-4 h-screen w-full justify-center items-center px-5">
      <TodoApp />
    </div>
  );
}
