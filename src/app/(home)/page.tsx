"use client";

import { usePaginatedQuery } from "convex/react";

import { Navbar } from "./_components/navbar";
import { TemplateGallery } from "./_components/template-gallery";
import { api } from "../../../convex/_generated/api";
import { DocumentsTable } from "./_components/documents-table";
import { useSearchParam } from "@/hooks/use-search-params";

export default function HomePage() {
  const [search] = useSearchParam("search");
  const { results, status, loadMore } = usePaginatedQuery(
    api.documents.get,
    { search },
    { initialNumItems: 5 },
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />
      </div>
    </div>
  );
}
