import { Cloud } from "lucide-react";
import { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { toast } from "sonner";

import { Id } from "../../../../../convex/_generated/dataModel";
import { api } from "../../../../../convex/_generated/api";
import { useDebouncedCallback } from "@/hooks/use-debounce";

interface DocumentInputProps {
  title: string;
  id: Id<"documents">;
}

export function DocumentInput({ title, id }: DocumentInputProps) {
  const [value, setValue] = useState(title);
  const [error, setError] = useState(false);
  const [pending, setPending] = useState(false);
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const mutate = useMutation(api.documents.updateById);

  const debouncedValue = useDebouncedCallback((newValue: string) => {
    if (newValue === title) return;
    setPending(true);
    mutate({ id, title: newValue })
      .then(() => toast.success("Document Updated"))
      .catch(() =>
        toast.error("Error while updating title, something went wrong"),
      )
      .finally(() => setPending(false));
  }, 500);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedValue(newValue);
  };

  const hanldeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    mutate({ id, title: value })
      .then(() => {
        toast.success("Document title updated");
        setEditing(false);
      })
      .catch(() => toast.error("Something went wrong while updating title"))
      .finally(() => setPending(false));
  };

  return (
    <div className="flex items-center gap-2">
      {editing ? (
        <form onSubmit={hanldeSubmit} className="relative w-fit max-w-[50ch]">
          <span className="invisible whitespace-pre px-1.5 text-lg">
            {value || "empty"}
          </span>
          <input
            ref={inputRef}
            value={value}
            onChange={onChange}
            onBlur={() => setEditing(false)}
            className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate"
          />
        </form>
      ) : (
        <span
          onClick={() => {
            setEditing(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }}
          className="text-lg px-1.5 cursor-pointer truncate"
        >
          {title}
        </span>
      )}
      <Cloud />
    </div>
  );
}
