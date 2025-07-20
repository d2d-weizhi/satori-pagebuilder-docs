import { getInterfaceBySlug, getRelatedEntitiesForEntity, getMembersForEntity  } from "@/lib/data";
import { toKebabCase } from "@/lib/helpers";
import he from "he";
import Link from "next/link";
import { MembersList } from "@/components/shared/members-list";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export default async function InterfaceDetailPage({ params }: { params: { slug: string } }) {

  const iface = await getInterfaceBySlug(params.slug);

  if (!iface) {
    return <div>Not found</div>;
  }

  const members = await getMembersForEntity(iface.id);

  // Fetch related entities (implement this helper to return [{ name, slug, relationship }, ...])
  const relatedEntities = await getRelatedEntitiesForEntity(iface.id);

  return (
    <div className="flex flex-row w-full gap-6">
      {/* Main Content Area */}
      <div className="flex-1 p-6">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-500">
          <Link href="/api-reference" className="hover:underline">API Reference</Link>
          <span className="mx-2">/</span>
          <Link href="/api-reference/interface" className="hover:underline">Interfaces</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-semibold">{iface.name}</span>
        </nav>

        {/* Header */}
        <div className="flex items-center gap-4 mb-3">
          <h1 className="text-2xl font-bold">{iface.name}</h1>
          <span className="bg-gray-100 text-xs text-gray-700 px-2 py-1 rounded font-mono">
            {iface.version_introduced}
          </span>
        </div>

        <div className="max-w-2xl">
          {/* Description & meta */}
          <div 
            className="text-gray-600 mb-3"
            style={{
              fontSize: "14px",
              lineHeight: "1.3rem",
              letterSpacing: "0.4px"
            }}
          >
            {he.decode(iface.description || "")}
          </div>
          <div className="text-xs text-gray-400 mb-6">
            Created: {iface.date_created ? new Date(iface.date_created).toISOString().split("T")[0] : "—"}&nbsp;
            |&nbsp;Updated: {iface.date_updated ? new Date(iface.date_updated).toISOString().split("T")[0] : "—"}&nbsp;
            |&nbsp;Status: {iface.status}
          </div>
        </div>

        {/* Members section */}
        <section className="mb-10 max-w-3xl">
          <h2 className="text-lg font-semibold mb-3">Members</h2>
          <MembersList members={members} />
        </section>
      </div>

      {/* Right Sidebar */}
      <aside className="w-[200px] min-h-screen pl-4 pr-2 py-6 border-l border-gray-200 dark:border-neutral-800">
        <h3 className="text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest">See also:</h3>
        <ul className="space-y-1">
          {relatedEntities.length > 0 ? (
            relatedEntities.map((rel: any) => {
              const cat = toKebabCase(rel.category || "");
              return (
                <li key={rel.slug}>
                  <Link
                    href={`/api-reference/${cat}/${rel.slug}`}
                    className="text-blue-500 hover:text-gray-300"
                    title={`${rel.relationship} • ${rel.category}`}
                  >
                    {rel.name}
                    <span className="ml-2 text-xs text-gray-400">({rel.relationship})</span>
                  </Link>
                </li>
              );
            })
          ) : (
            <li className="text-xs text-gray-400">No related entities.</li>
          )}
        </ul>
      </aside>
    </div>
  );
}
