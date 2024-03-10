import Konva from "konva";
import { Arc } from "konva/lib/shapes/Arc";
import { Circle } from "konva/lib/shapes/Circle";
import { Ellipse } from "konva/lib/shapes/Ellipse";
import { Rect } from "konva/lib/shapes/Rect";
import { useEffect, useRef } from "react";
import "./App.css";
import { List } from "./List";

//获取min~max之间的随机整数
function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function App() {
  const containerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!containerRef.current) return;
    const stage = new Konva.Stage({
      container: containerRef.current, // id of container <div>
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
    });

    const count = random(100, 200);

    // then create layer
    const layer = new Konva.Layer();

    const CLASSES = [Rect, Circle, Arc, Ellipse];
    const Colors = ["red", "blue", "green", "yellow", "purple", ""];

    for (let i = 0; i < count; i++) {
      const CLASS = CLASSES[random(0, CLASSES.length - 1)];
      const color = Colors[random(0, Colors.length - 1)];
      const color2 = Colors[random(0, Colors.length - 1)];

      const circle = new CLASS({
        x: random(0, stage.width()),
        y: random(0, stage.height()),
        radius: random(1, 10),
        angle: random(0, 360),
        rotation: random(0, 360),
        radiusX: random(1, 50),
        radiusY: random(1, 50),
        innerRadius: random(1, 30),
        outerRadius: random(30, 50),
        fill: color,
        stroke: color2,
        strokeWidth: random(1, 10),
      });
      layer.add(circle);
    }

    // add the layer to the stage
    stage.add(layer);

    return () => {
      stage.destroy();
    };
  }, []);

  return (
    <div className="w-full h-full flex">
      <div id="konvajs" className="w-8/12 outline" ref={containerRef as any} />
      <div className="flex-1">
        <List />
      </div>
    </div>
  );
}

export default App;
