import { TextShimmer } from "@/components/ui/text-shimmer";

export default function Loading() {
  return (
    <div className="h-screen flex items-center justify-center">
      <TextShimmer className="font-mono text-sm" duration={1.2}>
        Building Document...
      </TextShimmer>
    </div>
  );
}
