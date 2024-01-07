import { CanvasTree } from "@lizhou/canvas-tree-list";
import { useEffect, useRef } from "react";

type Props = {};

export function List({}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    new CanvasTree(ref.current);
  }, []);

  return <div ref={ref} className="w-full h-full"></div>;
}
