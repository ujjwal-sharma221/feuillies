"use client";

import { Dot } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Disclosure,
  DisclosureContent,
  DisclosureTrigger,
} from "@/components/ui/disclosure";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="flex items-center justify-center h-screen flex-col gap-6">
      <Disclosure className="w-[330px] rounded-md border border-zinc-200 px-3 dark:border-zinc-700">
        <DisclosureTrigger>
          <button
            className="w-full py-2 text-left text-sm font-bold text-destructive"
            type="button"
          >
            Error, click for more information
          </button>
        </DisclosureTrigger>
        <DisclosureContent>
          <div className="overflow-hidden pb-3">
            <div className="pt-1 text-sm flex flex-col gap-5">
              <div>
                <p className="text-lg font-semibold">
                  This error may have occured becuase of either of these reasons
                </p>
              </div>
              <div>
                <p className="flex">
                  <Dot />
                  You may no longer be part of the organisations
                </p>
                <p className="flex">
                  {" "}
                  <Dot /> You may be not authorized to view this content
                </p>
                <p className="flex">
                  {" "}
                  <Dot className="size-10" /> Some malicious activity may have
                  been detected in your account
                </p>
              </div>
            </div>
          </div>
        </DisclosureContent>
      </Disclosure>

      <div className="flex items-center gap-x-3">
        <Button onClick={reset} className="px-6 font-medium">
          Try again
        </Button>
        <Button variant="ghost" asChild className=" font-medium">
          <Link href="/">Go back</Link>
        </Button>
      </div>
    </div>
  );
}
