import { Ellipsis } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Id } from "../../../../convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AnimatedLinkIcon from "@/components/link-icon";
import { RemoveDialog } from "@/components/remove-dialog";
import AnimatedDeleteIcon from "@/components/delete-icon";

interface DocumentMenuProps {
  documentId: Id<"documents">;
  onNewTab: (id: Id<"documents">) => void;
  title: string;
}

export function DocumentMenu({
  documentId,
  title,
  onNewTab,
}: DocumentMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <RemoveDialog documentId={documentId}>
          <DropdownMenuItem>
            <AnimatedDeleteIcon className="size-8" />
            Remove
          </DropdownMenuItem>
        </RemoveDialog>
        <DropdownMenuItem onClick={() => onNewTab(documentId)}>
          <AnimatedLinkIcon className="size-8" />
          Open a new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
