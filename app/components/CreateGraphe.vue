<template>
  <div id="mynetwork" style="height: 100%; width: 100%;" class="object-cover"></div>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { DataSet, Network } from "vis-network/standalone";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

let network = null;

onMounted(() => {
  renderNetwork();
});


watch(
  () => props.data,
  () => {
    renderNetwork();
  },
  { deep: true }
);

function renderNetwork() {
  const container = document.getElementById("mynetwork");
  if (!container) return;

  const nodes = new DataSet([
    { id: 0, label: "RENNES" },
    { id: 1, label: "CAEN" },
    { id: 2, label: "LILLE" },
    { id: 3, label: "NANTES" },
    { id: 4, label: "PARIS" },
    { id: 5, label: "DIJON" },
    { id: 6, label: "NANCY" },
    { id: 7, label: "BORDEAUX" },
    { id: 8, label: "LYON" },
    { id: 9, label: "GRENOBLE" },
  ]);

  const edgesArray = props.data
  .filter(item => item.depart !== item.arrivee)
  .map(item => ({
    from: item.depart,
    to: item.arrivee,
    label: `${item.poids}`,
    color: { color: "#1976D2" },
    font: { color: "#0D47A1", size: 12, align: "middle" },
  }));

  const edges = new DataSet(edgesArray);


  const data = { nodes, edges };

  const options = {
    nodes: {
      shape: "box",
      widthConstraint: { minimum: 80, maximum: 80 },
      heightConstraint: { minimum: 35, maximum: 35 },
      font: { size: 12, color: "#fff", align: "center" },
      color: {
        background: "#1976D2",
        border: "#0D47A1",
        highlight: {
          background: "#42A5F5",
          border: "#0D47A1",
        },
      },
      borderWidth: 2,
    },
    edges: {
      color: "#999",
      font: { align: "middle", size: 12, color: "#444" },
      smooth: false,
    },
    physics: {
      enabled: false,
    },
  };

 
  if (network) {
    network.destroy();
  }

  network = new Network(container, data, options);
}
</script>

<style scoped>
#mynetwork {
  width: 100%;
  height: 100%;
  border: 1px solid lightgray;
}
</style>
