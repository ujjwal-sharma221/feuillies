"use client";

import { useQuery } from "convex/react";

import { Navbar } from "./_components/navbar";
import { TemplateGallery } from "./_components/template-gallery";
import { api } from "../../../convex/_generated/api";

export default function HomePage() {
  const documents = useQuery(api.documents.get);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
        {documents?.map((document) => (
          <div key={document._id}>{document.title}</div>
        ))}
      </div>
    </div>
  );
}
