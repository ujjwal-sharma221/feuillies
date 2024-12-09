import { PaginationStatus } from "convex/react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Doc } from "../../../../convex/_generated/dataModel";
import { LoadingText } from "./loading-text";
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
import AnimateMenuIcon from "@/components/menu-icon";

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
        <LoadingText>
          {"querying your templates"}
          {"querying your documents"}
          {"querying your life choices"}
        </LoadingText>
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
    </div>
  );
}

interface DocumnetRowProps {
  document: Doc<"documents">;
}

function DocumentRow({ document }: DocumnetRowProps) {
  return (
    <TableRow className="cursor-pointer">
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
        <Button variant="ghost">
          <AnimateMenuIcon />
        </Button>
      </TableCell>
    </TableRow>
  );
}
