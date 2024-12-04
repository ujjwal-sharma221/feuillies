"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Bold,
  Code2,
  FileJson2,
  FilePenLineIcon,
  FilePlus2,
  FileText,
  FileUpIcon,
  FileX2,
  Italic,
  LetterText,
  Printer,
  Redo2,
  RemoveFormatting,
  Strikethrough,
  Text,
  Underline,
  Undo2,
} from "lucide-react";

import logo from "@/assets/logo.svg";
import { DocumentInput } from "./document-input";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Link href="/">
          <Image src={logo} alt="logo" width={36} height={36} />
        </Link>
        <div className="flex flex-col">
          <DocumentInput />
          <div className="flex">
            <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
              <MenubarMenu>
                <MenubarTrigger className="hover:bg-zinc-200 text-sm font-normal py-0.5 px-[7px] rounded-sm h-auto">
                  File
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileUpIcon className="size-4 mr-2" />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>
                        <FileJson2 className="size-4 mr-2" />
                        JSON
                      </MenubarItem>
                      <MenubarItem>
                        <Code2 className="size-4 mr-2" />
                        HTML
                      </MenubarItem>
                      <MenubarItem>
                        <FileText className="size-4 mr-2" />
                        PDF
                      </MenubarItem>
                      <MenubarItem>
                        <LetterText className="size-4 mr-2" />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem>
                    <FilePlus2 className="size-4 mr-2 " />
                    New Document
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <FilePenLineIcon className="size-4 mr-2 " />
                    Rename
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <FileX2 className="size-4 mr-2 " />
                    Remove
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onClick={() => window.print()}>
                    <Printer className="size-4 mr-2 " />
                    Print <MenubarShortcut>(CMD/CTRL)+P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="hover:bg-zinc-200 text-sm font-normal py-0.5 px-[7px] rounded-sm h-auto">
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    <Undo2 className="size-4 mr-2" /> Undo
                    <MenubarShortcut className="">(CMD/CTRL)+Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    <Redo2 className="size-4 mr-2" /> Redo
                    <MenubarShortcut className="">(CMD/CTRL)+Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="hover:bg-zinc-200 text-sm font-normal py-0.5 px-[7px] rounded-sm h-auto">
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>Table</MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>1 x 1</MenubarItem>
                      <MenubarItem>2 x 2</MenubarItem>
                      <MenubarItem>3 x 3</MenubarItem>
                      <MenubarItem>4 x 4</MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="hover:bg-zinc-200 text-sm font-normal py-0.5 px-[7px] rounded-sm h-auto">
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <Text className="size-4 mr-2" />
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>
                        <Bold className="size-4 mr-2" />
                        Bold
                        <MenubarShortcut>(CMD/CTRL)+B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>
                        <Italic className="size-4 mr-2" />
                        Italic
                        <MenubarShortcut>(CMD/CTRL)+I</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>
                        <Underline className="size-4 mr-2" />
                        Underline&nbsp;
                        <MenubarShortcut>(CMD/CTRL)+U</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>
                        <Strikethrough className="size-4 mr-2" />
                        Strike Through{" "}
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem>
                    <RemoveFormatting className="size-4 mr-2 " />
                    Clear Formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
    </nav>
  );
}
