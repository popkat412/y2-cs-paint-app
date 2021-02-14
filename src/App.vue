<template>
  <div id="app">
    <div class="row">
      <div class="column side">
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
          <button @click="clearLayer">Clear Layer</button>
          <button></button>
        </div>
        <h2>Options</h2>
        <div
          v-for="(option, optionName) in $store.currentTool.options"
          style="text-align: left"
          :key="optionName"
        >
          <label>{{ titleCase(optionName) }}</label>
          <input
            v-if="option.type == 'number'"
            min="1"
            v-model.number="option.value"
            type="number"
          />
          <!-- cant use v-model because https://github.com/xiaokaike/vue-color/issues/185 -->
          <chrome-picker
            v-else-if="option.type == 'color'"
            :value="option.value"
            @input="(c) => ($store.currentTool.options.color.value = c.hex8)"
          />
        </div>
      </div>

      <div class="column middle">
        <Canvas />
      </div>

      <div class="column side">
        <h2>Layers</h2>
        <draggable v-model="$store.layers">
          <transition-group>
            <div
              v-for="(layer, index) in $store.layers"
              :key="layer.name"
              :class="{ selectedLayer: index == $store.currentLayerIdx }"
              @click="clickedLayer(index)"
            >
              {{ layer.name }}
            </div>
          </transition-group>
        </draggable>
        <button @click="addLayer">Add Layer</button>
        <p>{{ $store.currentPrefixedShortcutKey }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Canvas from "@/components/Canvas.vue";
import EVENTS from "@/models/events";
import draggable from "vuedraggable";
import { Chrome } from "vue-color";

@Component({
  components: {
    Canvas,
    draggable,
    "chrome-picker": Chrome,
  },
})
export default class App extends Vue {
  // METHODS
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
}
</script>

<style scoped>
#tools {
  float: left;
}

#tools::after {
  float: none;
}

.selectedLayer {
  background: gray;
}

.selectedTool {
  background: red;
}
</style>