import { CanvasTree } from "@lizhou/canvas-tree-list";
import { useEffect, useRef } from "react";


export function List() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    const tree = new CanvasTree(ref.current);

    return () => {
      tree.destory();
    };
  }, []);

  return <div ref={ref} className="w-full h-full" />;
}
