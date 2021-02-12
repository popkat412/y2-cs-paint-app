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
        <!-- <h2>Options</h2>
        <div v-for="(value, option) in $store.currentTool" :key="option">
          <div v-if="option != 'type' && option != 'name'">
            <label :for="option">{{ option }}</label>
            <input type="text" v-model="" />
          </div>
        </div> -->
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
              :key="index"
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

@Component({
  components: {
    Canvas,
    draggable,
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