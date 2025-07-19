import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome to Satori PageBuilder Docs</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Your home for guides, API references, and all things Satori UI & PageBuilder.
      </p>
      {/* (Later: Add search bar, section contents, etc.) */}
    </div>
  );
}
