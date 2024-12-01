"use client";

import {
  AlignCenterHorizontalIcon,
  AlignCenterIcon,
  PlusIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  ClipboardPasteIcon,
  FileImageIcon,
  FileType2Icon,
  HeadingIcon,
  HighlighterIcon,
  ImageUpIcon,
  ItalicIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  LogsIcon,
  LucideIcon,
  MessagesSquareIcon,
  MinusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SwatchBookIcon,
  UnderlineIcon,
  Undo2Icon,
  RulerIcon,
} from "lucide-react";
import { Level } from "@tiptap/extension-heading";
import { ColorResult, CompactPicker } from "react-color";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
    <div className="px-2.5 py-0.5 rounded-[24px]  bg-[#E5E5EA] text-[#36383C]  min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {SECTIONS[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-zinc-700" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-zinc-700" />
      <HeadingLevelButton />
      <Separator orientation="vertical" className="h-6 bg-zinc-700" />
      <FontSizeButton />
      <Separator orientation="vertical" className="h-6 bg-zinc-700" />

      {SECTIONS[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <TextColorButton />
      <HighlightColorButton />
      <Separator orientation="vertical" className="h-6 bg-zinc-700" />
      <LinkButton />
      <ImageButton />
      <AlignButton />
      <ListButton />
      <LineHeightButton />
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
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-[#FF2D55] hover:text-white",
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
            "h-7  shrink-0 flex items-center justify-between rounded-sm  hover:bg-[#FF2D55] hover:text-white px-1.5 overflow-hidden text-sm",
          )}
        >
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
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
      label: "Heading 5",
      value: 5,
      fontSize: "16px",
    },
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }
    return "Normal text";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-[#FF2D55] hover:text-white px-1.5 overflow-hidden text-sm",
          )}
        >
          <span className="truncate">{getCurrentHeading()}</span>
          <HeadingIcon className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex  flex-col gap-y-1">
        {HEADINGS.map((heading) => (
          <button
            onClick={() => {
              if (heading.value === 0)
                editor?.chain().focus().setParagraph().run();
              else
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: heading.value as Level })
                  .run();
            }}
            key={heading.value}
            style={{ fontSize: heading.fontSize }}
            className={cn(
              "flex items-center  gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200",
              (heading.value === 0 && !editor?.isActive("heading")) ||
                (editor?.isActive("heading", { level: heading.value }) &&
                  "bg-neutral-200"),
            )}
          >
            {heading.label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function TextColorButton() {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7  shrink-0 flex flex-col items-center justify-between rounded-sm  px-1.5 overflow-hidden text-sm",
          )}
        >
          <span>
            <SwatchBookIcon
              className="size-4 mt-1.5"
              style={{ color: value }}
            ></SwatchBookIcon>
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5">
        <CompactPicker
          className="p-0 shadow-sm"
          color={value}
          onChange={onChange}
        ></CompactPicker>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function HighlightColorButton() {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7 shrink-0 flex flex-col items-center hover:bg-[#FF2D55] hover:text-white justify-between rounded-sm  px-1.5 overflow-hidden text-sm",
          )}
        >
          <span>
            <HighlighterIcon className="size-4 mt-1.5"></HighlighterIcon>
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5">
        <CompactPicker
          className="p-0 shadow-sm"
          color={value}
          onChange={onChange}
        ></CompactPicker>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LinkButton() {
  const { editor } = useEditorStore();
  const [value, setValue] = useState(editor?.getAttributes("link").href || "");

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setValue(editor?.getAttributes("link").href || "");
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7 shrink-0 flex flex-col items-center hover:bg-[#FF2D55] hover:text-white justify-between rounded-sm  px-1.5 overflow-hidden text-sm",
          )}
        >
          <span>
            <LinkIcon className="size-4 mt-1.5"></LinkIcon>
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
        <Input
          placeholder="https://example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button
          onClick={() => onChange(value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onChange(value);
            }
          }}
        >
          Set
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ImageButton() {
  const { editor } = useEditorStore();
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        onChange(url);
      }
    };

    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl("");
      setDialogOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className={cn(
              "h-7 shrink-0 flex flex-col items-center hover:bg-[#FF2D55] hover:text-white justify-between rounded-sm  px-1.5 overflow-hidden text-sm",
            )}
          >
            <span>
              <FileImageIcon className="size-4 mt-1.5"></FileImageIcon>
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="">
          <DropdownMenuItem onClick={onUpload}>
            <ImageUpIcon className="size-4 mr-2"></ImageUpIcon>
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDialogOpen(true)}>
            <ClipboardPasteIcon className="size-4 mr-2"></ClipboardPasteIcon>
            Paste an Image Url
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert image URL</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Insert image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageUrlSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button onClick={handleImageUrlSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function AlignButton() {
  const { editor } = useEditorStore();

  const ALIGNMENTS = [
    {
      label: "Align Left",
      value: "left",
      icon: AlignLeftIcon,
    },
    {
      label: "Align Center",
      value: "center",
      icon: AlignCenterIcon,
    },
    {
      label: "Align right",
      value: "right",
      icon: AlignRightIcon,
    },
    {
      label: "Align justify",
      value: "justify",
      icon: AlignJustifyIcon,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7 shrink-0 flex flex-col items-center hover:bg-[#FF2D55] hover:text-white justify-between rounded-sm  px-1.5 overflow-hidden text-sm",
          )}
        >
          <span>
            <AlignCenterHorizontalIcon className="size-4 mt-1.5" />
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {ALIGNMENTS.map(({ label, icon: Icon, value }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-zinc-200",
              editor?.isActive({ TextAlign: value }) && "bg-zinc-200",
            )}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ListButton() {
  const { editor } = useEditorStore();

  const LISTS = [
    {
      label: "Bullet list",
      icon: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Ordered list",
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7 shrink-0 flex flex-col items-center hover:bg-[#FF2D55] hover:text-white justify-between rounded-sm  px-1.5 overflow-hidden text-sm",
          )}
        >
          <span>
            <LogsIcon className="size-4 mt-1.5" />
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {LISTS.map(({ label, icon: Icon, onClick, isActive }) => (
          <button
            key={label}
            onClick={onClick}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-zinc-200",
              isActive() && "bg-zinc-200",
            )}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function FontSizeButton() {
  const { editor } = useEditorStore();

  // Get the current font size or default to 16
  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [inputValue, setInputValue] = useState(currentFontSize);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setInputValue(newSize);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newSize = parseInt(inputValue) + 1;
    updateFontSize(newSize.toString());
  };

  const decrement = () => {
    const newSize = parseInt(inputValue) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <div className="flex items-center gap-x-0.5">
      <button
        onClick={decrement}
        className="size-7 shrink-0 flex items-center hover:bg-[#FF2D55] hover:text-white justify-center rounded-sm"
      >
        <MinusIcon className="size-4" />
      </button>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        className="w-10 h-7 text-sm text-black bg-transparent focus:outline-none focus:ring-0 text-center border border-zinc-400 rounded-sm"
      />
      <button
        onClick={increment}
        className="size-7 shrink-0 flex items-center hover:bg-[#FF2D55] hover:text-white justify-center rounded-sm"
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
}

function LineHeightButton() {
  const { editor } = useEditorStore();

  const LINE_HEIGHTS = [
    {
      label: "Default",
      value: "normal",
    },
    {
      label: "Single",
      value: "1",
    },
    {
      label: "1.15",
      value: "1.15",
    },
    {
      label: "1.5",
      value: "1.5",
    },
    {
      label: "Double",
      value: "2",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7 shrink-0 flex flex-col items-center hover:bg-[#FF2D55] hover:text-white justify-between rounded-sm  px-1.5 overflow-hidden text-sm",
          )}
        >
          <span>
            <RulerIcon className="size-4 mt-1.5" />
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {LINE_HEIGHTS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => editor?.chain().focus().setLineHeight(value).run()}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-zinc-200",
              editor?.getAttributes("paragraph").lineHeight === value &&
                "bg-zinc-200",
            )}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
