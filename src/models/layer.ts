import p5 from "p5";
import { Eraser, Pen, Tool } from "@/models/tool";
import GlobalState from "@/globalState";
import { DEFAULT_BACKGROUND_COLOR } from "@/constants";

export default class Layer {
  graphics: p5.Graphics;
  name: string;
  width: number;
  height: number;

  #points: p5.Vector[];

  constructor(p: p5, name: string) {
    this.graphics = p.createGraphics(p.width, p.height);
    this.width = p.width;
    this.height = p.height;
    this.name = name;
    this.#points = [];
  }

  draw(state: GlobalState) {
    if (state.currentTool instanceof Pen || state.currentTool instanceof Eraser) {
      this.graphics.noFill();
      this.graphics.stroke(state.currentTool instanceof Pen
        ? state.currentTool.options.color
        : state.backgroundColor ?? DEFAULT_BACKGROUND_COLOR);
      this.graphics.strokeWeight(state.currentTool.options.size);
      this.graphics.beginShape();
      for (const point of this.#points) this.graphics.vertex(point.x, point.y);
      this.graphics.endShape();
    }
  }

  mouseDragged(mouseX: number, mouseY: number, tool: Tool) {
    if (tool instanceof Pen || tool instanceof Eraser) {
      this.#points.push(this.graphics.createVector(mouseX, mouseY));
    }
  }

  mouseReleased() {
    this.#points = [];
  }

  clear() {
    this.graphics.clear();
  }

}