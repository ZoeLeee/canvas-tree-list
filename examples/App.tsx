import { useEffect } from "react";
import "./App.css";
import Konva from "konva";
import { List } from "./List";

function App() {
  useEffect(() => {
    const stage = new Konva.Stage({
      container: "konvajs", // id of container <div>
      width: 500,
      height: 500,
    });

    // then create layer
    const layer = new Konva.Layer();

    // create our shape
    const circle = new Konva.Circle({
      x: stage.width() / 2,
      y: stage.height() / 2,
      radius: 70,
      fill: "red",
      stroke: "black",
      strokeWidth: 4,
    });

    // add the shape to the layer
    layer.add(circle);

    // add the layer to the stage
    stage.add(layer);

    return () => {
      stage.destroy();
    };
  }, []);

  return (
    <div className="w-full h-full flex">
      <div id="konvajs" className="w-8/12 outline"></div>
      <div className="flex-1">
        <List />
      </div>
    </div>
  );
}

export default App;
