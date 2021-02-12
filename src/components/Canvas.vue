<template>
  <div id="canvas"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import p5 from "p5";
import Layer from "@/models/layer";
import { Eraser, Pen, Spray, ToolType } from "@/models/tool";
import EVENTS from "@/models/events";
import hasOwnProperty from "@/helpers/hasOwnProperty";

@Component
export default class Canvas extends Vue {
  mounted() {
    const sketch = (p: p5) => {
      this.$root.$on(EVENTS.createLayer, () => {
        this.$store.layers.push(
          new Layer(p, `Layer ${this.$store.layers.length + 1}`)
        );
        this.$store.currentLayerIdx = this.$store.layers.length - 1;
      });

      p.setup = () => {
        p.createCanvas(window.innerWidth * 0.5, window.innerHeight);
        this.$store.layers = [new Layer(p, "Layer 1")];
        this.$store.tools = [new Pen(p), new Eraser(), new Spray(p)];

        console.log(this.$store);
      };

      p.draw = () => {
        p.background(this.$store.backgroundColor ?? p.color(0));
        for (const layer of this.$store.layers) layer.draw(this.$store);
        for (const layer of this.$store.layers) p.image(layer.graphics, 0, 0);
      };

      p.mouseDragged = () => {
        this.$store.currentLayer?.mouseDragged(
          p.mouseX,
          p.mouseY,
          this.$store.currentTool
        );
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
            if (hasOwnProperty(this.$store.currentTool, "color")) {
              const col = this.$config.changeColorShortcutMap[key];
              if (col) {
                console.log(`Changing color to ${col}...`);
                this.$store.currentTool.color = p.color("blue");
              } else {
                console.log(`Invalid color: ${key}`);
              }
            }
            this.$store.currentPrefixedShortcutKey = null;
          }
        };

        switch (p.key) {
          case "a":
            break;
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
          case "d":
            break;
          case "e":
            console.log("E key pressed");
            this.$store.setCurrentTool(ToolType.Eraser);
            break;
          case "f":
            break;
          case "g":
            break;
          case "p":
            this.$store.setCurrentTool(ToolType.Pen);
            break;
          case "w":
            break;
          default:
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
/* #canvas {
  margin: auto;
} */
</style>