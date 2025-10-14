<template>

<div id="mynetwork" style="height: 100%; width: 100%;" class="object-cover"></div>
  
</template>

<script setup>
import { onMounted } from 'vue'


// Charger la librairie vis-network depuis le package npm (recommandé)
import { DataSet, Network } from "vis-network/standalone";

const nodes = ref(null);
const edges = ref(null);
const network = ref(null)

onMounted(() => {
  nodes.value = new DataSet([
    { id: 1, label: "RENNES"},
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
  edges.value = new DataSet([
    { from: 1, to: 2, label: "75" },
    { from: 1, to: 4, label: "45" },
    { from: 1, to: 5, label: "110" },
    { from: 1, to: 8, label: "130" },
    { from: 2, to: 1, label: "75" },
    { from: 2, to: 3, label: "65" },
    { from: 2, to: 5, label: "50" },
    { from: 3, to: 2, label: "65" },
    { from: 3, to: 5, label: "70" },
    { from: 3, to: 6, label: "120" },
    { from: 3, to: 7, label: "100" },
    { from: 4, to: 1, label: "45" },
    { from: 4, to: 5, label: "80" },
    { from: 4, to: 8, label: "90" },
    { from: 5, to: 1, label: "110" },
    { from: 5, to: 2, label: "50" },
    { from: 5, to: 3, label: "70" },
    { from: 5, to: 4, label: "80" },
    { from: 5, to: 6, label: "60" },
    { from: 5, to: 8, label: "150" },
    { from: 6, to: 3, label: "120" },
    { from: 6, to: 5, label: "60" },
    { from: 6, to: 7, label: "75" },
    { from: 6, to: 9, label: "70" },
    { from: 6, to: 10,label: "75" },
    { from: 7, to: 3, label: "100" },
    { from: 7, to: 6, label: "75" },
    { from: 7, to: 9, label: "90" },
    { from: 7, to: 10,label: "80" },
    { from: 8, to: 1, label: "130" },
    { from: 8, to: 4, label: "90" },
    { from: 8, to: 5, label: "150" },
    { from: 8, to: 9, label: "100" },
    { from: 9, to: 6, label: "70" },
    { from: 9, to: 7, label: "90" },
    { from: 9, to: 8, label: "100" },
    { from: 9, to: 10, label: "40" },
    { from: 10, to: 6, label: "75" },
    { from: 10, to: 7, label: "80" },
    { from: 10, to: 9, label: "40" },
  ]);

  const container = document.getElementById("mynetwork");

  const data = {
    nodes : nodes.value,
    edges : edges.value,
  };

  const options = {
    nodes: {
      shape: 'box',          
      fixed: {
        x: false,
        y: false,
      },
      widthConstraint: {      
        minimum: 70,
        maximum: 80,
      },
      heightConstraint: { 
        minimum: 30,
        maximum : 30,
        valign: 'middle',
      },
      font: {
        size: 12,
        color: '#fff',
        align: 'center',
      },
      color: {
        background: '#1976D2',
        border: '#0D47A1',
        highlight: {
          background: '#42A5F5',
          border: '#0D47A1',
        },
      },
      borderWidth: 2,
    },
    edges: {
      color: '#999',
      font: { align: 'middle', size: 12, color: '#444' },
    },
    physics: {
      enabled: false,
    },
  }


  network.value = new Network(container, data, options);
  console.log("Network ready:", network);
});

const model = defineModel();

watch(model, async (newModel) => {
  if (!newModel) return;

  console.log({ newModel });

  // 1️⃣ Réinitialiser toutes les arêtes en gris
  for (const edge of edges.value.get()) {
    edges.value.update({ id: edge.id, color: "#999", width: 1 });
  }

  // 2️⃣ Colorier progressivement les arêtes du modèle
  for (const path of newModel) {
  // Cherche dans le graphe l’arête correspondante
  const edge = edges.value
    .get()
    .find(
      (e) =>
        Number(e.from) === Number(path.depart + 1) &&
        Number(e.to) === Number(path.arrivee + 1)
    );

  if (edge) {
    // ⏳ pause avant coloration
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 🎨 colorie l’arête trouvée
    edges.value.update({ id: edge.id, color: "#4CAF50", width: 3 });

    console.log(
      `Coloré : ${path.depart + 1} → ${path.arrivee + 1} (${path.ordre})`
    );
  }
}
});

</script>

<style scoped>
#mynetwork {
  width: 600px;
  height: 400px;
  border: 1px solid lightgray;
}
</style>
