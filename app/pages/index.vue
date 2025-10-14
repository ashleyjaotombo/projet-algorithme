<script lang="ts" setup>
import { BFS } from '~/data/BFS';
import { DFS } from '~/data/DFS';
import { KRUSHKAL } from '~/data/Krushkal';
import { PRIM } from '~/data/Prim';

BFS("Caen");
DFS("Caen");
KRUSHKAL();
PRIM("Paris"); //choisir la ville départ

         // <v-list :items="items"></v-list>


const items = [
    {
      title: 'Algorithme de parcours',
      value: 1,
    },
    {
      title: 'Arbre couvrant de poids minimum',
      value: 2,
    },
    {
      title: 'Recherche du chemin optimal (Dijkstra)',
      value: 3,
    },
    {
      title: 'Recherche du chemin optimal (Bellman-Ford, Floyd-Warshall)',
      value: 4,
    },
  ]
</script>

<template>
  <v-container>
    <h1 class="font-bold text-center text-red">PROJET - ALGORITHME ET THÉORIES DES GRAPHES</h1>
    <v-row class="" height="600">
      <v-col cols="6">
        <v-img src="/graphe.jpg" width="900" height="500"/>
      </v-col>
      <v-col cols="6" class="d-flex align-center justify-center">
        <v-card
          class="mx-auto rounded-xl mt-200"
          max-width="500" max-height="240"
        >
          <v-list density="compact">
            <v-list-item v-for="(item, index) in items" :key="index" :value="item" color="primary"> 
              <NuxtLink :to="`/${item.value}/`"  class="text-decoration-none text-white">
                <v-list-item-title>{{item.title}}</v-list-item-title>
              </NuxtLink>
            </v-list-item>
          
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  
  
  

</template>
