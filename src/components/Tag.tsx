import { stringToColor } from "@/lib/formatting";
import React from "react";

interface TagProps {
  children: React.ReactNode;
  onClick: () => void;
  clickable?: boolean;
  className?: string;
  filled?: boolean;
}

const Tag: React.FC<TagProps> = ({
  children,
  clickable,
  onClick,
  filled,
  className,
}) => {
  const color = stringToColor(children as string);

  return (
    <div
      className={`rounded-2xl border-2 border-opacity-100 bg-opacity-50 inline-block text-xs px-2 py-1 ${className}`}
      style={{
        backgroundColor: filled || filled === undefined ? color : "#FFFFFF",
        borderColor: color,
        cursor: clickable ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      <span style={{ pointerEvents: "none" }}>{children}</span>
    </div>
  );
};

export default Tag;
