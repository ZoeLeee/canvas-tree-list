import { Layer } from "konva/lib/Layer";
import { Stage } from "konva/lib/Stage";
import { Rect } from "konva/lib/shapes/Rect";
import { Mock_Data } from "./_mock";
import { TreeItemOption } from "./types";
import { Group } from "konva/lib/Group";
import { Text } from "konva/lib/shapes/Text";
/**
 * 使用画布绘制列表
 */
export class CanvasTree {
  private _stage: Stage;
  private _layer: Layer;
  private _renderIndex = 0;
  constructor(
    private container: HTMLElement,
    private _data: TreeItemOption[] = []
  ) {
    this._stage = new Stage({
      container: container as HTMLDivElement,
      width: container.clientWidth,
      height: container.clientHeight,
    });

    const layer = new Layer();
    this._layer = layer;

    this._stage.add(layer);

    this.render();
  }
  get Width() {
    return this._stage.width();
  }
  get Height() {
    return this._stage.height();
  }
  render() {
    this._data = Mock_Data;
    for (const element of this._data) {
      this.renderNodeItem(element, 0);
    }
  }
  renderNodeItem(item: TreeItemOption, depth: number) {
    let x = depth * 30;
    let y = this._renderIndex * 30;
    const group = new Group({
      x,
      y,
    });

    const background = new Rect({
      name: "Backgroud",
      width: this.Width,
      height: 30,
      stroke: "black",
      strokeWidth: 1,
    });
    group.add(background);

    const text = new Text({
      text: item.label,
      x: 30,
      height: 30,
      verticalAlign: "middle",
    });
    group.add(text);

    this._layer.add(group);

    this._renderIndex++;

    if (item.children) {
      for (const element of item.children) {
        this.renderNodeItem(element, depth + 1);
      }
    }
  }
  destory() {
    this._stage.destroy();
  }
}
