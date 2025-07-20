import he from "he";

/* eslint-disable  @typescript-eslint/no-explicit-any */
export function MembersList({ members }: { members: any[] }) {
  if (!members || members.length === 0) {
    return <div className="text-sm text-gray-500 italic">No members documented.</div>;
  }
  return (
    <ul className="space-y-5">
      {members.map((member) => (
        <li key={member.name} className="border-l-4 pl-4 border-blue-500 bg-gray-50 dark:bg-neutral-900 py-2 rounded">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono font-semibold text-blue-800 dark:text-blue-300">{member.name}</span>
            <span className="font-mono text-xs bg-gray-200 dark:bg-neutral-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded">
              {member.type}
            </span>
            {member.required && (
              <span className="text-xs text-green-700 bg-green-50 dark:bg-green-900 px-2 py-0.5 rounded ml-2 font-medium">required</span>
            )}
            {member.deprecated && (
              <span title={member.deprecated_reason || "Deprecated"} className="text-xs text-red-700 bg-red-100 dark:bg-red-900 px-2 py-0.5 rounded ml-2 font-medium">deprecated</span>
            )}
          </div>
          {member.description && (
            <div 
              className="text-gray-600 dark:text-gray-300 mb-1"
              style={{
                fontSize: "14px",
                lineHeight: "1.3rem",
                letterSpacing: "0.4px"
              }}
            >
              {he.decode(member.description)}
            </div>
          )}
          <div className="flex flex-wrap gap-4 text-xs text-gray-500 dark:text-gray-400">
            {member.default_value && (
              <span>
                <b>Default:</b> <span className="font-mono">{String(member.default_value)}</span>
              </span>
            )}
            {member.since_version && (
              <span>
                <b>Since:</b> {member.since_version}
              </span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
