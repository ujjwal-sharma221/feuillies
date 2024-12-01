"use client";

import {
  BoldIcon,
  FileType2Icon,
  ItalicIcon,
  ListIcon,
  LucideIcon,
  MessagesSquareIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Toolbar() {
  const { editor } = useEditorStore();

  const SECTIONS: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessagesSquareIcon,
        onClick: () => console.log("message icon clicked"),
      },
      {
        label: "List Todo",
        icon: ListIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("tasklist"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];

  return (
    <div className="px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {SECTIONS[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-zinc-700" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-zinc-700" />
      <Separator orientation="vertical" className="h-6 bg-zinc-700" />
      <Separator orientation="vertical" className="h-6 bg-zinc-700" />

      {SECTIONS[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-zinc-700" />
      {SECTIONS[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
    </div>
  );
}

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

function ToolbarButton({ icon: Icon, isActive, onClick }: ToolbarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-zinc-200",
        isActive && "bg-neutral-200",
      )}
    >
      <Icon className="size-4" />
    </button>
  );
}

function FontFamilyButton() {
  const { editor } = useEditorStore();
  const FONTS = [
    { lable: "Arial", value: "Arial" },
    { lable: "Times new Roman", value: "TImes New Roman" },
    { lable: "Courier New", value: "Courier New" },
    { lable: "Georgia", value: "Georgia" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7  shrink-0 flex items-center justify-between rounded-sm hover:bg-zinc-200 px-1.5 overflow-hidden text-sm",
          )}
        >
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily}
          </span>
          <FileType2Icon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        defaultValue="Arial"
        className="p-1 flex  flex-col gap-y-1"
      >
        {FONTS.map((font) => (
          <button
            onClick={() =>
              editor?.chain().focus().setFontFamily(font.value).run()
            }
            key={font.value}
            className={cn(
              "flex items-center  gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200",
              editor?.getAttributes("textStyle").fontFamily === font.value &&
                "bg-neutral-200",
            )}
            style={{ fontFamily: font.value }}
          >
            <span>{font.lable}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function HeadingLevelButton() {
  const { editor } = useEditorStore();

  const HEADINGS = [
    {
      label: "Normal text",
      value: 0,
      fontSize: "16px",
    },
    {
      label: "Heading 1",
      value: 1,
      fontSize: "32px",
    },
    {
      label: "Heading 2",
      value: 2,
      fontSize: "24px",
    },
    {
      label: "Heading 3",
      value: 3,
      fontSize: "20px",
    },
    {
      label: "Heading 4 ",
      value: 4,
      fontSize: "18px",
    },
    {
      label: "Heading 5 ",
      value: 5,
      fontSize: "16px",
    },
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive("heading", { level })) return `Heading ${level}`;

      return "Normal text";
    }
  };
}
