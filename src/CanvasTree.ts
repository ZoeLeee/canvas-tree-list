import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";
import { Rect } from "konva/lib/shapes/Rect";

/**
 * 使用画布绘制列表
 */
export class CanvasTree {
  private _stage: Stage;
  constructor(private container: HTMLElement, private _data = []) {
    this._stage = new Stage({
      container: container as HTMLDivElement,
      width: container.clientWidth,
      height: container.clientHeight,
    });

    const layer = new Layer();

    layer.add(new Rect({ fill: "red", width: 100, height: 100 }));

    this._stage.add(layer);
  }
}
