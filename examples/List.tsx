import { CanvasTree } from "@lizhou/canvas-tree-list";
import { useEffect, useRef } from "react";

type Props = {};

export function List({}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const tree = new CanvasTree(ref.current);

    return () => {
      tree.destory();
    };
  }, []);

  return <div ref={ref} className="w-full h-full"></div>;
}
