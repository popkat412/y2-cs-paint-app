import p5 from "p5";

/// Kind of a hack so we can easily get the type of the tool class
export enum ToolType { Pen, Eraser, Spray }


export abstract class Tool {
  abstract type: ToolType;
  abstract name: string;
  abstract options: {};
}

interface PenOptions {
  size: number;
  color: p5.Color;
}
export class Pen extends Tool {
  type = ToolType.Pen;
  name = "Pen";
  options: PenOptions;

  constructor(p: p5, size?: number, color?: p5.Color) {
    super();
    this.options = {
      size: size ?? 3,
      color: color ?? p.color(255),
    };
  }
}

interface EraserOptions {
  size: number;
}
export class Eraser extends Tool {
  type = ToolType.Eraser;
  name = "Eraser";
  options: EraserOptions;

  constructor(size?: number) {
    super();
    this.options = { size: size ?? 10, };
  }
}

interface SprayOptions {
  size: number;
  color: p5.Color;
}
export class Spray extends Tool {
  type = ToolType.Spray;
  name = "Spray";
  options: SprayOptions;

  constructor(p: p5, size?: number, color?: p5.Color) {
    super();
    this.options = {
      size: size ?? 3,
      color: color ?? p.color(255),
    }
  }
}
