// 🔥 FIREBASE
import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getDatabase,
  ref,
  get,
  set,
  child
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// ⭐ GLOBAL RATING
let rating = 0;


// ⭐ STAR SYSTEM
document.addEventListener("DOMContentLoaded", () => {

  const stars = document.querySelectorAll("#stars span");
  const emoji = document.getElementById("emoji");
  const live = document.getElementById("liveRating");

  const emojis = ["😡","😕","😐","😊","😍"];

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

});


// 🔥 FIREBASE CONFIG
const firebaseConfig = {

  apiKey: "AIzaSyDyVw8Is0UJIDkKwUeb-u86CCg-U5ll_q4",

  authDomain: "voting-54a5c.firebaseapp.com",

  databaseURL:
  "https://voting-54a5c-default-rtdb.firebaseio.com",

  projectId: "voting-54a5c",

  storageBucket:
  "voting-54a5c.firebasestorage.app",

  messagingSenderId: "534314424593",

  appId:
  "1:534314424593:web:ecd2261582ed3dad6114b0"

};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


// 📲 TELEGRAM
const BOT_TOKEN = "8658392704:AAGPui4abxdTL1HjNdmJxJhTVLT6Um3Og-Y";
const CHAT_ID = "5083324379";


// 🚀 SUBMIT FUNCTION
async function submitFeedback() {

  const stall =
  document.getElementById("stall").value;

  if (!rating || !stall) {

    alert("Please select rating & stall!");
    return;

  }

  try {

    const snapshot =
    await get(child(ref(db), "votes"));

    let votes = {};

    if (snapshot.exists()) {

      votes = snapshot.val();

    }

    votes[stall] =
    (votes[stall] || 0) + 1;

    await set(ref(db, "votes"), votes);

    alert("✅ Vote Submitted!");

  }

  catch (error) {

    console.error(error);
    alert("Error submitting vote!");

  }

}


// ⭐ VERY IMPORTANT
window.submitFeedback = submitFeedback;
