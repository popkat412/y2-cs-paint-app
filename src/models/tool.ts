import { Color } from "@/models/types";

/// Kind of a hack so we can easily get the type of the tool class
/// Why do i feel like everything i do is a hack
export enum ToolType { Pen, Eraser, Spray }
export enum OptionType { Number, Color }

export abstract class Tool {
  abstract readonly type: ToolType;
  abstract name: string;
  abstract options: {};
}

export interface ToolOption<T> {
  value: T;
  type: OptionType;
}

interface PenOptions {
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
      size: { type: OptionType.Number, value: size ?? 3 },
      color: { type: OptionType.Color, value: color ?? "white" },
    };
  }
}

interface EraserOptions {
  size: ToolOption<number>;
}
export class Eraser extends Tool {
  readonly type = ToolType.Eraser;
  readonly name = "Eraser";
  options: EraserOptions;

  constructor(size?: number) {
    super();
    this.options = { size: { type: OptionType.Number, value: size ?? 10 } };
  }
}

interface SprayOptions {
  size: ToolOption<number>;
  color: ToolOption<Color>;
}
export class Spray extends Tool {
  readonly type = ToolType.Spray;
  readonly name = "Spray";
  options: SprayOptions;

  constructor(size?: number, color?: Color) {
    super();
    this.options = {
      size: { type: OptionType.Number, value: size ?? 3 },
      color: { type: OptionType.Color, value: color ?? "white" },
    }
  }
}
