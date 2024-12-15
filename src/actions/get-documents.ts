import { ConvexHttpClient } from "convex/browser";

import { Id } from "../../convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";

export async function getDocuments(ids: Id<"documents">[]) {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  return await convex.query(api.documents.getByIds, { ids });
}
