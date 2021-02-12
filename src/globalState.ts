import Layer from "./models/layer";
import { Tool, ToolType } from "@/models/tool";
import p5 from "p5";

export default class GlobalState {
  layers: Layer[];
  currentLayerIdx: number;

  tools: Tool[];
  currentToolIdx: number;

  // Stupidly need to put null because can't create color without p5 instance
  backgroundColor: p5.Color | null = null;

  currentPrefixedShortcutKey: string | null = null;

  /// Because some of the properties needs a p5 instance, they will only be set
  /// in the setup method of the sketch
  constructor() {
    this.layers = [];
    this.currentLayerIdx = 0;

    this.tools = [];
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
