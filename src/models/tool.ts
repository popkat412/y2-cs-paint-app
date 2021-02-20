import { Color } from "@/models/types";

/// Kind of a hack so we can easily get the type of the tool class
/// Why do i feel like everything i do is a hack
export enum ToolType { Pen = "Pen", Eraser = "Eraser", Rect = "Rect", Ellipse = "Ellipse" }
export type OptionType = "number" | "color" | "boolean";

export abstract class Tool {
  abstract readonly type: ToolType;
  abstract name: string;
  abstract options: {};
}

export interface ToolOption<T> {
  value: T;
  type: OptionType;
}

export interface PenOptions {
  size: ToolOption<number>;
  color: ToolOption<Color>;
}
export class Pen extends Tool {
  readonly type = ToolType.Pen;
  readonly name = "Pen";
  options: PenOptions;

  constructor(size?: number, color?: Color) {
    super();
    this.options = {
      size: { type: "number", value: size ?? 3 },
      color: { type: "color", value: color ?? "white" },
    };
  }
}

export interface EraserOptions {
  size: ToolOption<number>;
}
export class Eraser extends Tool {
  readonly type = ToolType.Eraser;
  readonly name = "Eraser";
  options: EraserOptions;

  constructor(size?: number) {
    super();
    this.options = { size: { type: "number", value: size ?? 10 } };
  }
}

export interface ShapeToolOptions {
  stroke: ToolOption<boolean>; // controls whether to draw stroke
  strokeWeight: ToolOption<number>;
  strokeColor: ToolOption<Color>;
  fill: ToolOption<boolean>; // controls whether to draw fill
  fillColor: ToolOption<Color>;
}

export interface RectOptions extends ShapeToolOptions {
  cornerRadius: ToolOption<number>;
}
export class Rect extends Tool {
  readonly type = ToolType.Rect;
  readonly name = "Rect";
  options: RectOptions;

  constructor(stroke?: boolean, strokeWeight?: number, strokeColor?: Color, fill?: boolean, fillColor?: Color, cornerRadius?: number) {
    super();
    this.options = {
      stroke: { type: "boolean", value: stroke ?? true },
      strokeWeight: { type: "number", value: strokeWeight ?? 3 },
      strokeColor: { type: "color", value: strokeColor ?? "white" },
      fill: { type: "boolean", value: fill ?? false },
      fillColor: { type: "color", value: fillColor ?? "white" },
      cornerRadius: { type: "number", value: cornerRadius ?? 0 },
    };
  }
}

export class Ellipse extends Tool {
  readonly type = ToolType.Ellipse;
  readonly name = "Ellipse";
  options: ShapeToolOptions;


  constructor(stroke?: boolean, strokeWeight?: number, strokeColor?: Color, fill?: boolean, fillColor?: Color) {
    super();
    this.options = {
      stroke: { type: "boolean", value: stroke ?? true },
      strokeWeight: { type: "number", value: strokeWeight ?? 3 },
      strokeColor: { type: "color", value: strokeColor ?? "white" },
      fill: { type: "boolean", value: fill ?? false },
      fillColor: { type: "color", value: fillColor ?? "white" },
    };
  }
}