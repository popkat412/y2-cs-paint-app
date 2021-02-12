import Layer from "@/models/layer";
import { Eraser, Pen, Spray, Tool, ToolType } from "@/models/tool";
import { Color } from "@/models/types";

export default class GlobalState {
  layers: Layer[];
  currentLayerIdx: number;

  tools: Tool[];
  currentToolIdx: number;

  backgroundColor: Color = "black";

  currentPrefixedShortcutKey: string | null = null;

  constructor() {
    /// Because making a layer needs a p5 instance, it will only be set
    /// in the setup method of the sketch
    this.layers = [];
    this.currentLayerIdx = 0;

    this.tools = [
      new Pen(),
      new Eraser(),
      new Spray(),
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
    return this.layers[this.currentLayerIdx];
  }
}
