<template>
  <div id="app" @mousemove="updateMousePos">
    <div
      id="tool-size-indicator"
      v-if="showingSizeIndicator"
      :style="{
        width: $store.currentTool.options.size.value + 'px',
        height: $store.currentTool.options.size.value + 'px',
        top: mousePos.y - $store.currentTool.options.size.value / 2 + 'px',
        left: mousePos.x - $store.currentTool.options.size.value / 2 + 'px',
      }"
    ></div>
    <main>
      <div class="sidebar left">
        <h2>Tools</h2>
        <div id="tools">
          <button
            v-for="(tool, index) in $store.tools"
            :key="index"
            @click="changeTool(index)"
            :class="{ selectedTool: index == $store.currentToolIdx }"
          >
            {{ tool.name }}
          </button>
        </div>
        <h2>Options</h2>
        <div id="tool-options">
          <div
            v-for="(option, optionName) in $store.currentTool.options"
            style="text-align: left"
            :key="optionName"
          >
            <label>{{ titleCase(optionName) }}</label>
            <br />
            <input
              v-if="option.type == 'number'"
              min="1"
              v-model.number="option.value"
              type="number"
            />
            <!-- cant use v-model because https://github.com/xiaokaike/vue-color/issues/185 -->
            <chrome-picker
              class="color-picker"
              v-else-if="option.type == 'color'"
              :value="option.value"
              @input="(c) => ($store.currentTool.options.color.value = c.hex8)"
            />
          </div>
        </div>
      </div>

      <div>
        <Canvas
          @mouseover="showingSizeIndicator = true"
          @mouseleave="showingSizeIndicator = false"
        />
      </div>

      <div class="sidebar right">
        <h2>Layers</h2>
        <draggable v-model="$store.layers">
          <transition-group>
            <div
              v-for="(layer, index) in $store.layers"
              :key="layer.name"
              :class="{ selectedLayer: index == $store.currentLayerIdx }"
              class="layer"
              @click="clickedLayer(index)"
            >
              {{ layer.name }}
            </div>
          </transition-group>
        </draggable>
        <button @click="addLayer">Add Layer</button>
        <p>{{ $store.currentPrefixedShortcutKey }}</p>

        <h2>Actions</h2>

        <button @click="clearLayer">Clear Layer</button>
        <button @click="saveCanvas">Save as Image</button>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Canvas from "@/components/Canvas.vue";
import EVENTS from "@/models/events";
import draggable from "vuedraggable";
import { Chrome } from "vue-color";

interface Pos {
  x: number;
  y: number;
}

@Component({
  components: {
    Canvas,
    draggable,
    "chrome-picker": Chrome,
  },
})
export default class App extends Vue {
  // DATA
  showingSizeIndicator = false;
  mousePos: Pos = { x: 0, y: 0 };

  // METHODS
  updateMousePos(event: MouseEvent) {
    this.mousePos.x = event.pageX;
    this.mousePos.y = event.pageY;
  }

  addLayer() {
    this.$root.$emit(EVENTS.createLayer);
  }

  changeTool(idx: number) {
    this.$store.currentToolIdx = idx;
  }

  clearLayer() {
    this.$store.currentLayer.clear();
  }

  updateOption(option: string) {
    // TODO: Validate input
    console.log(option);
  }

  clickedLayer(idx: number) {
    this.$store.currentLayerIdx = idx;
  }

  saveCanvas() {
    this.$root.$emit(EVENTS.saveCanvas);
  }
}
</script>

<style scoped>
#tools {
  float: left;
  margin: auto;
  width: 100%;
  margin-bottom: 20px;
}

#tools::after {
  float: none;
}

.selectedTool {
  background: gold;
}

#tool-options {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.layer {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2em;
}
.selectedLayer {
  background: gray;
}

#tool-size-indicator {
  border-radius: 50%;
  border: 1px dashed white;
  position: absolute;
  pointer-events: none;
}
</style>