import { Group } from "konva/lib/Group";
import { Layer } from "konva/lib/Layer";
import { Shape } from "konva/lib/Shape";
import { Stage } from "konva/lib/Stage";
import { Line } from "konva/lib/shapes/Line";
import { Path } from "konva/lib/shapes/Path";
import { Rect } from "konva/lib/shapes/Rect";
import { Text } from "konva/lib/shapes/Text";
import { Vector2d } from "konva/lib/types";

import { Mock_Data } from "./_mock";
import { TreeItemOption } from "./types";
import { clamp } from "./utils";

const itemHeight = 30;
const SPACING = 10;
const SCROLL_BAR_WIDTH = 10;
export const ROOT_ID = 0;
export const UN_NAMED = "未命名";
const SCROLL_BAR_NAME = "SCROLL_BAR";
const ICON_DEFAULT_SIZE = 20

/**
 * 使用画布绘制列表
 */
export class CanvasTree {
	private _stage: Stage;
	private _layer: Layer;
	private scrollBar: Rect;
	private totalHeight = 30;
	private _renderIndex = 0;
	constructor(container: HTMLElement, private _data: TreeItemOption[] = []) {
		this._stage = new Stage({
			container: container as HTMLDivElement,
			width: container.clientWidth,
			height: container.clientHeight,
		});

		this._data = Mock_Data;

		const layer = new Layer();
		this._layer = layer;

		this._stage.add(layer);

		const rect = new Rect({
			name: SCROLL_BAR_NAME,
			height: 100,
			width: SCROLL_BAR_WIDTH,
			cornerRadius: 5,
			fill: "#ccc",
			ID: SCROLL_BAR_NAME,
			x: this._stage.width() - SCROLL_BAR_WIDTH,
			hitStrokeWidth: 10,
			y: 0,
			draggable: true,
			dragBoundFunc: (pos) => {
				return {
					x: this.scrollBar.x(),
					y: clamp(pos.y, 0, this.Height - this.scrollBar.height()),
				};
			},
		});

		layer.add(rect);

		this.scrollBar = rect;

		this.render();

		this.register();
	}
	get Width() {
		return this._stage.width();
	}
	get Height() {
		return this._stage.height();
	}
	render() {
		this._layer.destroyChildren()
		this.totalHeight = 0
		this._renderIndex = 0
		for (const element of this._data) {
			this.renderNodeItem(element, 0);
		}
		this.totalHeight = this._renderIndex * itemHeight;

		this.drawScrollbar();
	}
	renderNodeItem(item: TreeItemOption, depth: number) {
		const x = depth * SPACING;
		const y = this._renderIndex * itemHeight;

		const position: Vector2d = {
			x, y
		}

		position.x += SPACING

		const group = new Group({
			x: 0,
			y: position.y,
			ORIGIN_DATA: item,
			name: "ITEM_ROOT"
		});

		const background = new Rect({
			name: "Backgroud",
			width: this.Width,
			height: itemHeight,
			stroke: "black",
			strokeWidth: 1,
		});
		group.add(background);

		// render group arrow

		// render icon
		this._renderIcon(item, group, position);

		// render text
		const text = new Text({
			text: item.label,
			x: position.x,
			height: itemHeight,
			verticalAlign: "middle",
		});
		group.add(text);

		this._layer.add(group);

		this._renderIndex++;
		if (item.children && (item.expanded !== false)) {
			for (const element of item.children) {
				this.renderNodeItem(element, depth + 1);
			}
		}
	}
	drawScrollbar() {
		if (this.totalHeight > this.Height) {
			const height = (this.Height / this.totalHeight) * this.Height;
			this.scrollBar.height(Math.max(height, 30));
			this.scrollBar.visible(true);
			this.scrollBar.moveToTop();
		} else {
			this.scrollBar.visible(false);
		}
	}
	updateScrollBar(y: number) {
		if (this.totalHeight <= this.Height) return;
		const scale = Math.abs(y) / this.totalHeight;

		const dist = scale * this.Height;
		this.scrollBar.y(-y + dist);
	}
	scrollY2StageY() {
		const y = this.scrollBar.y();
		const stageY = Math.abs(this._stage.y());
		const dist = y - stageY;
		const scale = dist / this.Height;
		this._stage.y(-this.totalHeight * scale);
		this.updateScrollBar(-this.totalHeight * scale);
	}
	destory() {
		this._stage.destroy();
	}
	private register() {
		this._stage.on("wheel", (e) => {
			if (this.totalHeight <= this.Height) return;

			e.evt.preventDefault();

			const direction = -Math.sign(e.evt.deltaY);

			if (direction < 0 && -this._stage.y() + this.Height >= this.totalHeight) {
				return;
			}

			if (direction > 0 && this._stage.y() >= 0) {
				return;
			}

			let y = this._stage.y();
			y += direction * (itemHeight + 1) * (Math.abs(e.evt.deltaY) / 100);

			if (direction < 0 && -y + this.Height >= this.totalHeight) {
				y = this.Height - this.totalHeight;
			}

			if (direction > 0 && y >= 0) {
				y = 0;
			}

			this._stage.y(y);

			this.updateScrollBar(y);
		});

		this._stage.on("click", (evt) => {
			console.log('evt: ', evt);
			if (evt.evt.button !== 0) return;
			if (evt.target.attrs.ID === SCROLL_BAR_NAME) {
				//点在滚动条上
			} else {

				const root = this.getRootByNode(evt.target as Shape);
				//折叠
				console.log('evt.target.name(): ', evt.target.name());
				if (evt.target.name() === "FOLDER_ICON") {
					this.collapse(root?.getAttr("ORIGIN_DATA"));
					return
				}

				console.log('root: ', root);
				if (root) {
				}
			}
		});

		// 拖拽行为
		let line: Line | null;

		this._stage.on("dragstart", (evt) => {
			if (evt.target.name() === SCROLL_BAR_NAME) {
				return;
			}

			if (evt.target instanceof Group) {
			}
		});

		this._stage.on("dragmove", (evt) => {
			//模拟滚动条效果
			if (evt.target.name() === SCROLL_BAR_NAME) {
				this.scrollY2StageY();
				return;
			}
		});

		this._stage.on("dragend", (evt) => {
			if (!line) return;
			if (evt.target instanceof Group) {
				evt.target.destroy();
			}
			line.destroy();
			line = null;
		});
	}
	private getRootByNode(node: Shape) {
		let item = node as Shape | Group;
		while (item.parent) {
			item = item.parent as Group;
			if (item.name() === "ITEM_ROOT") {
				return item;
			}
		}
		return null;
	}
	private _renderIcon(item: TreeItemOption, parent: Group, position: Vector2d) {
		if (item.children?.length) {

			const down = "M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"
			const right = "M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"

			const arrow = new Path({
				data: item.expanded ? down : right,
				x: position.x,
				y: 2.5,
				stroke: "#ccc",
				strokeWidth: 1,
				width: ICON_DEFAULT_SIZE,
				height: ICON_DEFAULT_SIZE,
				fill: "#ffe3c7",
				name: "FOLDER_ICON",
				hitStrokeWidth: 10
			})
			position.x += (SPACING * 2)

			const foldIcon2 = new Path({
				data: "M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8z",
				x: position.x,
				y: 2.5,
				stroke: "#ccc",
				strokeWidth: 1,
				width: ICON_DEFAULT_SIZE,
				height: ICON_DEFAULT_SIZE,
				fill: "#ffe3c7",
				name: "FOLDER_ICON",
				hitStrokeWidth: 10
			})
			// this._layer.add(foldIcon)
			parent.add(foldIcon2)
			parent.add(arrow)

			position.x += (SPACING * 3)

		} else {
			const icon = new Rect({
				x: position.x,
				y: 5,
				width: ICON_DEFAULT_SIZE,
				height: ICON_DEFAULT_SIZE,
				stroke: "#ccc",
				strokeWidth: 1,
				fill: "#44e3c7",
			})

			parent.add(icon)

			position.x += (SPACING * 3)

		}
	}
	private collapse(item: TreeItemOption) {
		if (item.expanded === undefined) {
			item.expanded = true
		}
		item.expanded = !item.expanded;
		this.render()
	}

}
