<template>
  <v-container>
    <div id="mynetwork" style="height: 400px; width: 100%;" class="object-cover"></div>

    <v-btn class="mt-4" color="primary" @click="runBFS">
      Lancer BFS
    </v-btn>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { DataSet, Network } from "vis-network/standalone";

let network;  // instance du graphe
let edges;    // dataset des arêtes

// --- Création du graphe au montage
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

  const edgesArray = [
    { id: 1, from: 1, to: 2, label: "75" },
    { id: 2, from: 1, to: 4, label: "45" },
    { id: 3, from: 1, to: 5, label: "110" },
    { id: 4, from: 1, to: 8, label: "130" },
    { id: 5, from: 2, to: 3, label: "65" },
    { id: 6, from: 2, to: 5, label: "50" },
    { id: 7, from: 3, to: 5, label: "70" },
    { id: 8, from: 3, to: 6, label: "120" },
    { id: 9, from: 3, to: 7, label: "100" },
    { id: 10, from: 4, to: 8, label: "90" },
    { id: 11, from: 5, to: 6, label: "60" },
    { id: 12, from: 6, to: 9, label: "70" },
    { id: 13, from: 9, to: 10, label: "40" },
  ];

  edges = new DataSet(edgesArray);

  const container = document.getElementById("mynetwork");
  const data = { nodes, edges };

  const options = {
    nodes: {
      shape: "box",
      widthConstraint: { minimum: 80, maximum: 80 },
      heightConstraint: { minimum: 35 },
      font: { size: 12, color: "#fff", align: "center" },
      color: {
        background: "#1976D2",
        border: "#0D47A1",
        highlight: { background: "#42A5F5", border: "#0D47A1" },
      },
    },
    edges: {
      color: "#999",
      font: { align: "middle", size: 12, color: "#444" },
      smooth: false,
    },
    physics: { enabled: false },
  };

  network = new Network(container, data, options);
});

// --- Fonction BFS locale (retourne atraiter)
function BFS() {
  // 👉 Exemple : un tableau d’arêtes parcourues (comme ton BFS réel)
  return [
    { depart: 0, arrivee: 1, poids: 75 },
    { depart: 1, arrivee: 4, poids: 50 },
    { depart: 4, arrivee: 5, poids: 60 },
    { depart: 5, arrivee: 8, poids: 100 },
  ];
}

// --- Appliquer le BFS et colorier les arêtes correspondantes
function runBFS() {
  const atraiter = BFS();
  console.log("🎯 BFS renvoie :", atraiter);

  if (!edges || !network) return;

  // Réinitialise les arêtes en gris
  edges.forEach((edge) => {
    edges.update({ id: edge.id, color: "#999", width: 1 });
  });

  // Colorie les arêtes présentes dans atraiter
  edges.forEach((edge, id) => {
    const found = atraiter.some(
      (p) => p.depart + 1 === edge.from && p.arrivee + 1 === edge.to
    );
    if (found) {
      edges.update({ id, color: "#4CAF50", width: 3 });
    }
  });
}
</script>

<style scoped>
#mynetwork {
  width: 100%;
  height: 400px;
  border: 1px solid lightgray;
}
</style>
