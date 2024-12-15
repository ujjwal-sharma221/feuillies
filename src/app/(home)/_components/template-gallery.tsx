"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { useState } from "react";
import { toast } from "sonner";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { TEMPLATES } from "@/constants/templates";
import { cn } from "@/lib/utils";
import { api } from "../../../../convex/_generated/api";

export function TemplateGallery() {
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const [isCreating, setIsCreating] = useState(false);

  const onTemplateClick = (title: string, intialContent: string) => {
    setIsCreating(true);
    create({ title, intialContent })
      .then((documentId) => {
        toast.success("Document created successfully");
        router.push(`/documents/${documentId}`);
      })
      .catch(() => toast.error("Error while creating a documnet"))
      .finally(() => setIsCreating(false));
  };

  return (
    <div className="">
      <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
        <h3 className="font-medium">Start a New Document</h3>
        <Carousel>
          <CarouselContent className="-ml-4">
            {TEMPLATES.map((template) => (
              <CarouselItem
                key={template.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.244%] pl-4"
              >
                <div
                  className={cn(
                    "aspect-[3/4] flex flex-col gap-y-2.5",
                    isCreating && "pointer-events-none opacity-50",
                  )}
                >
                  <button
                    disabled={isCreating}
                    className="size-full hover:border-purple-500 rounded-sm border transition flex flex-col items-center justify-center gap-y-4"
                    style={{
                      backgroundImage: `url(${template.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    onClick={() =>
                      onTemplateClick(template.label, template.content)
                    }
                  ></button>
                  <p className="text-sm font-medium truncate">
                    {template.label}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
