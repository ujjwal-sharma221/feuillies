"use client";

import { SearchIcon, X } from "lucide-react";
import React, { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSearchParam } from "@/hooks/use-search-params";

export function SearchInput() {
  const [search, setSearch] = useSearchParam("search");
  const [value, setValue] = useState(search);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    setSearch("");
    inputRef.current?.blur();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value);
    inputRef.current?.blur();
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <form className="relative max-w-[720px] w-full" onSubmit={handleSubmit}>
        <Input
          value={value}
          onChange={handleChange}
          ref={inputRef}
          placeholder="search..."
          className="md:text-base placeholder:text-zinc-900 px-14 w-full border-t-0 shadow-none border-zinc-900 focus-visible:ring-0 border-r-0 border-l-0 rounded-none"
        />
        <Button
          className="rounded-full absolute left-0 top-1/2 hover:bg-neutral-50 -translate-y-1/2 [&_svg]:size-5"
          variant="ghost"
          size="icon"
          aria-label="search"
        >
          <SearchIcon strokeWidth={1.5} aria-hidden="true" />
        </Button>
        {value && (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="absolute hover:bg-neutral-50 right-0 rounded-full top-1/2 -translate-y-1/2 [&_svg]:size-5"
                  variant="ghost"
                  size="icon"
                  aria-label="Add new item"
                  onClick={handleClear}
                >
                  <X strokeWidth={1.5} aria-hidden="true" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="px-2 py-1 bg-zinc-600 text-xs">
                Clear Input
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </form>
    </div>
  );
}
