import Layer from "@/models/layer";
import { Eraser, Pen, Rect, Tool, ToolType } from "@/models/tool";
import { Color } from "@/models/types";

export default class GlobalState {
  layers: Layer[];
  currentLayerId: string | null = null; // this needs to be null because we don't know the layer id until we create it, and creating it needs a p5 instance

  tools: Tool[];
  currentToolIdx: number;

  backgroundColor: Color = "black";

  currentPrefixedShortcutKey: string | null = null;

  constructor() {
    /// Because making a layer needs a p5 instance, it will only be set
    /// in the setup method of the sketch
    this.layers = [];

    this.tools = [
      new Pen(),
      new Eraser(),
      new Rect(),
    ];
    this.currentToolIdx = 0;
  }

  get currentTool(): Tool {
    return this.tools[this.currentToolIdx];
  }

  setCurrentTool(toolType: ToolType) {
    this.currentToolIdx = this.tools.findIndex(e => e.type == toolType);
  }

  get currentLayer(): Layer {
    return this.layers.filter(v => v.id == this.currentLayerId)[0];
  }
}
