import Link from "next/link";
import he from "he";
import { getAllInterfaces } from "@/lib/data";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default async function InterfacesPage() {
  const interfaces = await getAllInterfaces();

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Interfaces</h1>
      <ul className="space-y-4">
        {interfaces.map((intf: any) => (
          <li key={intf.id} className="border-b pb-3">
            <Link href={`/api-reference/interface/${intf.slug}`}>
              {intf.name}
            </Link>
            {intf.description && (
              <div 
                className="text-gray-600 mt-1 text-xs"
                style={{
                  lineHeight: "1.3rem",
                  letterSpacing: "0.4px"
                }}
              >
                {he.decode(intf.description)}
              </div>
            )}
            <div className="text-xs text-gray-400 mt-1">
              Status: {intf.status} &nbsp;|&nbsp; Introduced: {intf.version_introduced}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}