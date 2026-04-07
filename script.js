// ⭐⭐⭐⭐⭐ STAR RATING SYSTEM + BUTTON FIX

document.addEventListener("DOMContentLoaded", () => {

let rating = 0;

const stars = document.querySelectorAll("#stars span");
const emoji = document.getElementById("emoji");
const live = document.getElementById("liveRating");
const submitBtn = document.getElementById("submitBtn");

const emojis = ["😡","😕","😐","😊","😍"];

// ⭐ STAR CLICK
stars.forEach((star, index) => {

  star.addEventListener("click", () => {

    rating = index + 1;

    stars.forEach(s => s.classList.remove("active"));

    for (let i = 0; i < rating; i++) {
      stars[i].classList.add("active");
    }

    emoji.textContent = emojis[rating - 1];
    live.innerText = `⭐ ${rating} / 5`;

  });

});


// 🔥 FIREBASE SETUP

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getDatabase,
  ref,
  get,
  set,
  child
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDyVw8Is0UJIDkKwUeb-u86CCg-U5ll_q4",
  authDomain: "voting-54a5c.firebaseapp.com",
  projectId: "voting-54a5c",
  storageBucket: "voting-54a5c.firebasestorage.app",
  messagingSenderId: "534314424593",
  appId: "1:534314424593:web:ecd2261582ed3dad6114b0"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


// 📲 TELEGRAM CONFIG
const BOT_TOKEN = "8658392704:AAGPui4abxdTL1HjNdmJxJhTVLT6Um3Og-Y";
const CHAT_ID = "5083324379";


// 🚀 SUBMIT FUNCTION
async function submitFeedback() {

  const text = document.getElementById("text")?.value || "No comment";
  const stall = document.getElementById("stall").value;

  if (!rating || !stall) {
    alert("Please select rating and stall!");
    return;
  }

  try {

    // 📊 GET OLD DATA
    const snapshot = await get(child(ref(db), "votes"));

    let votes = {};

    if (snapshot.exists()) {
      votes = snapshot.val();
    }

    // 🧮 ADD VOTE
    votes[stall] = (votes[stall] || 0) + 1;

    // 💾 SAVE DATA
    await set(ref(db, "votes"), votes);

    alert("✅ Vote Submitted!");


    // 🏆 FIND WINNER
    let winner = "";
    let max = 0;

    for (let s in votes) {

      if (votes[s] > max) {
        max = votes[s];
        winner = s;
      }

    }


    // 📲 TELEGRAM MESSAGE
    let msg = `🗳 Bazaar O Nomics Voting\n\n`;

    for (let s in votes) {

      msg += `🏪 ${s}: ${votes[s]} votes\n`;

    }

    msg += `\n⭐ Rating: ${rating}/5`;
    msg += `\n🏆 Leader: ${winner} (${max} votes)`;


    // SEND TO TELEGRAM
    if (BOT_TOKEN !== "8658392704:AAGPui4abxdTL1HjNdmJxJhTVLT6Um3Og-Y") {

      fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {

        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: msg
        })

      });

    }

  }
  catch (error) {

    console.error(error);
    alert("❌ Error submitting vote!");

  }

}


// 🚀 BUTTON CLICK CONNECT
submitBtn.addEventListener("click", submitFeedback);

});
