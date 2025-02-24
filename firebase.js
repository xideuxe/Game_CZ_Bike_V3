import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, set, get, push, query, orderByChild, limitToLast } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// Configuration Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Fonction pour sauvegarder un score
export function saveScore(playerName, score) {
    const scoresRef = ref(db, 'scores');

    push(scoresRef, {
        name: playerName,
        score: score
    }).then(() => {
        console.log("Score sauvegardé !");
    }).catch((error) => {
        console.error("Erreur d'enregistrement :", error);
    });
}

// Fonction pour récupérer le leaderboard
export function getLeaderboard(callback) {
    const scoresRef = query(ref(db, 'scores'), orderByChild('score'), limitToLast(10));

    get(scoresRef).then((snapshot) => {
        if (snapshot.exists()) {
            let scores = Object.values(snapshot.val()).sort((a, b) => b.score - a.score);
            callback(scores);
        }
    }).catch((error) => {
        console.error("Erreur de récupération du leaderboard :", error);
    });
}
