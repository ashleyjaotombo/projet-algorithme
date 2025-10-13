<template>
    <v-container>
        <p class="text-button text-red text-center font-weight-bold mb-4">Algorithmes de parcours de graphes</p>
        <v-row>
            <v-col cols="6">
                <p class="ml-2 font-weight-medium">Graphe de référence pour les algorithmes : </p>
                <v-img src="/graphe.jpg" width="800" height="400" class="ma-0"/> 
            </v-col>
            <v-col cols="6" class="d-flex align-center justify-center">
                    <v-container>
                        <v-radio-group v-model="methode" inline label="Sélectionner le parcours souhaité :" class="font-weight-medium text-black">
                            <v-radio label="Parcours en largeur" value="largeur" color="primary" />
                            <v-radio label="Parcours en profondeur" value="profondeur" color="primary" />
                        </v-radio-group>
                    <v-select v-if="methode" v-model="ville" :items=items label="Choisir une ville de départ" density="compact" />
                    <v-btn v-if="ville!=''" class="ml-4" variant="elevated" color="primary" @click="submit=true">Appliquer</v-btn>
                    <p v-if="submit" class="mt-4 font-weight-bold">Ordre de visite : </p>
                    <p v-if="submit">{{ results }}</p>
                    </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { BFS } from '~/data/BFS';
import { DFS } from '~/data/DFS';

const methode=ref(false);
const items = ["Rennes", "Caen", "Lille", "Nantes", "Paris", "Dijon", "Nancy", "Bordeaux", "Lyon", "Grenoble"];
const ville = ref("");
const submit = ref(false);
const results = ref();

if (submit.value == true){
    results = ref(BFS(ville))
}

watch(ville, (newVille) => {
    if (methode.value == "largeur"){
        results.value = BFS(newVille);
    } else {
        results.value = DFS(newVille);
    }
    submit.value = false;
})


</script>