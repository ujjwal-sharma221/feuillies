import { TriangleDownIcon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";

const MARKERS = Array.from({ length: 83 }, (_, i) => i);

export function Ruler() {
  const [leftMargin, setLeftMargin] = useState(56);
  const [rightMargin, setRightMargin] = useState(56);

  const [isDraggingLeft, setIsDraggingLeft] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);

  const ruleRef = useRef<HTMLDivElement>(null);

  const handleLeftMouseDown = () => {
    setIsDraggingLeft(true);
  };

  const handleRightMouseDown = () => {
    setIsDraggingRight(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDraggingLeft || isDraggingRight || ruleRef.current) {
      const container = ruleRef.current?.querySelector("#rule-container");
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const relativeX = e.clientX - containerRect.left;
        const rawPos = Math.max(0, Math.min(816, relativeX));

        if (isDraggingLeft) {
          const maxLeftPos = 816 - rightMargin - 100;
          const newLeftPos = Math.min(rawPos, maxLeftPos);
          setLeftMargin(newLeftPos);
        } else if (isDraggingRight) {
          const maxRightPos = 816 - (leftMargin + 100);
          const newRightPos = Math.max(816 - rawPos, 0);
          const constrainedRightPos = Math.min(newRightPos, maxRightPos);
          setRightMargin(constrainedRightPos);
        }
      }
    }
  };

  const handleMouseUp = () => {
    setIsDraggingLeft(false);
    setIsDraggingRight(false);
  };

  const handleLeftDoubleClick = () => {
    setLeftMargin(56);
  };

  const handleRightDoubleClick = () => {
    setRightMargin(56);
  };

  return (
    <div
      ref={ruleRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="h-6 border-b border-zinc-400 flex items-end relative select-none print:hidden"
    >
      <div
        id="rule-container"
        className="max-w-[816px] mx-auto size-full relative"
      >
        <Marker
          position={leftMargin}
          isLeft={true}
          isDragging={isDraggingLeft}
          onMouseDown={handleLeftMouseDown}
          onDoubleClick={handleLeftDoubleClick}
        />
        <Marker
          position={rightMargin}
          isLeft={false}
          isDragging={isDraggingRight}
          onMouseDown={handleRightMouseDown}
          onDoubleClick={handleRightDoubleClick}
        />
        <div className="absolute inset-x-0 bottom-0 h-full">
          <div className="relative h-full w-[816px]">
            {MARKERS.map((marker) => {
              const pos = (marker * 816) / 82;
              return (
                <div
                  key={marker}
                  className="absolute bottom-0"
                  style={{ left: `${pos}px` }}
                >
                  {marker % 10 === 0 && (
                    <>
                      <div className="absolute bottom-0 w-[1px] h-2 bg-zinc-800" />
                      <span className="absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2">
                        {marker / 10 + 1}
                      </span>
                    </>
                  )}
                  {marker % 5 === 0 && marker % 10 !== 0 && (
                    <div className="absolute bottom-0 w-[1px] h-1.5 bg-zinc-800" />
                  )}
                  {marker % 5 !== 0 && (
                    <div className="absolute bottom-0 w-[1px] h-1.5 bg-zinc-800" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

interface MarkerProps {
  position: number;
  isLeft: boolean;
  isDragging: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

function Marker({
  position,
  isLeft,
  isDragging,
  onDoubleClick,
  onMouseDown,
}: MarkerProps) {
  return (
    <div
      className={`absolute top-0 w-4 h-full cursor-ew-resize z-[5] group -ml-2`}
      style={{ [isLeft ? "left" : "right"]: `${position}px` }}
      onMouseDown={onMouseDown}
      onDoubleClick={onDoubleClick}
    >
      <TriangleDownIcon className="absolute size-6 left-1/2 top-0 text-purple-500 transform -translate-x-1/2" />
    </div>
  );
}
