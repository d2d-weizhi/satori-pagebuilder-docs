// app/api-reference/page.tsx
import Link from "next/link";
import he from "he";
import { getAllEntities } from "@/lib/data";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default async function ApiReferencePage() {
  const entities = await getAllEntities();

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">API Reference</h1>
      <ul className="space-y-4">
        {entities.map((entity: any) => (
          <li key={entity.id} className="border-b pb-3">
            <Link href={`/api-reference/${entity.slug}`}>
              <span className="font-semibold text-blue-600 hover:underline">{entity.name}</span>
            </Link>
            <span className="ml-3 text-sm text-gray-500">{entity.category}</span>
            {entity.description && (
              <div className="text-gray-600 mt-1">{he.decode(entity.description)}</div>
            )}
            <div className="text-xs text-gray-400 mt-1">
              Status: {entity.status} &nbsp;|&nbsp; Introduced: {entity.version_introduced}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}