<template>
  <v-container id="mynetwork" class="bg-blue"></v-container>
</template>

<script setup>
import { onMounted } from 'vue'

// Charger la librairie vis-network depuis le package npm (recommandé)
import { DataSet, Network } from "vis-network/standalone";


onMounted(() => {
  const nodes = new DataSet([
    { id: 1, label: "RENNES" },
    { id: 2, label: "CAEN" },
    { id: 3, label: "LILLE" },
    { id: 4, label: "NANTES" },
    { id: 5, label: "PARIS" },
    { id: 6, label: "DIJON" },
    { id: 7, label: "NANCY" },
    { id: 8, label: "BORDEAUX" },
    { id: 9, label: "LYON" },
    { id: 10, label: "GRENOBLE" },
  ]);

  const edges = new DataSet([
    { from: 1, to: 2 },
    { from: 1, to: 4 },
    { from: 1, to: 5 },
    { from: 1, to: 8 },
    { from: 2, to: 1 },
    { from: 2, to: 3 },
    { from: 2, to: 5 },
    { from: 3, to: 2 },
    { from: 3, to: 5 },
    { from: 3, to: 6 },
    { from: 3, to: 7 },
    { from: 4, to: 1 },
    { from: 4, to: 5 },
    { from: 4, to: 8 },
    { from: 5, to: 1 },
    { from: 5, to: 2 },
    { from: 5, to: 3 },
    { from: 5, to: 4 },
    { from: 5, to: 6 },
    { from: 6, to: 3 },
    { from: 6, to: 5 },
    { from: 6, to: 7 },
    { from: 6, to: 9 },
    { from: 6, to: 10 },
    { from: 7, to: 6 },
    { from: 7, to: 9 },
    { from: 7, to: 10 },
    { from: 8, to: 1 },
    { from: 8, to: 4 },
    { from: 8, to: 5 },
    { from: 8, to: 9 },
    { from: 9, to: 6 },
    { from: 9, to: 7 },
    { from: 9, to: 8 },
    { from: 9, to: 10 },
    { from: 10, to: 6 },
    { from: 10, to: 7 },
    { from: 10, to: 9 },
  ]);

  const container = document.getElementById("mynetwork");

  const data = {
    nodes,
    edges,
  };

  const options = {
    nodes: {
      shape: "dot",
      size: 20,
      font: { size: 14, color: "#000" },
    },
    edges: {
      color: "#848484",
      arrows: { to: false },
    },
    physics: {
      enabled: false,
    },
  };

  const network = new Network(container, data, options);
  console.log("Network ready:", network);
});
</script>

<style scoped>
#mynetwork {
  width: 600px;
  height: 400px;
  border: 1px solid lightgray;
}
</style>
