<template>
  <div
    id="canvas"
    @mouseover="$emit('mouseover')"
    @mouseleave="$emit('mouseleave')"
  ></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import p5 from "p5";
import Layer from "@/models/layer";
import { ToolOption, ToolType } from "@/models/tool";
import EVENTS from "@/models/events";
import hasOwnProperty from "@/helpers/hasOwnProperty";
import { Color } from "@/models/types";

@Component
export default class Canvas extends Vue {
  mounted() {
    const sketch = (p: p5) => {
      let canvas: p5.Renderer | null;

      this.$root.$on(EVENTS.createLayer, () => {
        this.$store.layers.push(
          new Layer(p, `Layer ${this.$store.layers.length + 1}`)
        );
        this.$store.currentLayerIdx = this.$store.layers.length - 1;
      });

      this.$root.$on(EVENTS.saveCanvas, () => {
        if (canvas == null) {
          alert("Sorry, the canvas hasn't loaded yet");
        } else {
          const format = prompt("File format (png|jpg)", "png")?.toLowerCase();
          if (format != "png" && format != "jpg") {
            alert("Invalid format, can only be 'png' or 'jpg'");
          } else {
            p.save(canvas, `sketch.${format}`);
          }
        }
      });

      p.setup = () => {
        canvas = p.createCanvas(window.innerWidth * 0.5, window.innerHeight);
        this.$store.layers = [new Layer(p, "Layer 1")];

        console.log(this.$store);
      };

      p.draw = () => {
        p.background(this.$store.backgroundColor ?? p.color(0));
        for (const layer of this.$store.layers) layer.update(this.$store);
        for (const layer of this.$store.layers) p.image(layer.graphics, 0, 0);
      };

      p.mouseDragged = () => {
        this.$store.currentLayer?.mouseDragged(p, this.$store.currentTool);
      };

      p.mouseReleased = () => {
        this.$store.currentLayer?.mouseReleased();
      };

      p.keyPressed = () => {
        const dealWithDoubleShortcut = (key: string) => {
          if (
            this.$store.currentPrefixedShortcutKey ==
            this.$config.changeColorShortcutPrefix
          ) {
            if (hasOwnProperty(this.$store.currentTool.options, "color")) {
              const col = this.$config.changeColorShortcutMap[key];
              if (col) {
                console.log(`Changing color to ${col}...`);
                (this.$store.currentTool.options
                  .color as ToolOption<Color>).value = col;
              } else {
                console.log(`Invalid color: ${key}`);
              }
            }
            this.$store.currentPrefixedShortcutKey = null;
          }
        };

        switch (p.key) {
          case "b":
            dealWithDoubleShortcut("b");
            break;
          case "c":
            // Color change shortcut
            this.$store.currentPrefixedShortcutKey = "c";
            setTimeout(() => {
              this.$store.currentPrefixedShortcutKey = null;
            }, 1000);
            break;
          case "e":
            console.log("E key pressed");
            this.$store.setCurrentTool(ToolType.Eraser);
            break;
          case "p":
            this.$store.setCurrentTool(ToolType.Pen);
            break;
          case "w":
            dealWithDoubleShortcut("w");
            break;
          default:
            dealWithDoubleShortcut(p.key);
            break;
        }
      };
    };

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    new p5(sketch, document.getElementById("canvas")!);
  }
}
</script>

<style scoped>
#canvas {
  cursor: none;
}
</style>