import Layer from "@/models/layer";
import { Ellipse, Eraser, Pen, Rect, Tool, ToolType } from "@/models/tool";
import { Color } from "@/models/types";
import cloneDeep from "lodash/cloneDeep";

export type UndoItem = { layers: Layer[]; layerId: string };

interface Pos {
  x: number;
  y: number;
}

export default class GlobalState {
  /// Because making a layer needs a p5 instance, it will only be set
  /// in the setup method of the sketch
  layers: Layer[] = [];
  currentLayerId: string | null = null; // this needs to be null because we don't know the layer id until we create it, and creating it needs a p5 instance

  tools: Tool[] = [
    new Pen(),
    new Eraser(),
    new Rect(),
    new Ellipse(),
  ];
  currentToolIdx = 0;

  backgroundColor: Color = "black";

  currentPrefixedShortcutKey: string | null = null;

  hoveringCanvas = false;
  mousePos: Pos = { x: 0, y: 0 };


  private undoStack: UndoItem[] = [];
  private undoStackIdx = 0;


  get currentTool(): Tool {
    return this.tools[this.currentToolIdx];
  }

  setCurrentTool(toolType: ToolType) {
    this.currentToolIdx = this.tools.findIndex(e => e.type == toolType);
  }

  get currentLayer(): Layer {
    return this.layers.filter(v => v.id == this.currentLayerId)[0];
  }

  /// Should be called _after_ the actual state change has been made
  pushUndoState(): void {
    console.log("pushing new undo state...");
    console.log(`Undo stack length: ${this.undoStack.length}, Undo index: ${this.undoStackIdx}`);

    // If current undo idx is not at the top of the stack
    // delete everything above the pointer
    // because user is changing history and branching onto a new timeline

    if (this.undoStackIdx < this.undoStack.length - 1) {
      console.log("rewriting history...");
      this.undoStack = cloneDeep(this.undoStack).slice(0, this.undoStackIdx + 1);
      this.undoStackIdx = this.undoStack.length - 1;
    }

    console.log(`Undo stack length: ${this.undoStack.length}, Undo index: ${this.undoStackIdx}`);

    // Now the undo index should be at the top of the undo stack
    // We update the index and push the new state into the stack
    this.undoStackIdx = this.undoStack.length;
    this.undoStack.push(cloneDeep({
      layerId: this.currentLayerId ?? "",
      layers: this.layers,
    }));

    console.log(`Undo stack length: ${this.undoStack.length}, Undo index: ${this.undoStackIdx}`);
  }

  undo(): void {
    console.log(`Undo stack length: ${this.undoStack.length}, Undo index: ${this.undoStackIdx}`);

    if (this.undoStackIdx <= 0) return;
    if (this.undoStack.length <= 1) return;

    this.undoStackIdx--;
    this.updateStateBasedOnUndoStack();

    console.log(`Undo stack length: ${this.undoStack.length}, Undo index: ${this.undoStackIdx}`);
  }

  redo(): void {
    console.log("Redoing...");

    if (this.undoStack.length <= 1) return;
    if (this.undoStackIdx >= this.undoStack.length - 1) return;

    this.undoStackIdx++;
    this.updateStateBasedOnUndoStack();
  }

  private updateStateBasedOnUndoStack(): void {
    this.layers = cloneDeep(this.undoStack[this.undoStackIdx].layers);
    this.currentLayerId = cloneDeep(this.undoStack[this.undoStackIdx].layerId);
  }
}
