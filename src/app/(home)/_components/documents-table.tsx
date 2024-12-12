import { PaginationStatus } from "convex/react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import { Doc } from "../../../../convex/_generated/dataModel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DocumentAnimatedIcon from "@/components/document-icon";
import OrganisationAnimatedIcon from "@/components/building-icon";
import AnimatedUserIcon from "@/components/user-icon";
import { DocumentMenu } from "./document-menu";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface DocumentsTableProps {
  documents: Doc<"documents">[] | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}

export function DocumentsTable({
  status,
  documents,
  loadMore,
}: DocumentsTableProps) {
  return (
    <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-5">
      {documents === undefined ? (
        <div className="animate-spin ">
          <Loader2 />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="font-extrabold text-black">Name</TableHead>
              <TableHead>&nbsp;</TableHead>
              <TableHead className="font-extrabold text-black">
                Shared
              </TableHead>
              <TableHead className=" font-extrabold text-black">
                Created At
              </TableHead>
            </TableRow>
          </TableHeader>
          {documents.length === 0 ? (
            <TableBody>
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={4}
                  className="h-24 text-center font-semibold text-muted-foreground"
                >
                  No documents found
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {documents.map((doc) => (
                <DocumentRow key={doc._id} document={doc} />
              ))}
            </TableBody>
          )}
        </Table>
      )}
      <div className="flex items-center justify-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => loadMore(5)}
          disabled={status !== "CanLoadMore"}
        >
          {status === "CanLoadMore" ? "Load More" : "End of results"}
        </Button>
      </div>
    </div>
  );
}

interface DocumnetRowProps {
  document: Doc<"documents">;
}

function DocumentRow({ document }: DocumnetRowProps) {
  const onNewTabClick = (id: string) => {
    window.open(`/documents/${id}`, "_blank");
  };

  const router = useRouter();

  return (
    <TableRow
      onClick={() => router.push(`/documents/${document._id}`)}
      className="cursor-pointer"
    >
      <TableCell className="w-[50px]">
        <DocumentAnimatedIcon />
      </TableCell>
      <TableCell className="font-medium md:w-[45%]">{document.title}</TableCell>
      <TableCell className="hidden md:flex items-center gap-2 md:-ml-2 font-medium">
        {document.organisationId ? (
          <OrganisationAnimatedIcon className="size-9 text-black" />
        ) : (
          <AnimatedUserIcon className="size-9 text-black" />
        )}
        {document.organisationId ? "Organisation" : "Personal"}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {format(new Date(document._creationTime), "MMM dd, yyyy")}
      </TableCell>
      <TableCell className="flex ml-auto justify-end">
        <DocumentMenu
          documentId={document._id}
          title={document.title}
          onNewTab={onNewTabClick}
        />
      </TableCell>
    </TableRow>
  );
}
