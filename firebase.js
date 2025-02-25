// 🔥 Importer Firebase depuis le CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push, query, orderByChild, limitToLast, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// 🔥 Configuration Firebase (REMPLACE LES VALEURS AVEC LES TIENNES)
const firebaseConfig = {
  apiKey: "AIzaSyDsOnq-gDJpYqEppwyp8bHLDkjiVsPlaDI",
  authDomain: "cz-game-v3.firebaseapp.com",
  databaseURL: "https://cz-game-v3-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "cz-game-v3",
  storageBucket: "cz-game-v3.appspot.com",
  messagingSenderId: "538971726457",
  appId: "1:538971726457:web:1f912285be9fd1efc12aa8"
};

// 🔥 Initialiser Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// 🔥 Fonction pour sauvegarder un score dans la base de données Firebase
export function saveScore(playerName, score) {
    console.log(`🔥 Enregistrement dans Firebase : ${playerName} - ${score}`); // 🔥 Vérifie ici
    push(ref(database, "leaderboard"), { name: playerName, score: score });
}

// 🔥 Fonction pour récupérer les meilleurs scores
export async function getLeaderboard(callback) {
    const scoresRef = ref(database, "leaderboard"); // Pas de orderByChild()
    const snapshot = await get(scoresRef);
    console.log("🔥 Données brutes récupérées :", snapshot.val());
    let scores = [];

    snapshot.forEach(child => scores.push(child.val()));

    // 🔹 Trier par score décroissant et garder les 5 meilleurs
    scores = scores.sort((a, b) => b.score - a.score).slice(0, 5);

    console.log("🏆 Scores récupérés et triés :", scores); // Vérifier que le tri fonctionne

    callback(scores);
}
