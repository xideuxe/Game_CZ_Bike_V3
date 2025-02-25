import { saveScore, getLeaderboard } from "./firebase.js";

function showLeaderboard(finalScore) {
    let playerName = prompt("Your name :") || "Anonyme";
    saveScore(playerName, finalScore);

    getLeaderboard((scores) => {
        let leaderboardHTML = scores.map(s => `<li>${s.name}: ${s.score}</li>`).join("");
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
