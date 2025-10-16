<template>
  <v-col class="w-100 ma-0" cols="12">
    <p class="text-button text-green text-center font-weight-bold mb-4">
      Algorithme de l'arbre couvrant minimal — KRUSKAL
    </p>

    <v-row>
      <v-col cols="7">
        <RetourButton/>
        
        <p class="ml-2 font-weight-medium">
          Graphe de référence pour les algorithmes :
        </p>
        <GrapheDisplay v-model="resultat" class="w-100" style="height: 600px;" />
      </v-col>

      <v-col cols="5" class="d-flex align-center justify-center px-4">
        <v-container>
          <p class="text-caption mb-6 text-red">
            Vous pouvez changer l'organisation du graphe manuellement en glissant les sommets.
            Vous pouvez également actualiser la page pour forcer la restructuration.
          </p>

          

          <v-btn
            v-if="ville !== ''"
            class="ma-4"
            variant="elevated"
            :color="colorKrushkal"
            width="300"
            @click="runAlgoKrushkal"
          >
            Lancer l'algorithme de Kruskal
          </v-btn>
          <v-btn
            class="ma-4"
            variant="elevated"
            :color="colorPrim"
            width="300"
            @click="active = true; choix = 'Prim'; reload = false"
          >
            Lancer l'algorithme de Prim
          </v-btn>

          <v-select
            v-if="active"
            v-model="ville"
            :items="villes"
            label="Choisir une ville de départ"
            density="compact"
          />

          <v-btn v-if="ville && choix === 'Prim'" class="ml-6" color="red-darken-2" @click="runAlgoPrim">
            Lancer PRIM
          </v-btn>

          <v-container v-if="submit && reload">
            <p v-if="submit">Résultat de l'arbre couvrant : ({{ choix }})</p>
          <v-list density="compact" class="bg-teal-lighten-4 rounded-xl">
            <v-list-item
              v-for="(edge, index) in resultat"
              :key="index"
            >
              <v-list-item-title>
                {{ villes[edge.depart] }} → {{ villes[edge.arrivee] }}
                ({{ edge.poids }} km)
              </v-list-item-title>
            </v-list-item>
          </v-list>
          </v-container>
          
        </v-container>
      </v-col>
    </v-row>
  </v-col>
</template>

<script setup>
import { ref } from "vue";
import GrapheDisplay from "@/components/GrapheDisplay.vue";
import RetourButton from "@/components/RetourButton.vue";
import { KRUSHKAL } from "~/data/Krushkal";
import { PRIM } from "~/data/Prim";

const choix = ref(null);

// Ton tableau des villes pour l'affichage lisible
const villes = [
  "Rennes",
  "Caen",
  "Lille",
  "Nantes",
  "Paris",
  "Dijon",
  "Nancy",
  "Bordeaux",
  "Lyon",
  "Grenoble",
];
const ville = ref(null); //pour récupérer la ville choisie

const active = ref(false);

// Résultat du graphe (resultat est le v-model de GrapheDisplay)
const resultat = ref([]);
const submit = ref(false);
const colorKrushkal = ref("teal-darken-3")
const colorPrim = ref("teal-darken-3");
const reload = ref(false);

// Fonction déclenchant l'algo de Krushkal
function runAlgoKrushkal() {
  resultat.value = KRUSHKAL();
  submit.value = true;
  reload.value=false;
  colorKrushkal.value = "teal-lighten-2"
  colorPrim.value = "teal-darken-3"
  active.value = false;
  choix.value="Krushkal";
  setTimeout(()=>{
    reload.value = true;
  }, 1000)
  
}

// Fonction déclenchant l'algo de Prim
function runAlgoPrim() {
  resultat.value = PRIM(ville.value);
  submit.value = true;
  colorPrim.value = "teal-lighten-2"
  colorKrushkal.value = "teal-darken-3"
  reload.value = true;
}
</script>

<style scoped>
h1 {
  letter-spacing: 0.5px;
}
</style>
