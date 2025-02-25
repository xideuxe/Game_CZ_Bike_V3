// 🔥 Importer Firebase depuis le CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// 🔥 Configuration Firebase
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

// 🔥 Fonction pour sauvegarder un score dans Firebase
export function saveScore(playerName, score) {
    console.log(`🔥 Enregistrement dans Firebase : ${playerName} - ${score}`);
    push(ref(database, "leaderboard"), { name: playerName, score: score });
}

// 🔥 Fonction pour récupérer les 5 meilleurs scores
export async function getLeaderboard(callback) {
    const scoresRef = ref(database, "leaderboard");
    console.log("📡 Chemin Firebase utilisé :", scoresRef.toString());
    const snapshot = await get(scoresRef);

    if (!snapshot.exists()) {
        console.log("⚠️ Aucun score trouvé dans Firebase.");
        callback([]);
        return;
    }

    let scores = [];
    snapshot.forEach(child => scores.push(child.val()));

    console.log("🔥 Données complètes récupérées :", scores);

    // 🔹 Trier en ordre décroissant AVANT de couper à 5
    scores.sort((a, b) => b.score - a.score);
    scores = scores.slice(0, 5); 

    console.log("🏆 Scores triés et limités à 5 :", scores);

    callback(scores);
}
