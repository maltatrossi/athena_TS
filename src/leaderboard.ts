import { collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "./firebase";
import { serverTimestamp } from "firebase/firestore";

export async function updateLeaderboard(name: string, score: number) {
  const leaderboardRef = collection(db, "leaderboard");
  await addDoc(leaderboardRef, {
    name: name,
    score: score,
    date: serverTimestamp(),
  });

  // Retrieve leaderboard data and update table
  const leaderboardTable = document.querySelector("table tbody");
  const leaderboardQuery = query(
    collection(db, "leaderboard"),
    orderBy("score", "desc"),
    limit(5)
  );

  getDocs(leaderboardQuery)
    .then((querySnapshot) => {
      leaderboardTable.innerHTML = "";
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${data.name}</td>
          <td>${data.score}</td>
          <td>${data.date.toDate().toLocaleString()}</td>
        `;
        leaderboardTable.appendChild(row);
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
