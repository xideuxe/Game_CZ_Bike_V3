import { saveScore, getLeaderboard } from "./firebase.js";

function showLeaderboard(finalScore) {
    console.log("Final Score reçu par showLeaderboard :", finalScore); // 🔥 Vérifie ici
    let playerName = prompt("Your name :") || "Anonyme";
    saveScore(playerName, finalScore);

    getLeaderboard((scores) => {
    let leaderboardHTML = scores.map((s, index) => `
        <div class="leaderboard-entry">
            <span class="rank">${index + 1}.</span>
            <span class="name">${s.name}</span> 
            <span class="score">${s.score}</span>
        </div>
    `).join("");
        document.getElementById("leaderboard-list").innerHTML = leaderboardHTML;
        document.getElementById("leaderboard").style.display = "block"; // Afficher
    });
}

function hideLeaderboard() {
    document.getElementById("leaderboard").style.display = "none";
}

// Exposer les fonctions pour qu'elles soient accessibles globalement
window.showLeaderboard = showLeaderboard;
window.hideLeaderboard = hideLeaderboard;
