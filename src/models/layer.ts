import p5 from "p5";
import { Eraser, Pen, Rect, Tool, ToolType } from "@/models/tool";
import { PointsShape, RectShape, Shape } from "./shape";
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
      this.graphics.push();
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
      } else if (shape instanceof RectShape) {
        if (shape.options.fill.value) this.graphics.fill(shape.options.fillColor.value);
        else this.graphics.noFill();

        if (shape.options.stroke.value) this.graphics.stroke(shape.options.strokeColor.value);
        else this.graphics.noStroke();

        this.graphics.strokeWeight(shape.options.strokeWeight.value);

        this.graphics.rectMode(this.graphics.CORNERS);
        this.graphics.rect(shape.topLeft.x, shape.topLeft.y, shape.bottomRight.x, shape.bottomRight.y, shape.options.cornerRadius.value);
      }
      this.graphics.pop();
    }
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
    } else if (tool instanceof Rect) {
      if (this.currentShapeIdx == null) {
        this.currentShapeIdx = this.shapes.length;
        // set the bottom right as the same as top left for now
        this.shapes.push(new RectShape(mousePos, mousePos, tool.type, deepCopy(tool.options)));
      } else {
        if (this.currentShape instanceof RectShape) {
          // update the shape as person is dragging
          this.currentShape.bottomRight = mousePos;
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