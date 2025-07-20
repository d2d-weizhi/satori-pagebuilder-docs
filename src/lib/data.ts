"use server";
import { neon } from "@neondatabase/serverless";

export const sql = neon(process.env.DATABASE_URL!);

// Example query function:
export async function getAllEntities() {
  // Adjust column selection as needed
  return await sql`
    SELECT id, name, slug, category, description, status, version_introduced 
    FROM entities
    ORDER BY name ASC
  `;
}

export async function getAllInterfaces() {
  return await sql`
    SELECT id, name, slug, description, status, version_introduced
    FROM entities
    WHERE category = 'Interface'
    ORDER BY name ASC
  `;
}

export async function getInterfaceBySlug(slug: string) {
  const [iface] = await sql`
    SELECT * FROM entities
    WHERE category = 'Interface' AND slug = ${slug}
    LIMIT 1
  `;
  return iface;
}

// NEW: Get all members for an entity
export async function getMembersForEntity(entityId: string) {
  return await sql`
    SELECT name, type, required, default_value, description, since_version, deprecated, deprecated_reason
    FROM members
    WHERE entity_id = ${entityId}
    ORDER BY name ASC
  `;
}

export async function getRelatedEntitiesForEntity(entityId: string) {
  return await sql`
    SELECT e.name, e.slug, e.category, r.relationship
    FROM related_entities r
    JOIN entities e ON r.related_id = e.id
    WHERE r.entity_id = ${entityId}
    ORDER BY e.name ASC
  `;
}