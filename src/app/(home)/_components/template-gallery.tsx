"use client";

import { Carousel, CarouselContent } from "@/components/ui/carousel";

const TEMPLATES = [{ id: "blank", label: "Blank" }];

export function TemplateGallery() {
  return (
    <div className="">
      <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
        <h3 className="font-medium">Start a New Document</h3>
        <Carousel>
          <CarouselContent className="-ml-4"></CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
