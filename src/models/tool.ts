import p5 from "p5";

/// Kind of a hack so we can easily get the type of the tool class
export enum ToolType { Pen, Eraser, Spray }


export abstract class Tool {
  abstract type: ToolType;
  abstract name: string;
}

export class Pen extends Tool {
  size: number;
  color: p5.Color;

  type = ToolType.Pen;
  name = "Pen";

  constructor(p: p5, size?: number, color?: p5.Color) {
    super();
    this.size = size ?? 3;
    this.color = color ?? p.color(255);
  }
}

export class Eraser extends Tool {
  size: number;

  type = ToolType.Eraser;
  name = "Eraser";

  constructor(size?: number) {
    super();
    this.size = size ?? 10;
  }
}

export class Spray extends Tool {
  size: number;
  color: p5.Color;

  type = ToolType.Spray;
  name = "Spray";

  constructor(p: p5, size?: number, color?: p5.Color) {
    super();
    this.size = size ?? 3;
    this.color = color ?? p.color(0);
  }
}
