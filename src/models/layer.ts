import p5 from "p5";
import { Eraser, Pen, Tool, ToolType } from "@/models/tool";
import { PointsShape, Shape, SprayShape } from "./shape";
import { DEFAULT_BACKGROUND_COLOR } from "@/constants";
import GlobalState from "@/globalState";
import deepCopy from "@/helpers/deepCopy";

export default class Layer {
  graphics: p5.Graphics;
  name: string;
  width: number;
  height: number;

  private shapes: Shape[];
  private currentShapeIdx: number | null;

  constructor(p: p5, name: string) {
    this.graphics = p.createGraphics(p.width, p.height);
    this.width = p.width;
    this.height = p.height;
    this.name = name;

    this.shapes = [];
    this.currentShapeIdx = null;
  }

  update(state: GlobalState) {
    this.graphics.clear();
    for (const shape of this.shapes) {
      if (shape instanceof PointsShape) {
        this.graphics.noFill();
        // The `"color" in shape.options` is just to satisfy typescript
        this.graphics.stroke(shape.tool == ToolType.Pen && "color" in shape.options
          ? shape.options.color.value
          : state.backgroundColor ?? DEFAULT_BACKGROUND_COLOR);
        this.graphics.beginShape();
        this.graphics.strokeWeight(shape.options.size.value);
        for (const pt of shape.points) {
          this.graphics.vertex(pt.x, pt.y);
        }
        this.graphics.endShape();
      } else if (shape instanceof SprayShape) {
        // TODO: Implement this
        throw "Not Implemented";
      }
    }

    // if (state.currentTool instanceof Pen || state.currentTool instanceof Eraser) {
    //   this.graphics.noFill();
    //   this.graphics.stroke(state.currentTool instanceof Pen
    //     ? state.currentTool.options.color.value
    //     : state.backgroundColor ?? DEFAULT_BACKGROUND_COLOR);
    //   this.graphics.strokeWeight(state.currentTool.options.size.value);
    //   this.graphics.beginShape();
    //   for (const point of this.#points) this.graphics.vertex(point.x, point.y);
    //   this.graphics.endShape();
    // }
  }

  mouseDragged(p: p5, tool: Tool) {
    const mousePos = p.createVector(p.mouseX, p.mouseY);
    if (tool instanceof Pen || tool instanceof Eraser) {
      if (this.currentShapeIdx == null) {
        this.currentShapeIdx = this.shapes.length;
        this.shapes.push(new PointsShape([mousePos], tool.type, deepCopy(tool.options)));
      } else {
        if (this.currentShape instanceof PointsShape) {
          this.currentShape.points.push(mousePos);
        }
      }
    }
  }

  mouseReleased() {
    this.currentShapeIdx = null;
  }

  clear() {
    this.shapes = [];
    this.currentShapeIdx = null;
  }


  private get currentShape(): Shape | null {
    return this.currentShapeIdx == null ? null : this.shapes[this.currentShapeIdx];
  }
}