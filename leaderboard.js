import { saveScore, getLeaderboard } from "./firebase.js";

function showLeaderboard(finalScore) {
    console.log("Final Score reçu par showLeaderboard :", finalScore);
    let playerName = prompt("Your name :") || "Unknown_Broccoli";
    saveScore(playerName, finalScore);

    getLeaderboard((scores) => {
        let leaderboardHTML = scores.map((s, index) => {
            let rankClass = "";
            if (index === 0) rankClass = "gold";   // 🥇
            if (index === 1) rankClass = "silver"; // 🥈
            if (index === 2) rankClass = "bronze"; // 🥉

            return `
                <li class="leaderboard-entry ${rankClass}">
                    <span class="rank">${index + 1}.</span>
                    <span class="name">${s.name}</span> 
                    <span class="score">${s.score}</span>
                </li>
            `;
        }).join("");

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
