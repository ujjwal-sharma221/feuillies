"use client";

import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";

export function PageLoading() {
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-3xl lg:text-5xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Loading your Document
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-muted-foreground dark:text-neutral-400 text-center font-semibold">
        This may take time based on the length of the content or amount of users
        collaborating on a single document. Thanks for your patience
      </p>
    </BackgroundLines>
  );
}
