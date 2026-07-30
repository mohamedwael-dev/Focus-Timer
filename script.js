let timeLeft = 50 * 60;
let timer = null;

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  document.getElementById("time").textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
  if (timer) return;

  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timer);
      timer = null;
      alert(
        "🎉 Great job! Your focus session is complete. Take a 5-minute break.",
      );
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  timer = null;
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  timeLeft = 50 * 60;
  updateDisplay();
}

updateDisplay();

function generateQuiz() {
  let lesson = document.getElementById("lesson").value;

  let explanation = document.getElementById("explanation").value;

  if (lesson === "" || explanation === "") {
    alert("Please complete the lesson and explanation first!");

    return;
  }

  let questions = [
    "1. What is the main idea of " + lesson + "?",

    "2. Explain one important concept from this lesson.",

    "3. Why is " + lesson + " important?",

    "4. Give an example related to this lesson.",

    "5. What is something new you learned?",
  ];

  let quizHTML = "<h3>📝 Your AI Exam</h3>";

  questions.forEach((q, index) => {
    quizHTML += `

<div class="quiz-question">

<p>${q}</p>

<input 
type="radio" 
name="q${index}"
value="correct"> I know this

<br>

<input 
type="radio" 
name="q${index}"
value="wrong"> I need review

</div>

`;
  });

  quizHTML += `

<button onclick="checkResult()">

Check Understanding

</button>

`;

  document.getElementById("quiz").innerHTML = quizHTML;
}

function checkResult() {
  let total = 5;

  let correct = 0;

  for (let i = 0; i < 5; i++) {
    let answer = document.querySelector(`input[name="q${i}"]:checked`);

    if (answer && answer.value === "correct") {
      correct++;
    }
  }

  let percentage = (correct / total) * 100;

  document.getElementById("result").innerHTML =
    `Your Understanding Level: ${percentage}% 🤖`;
}
let studyTime = Number(localStorage.getItem("studyHours")) || 0;

let studying = false;

let startTime;

function updateTree() {
  document.getElementById("hours").textContent = studyTime;

  let tree = document.getElementById("tree");

  if (studyTime == 0) {
    tree.textContent = "🌱";
  } else if (studyTime == 1) {
    tree.textContent = "🌿";
  } else if (studyTime == 2) {
    tree.textContent = "🌳";
  } else if (studyTime >= 3) {
    tree.textContent = "🌲";
  }
}

function startGrowing() {
  if (studying) return;

  studying = true;

  startTime = Date.now();

  alert("🌱 Your tree started growing!\nDon't leave the page.");
}

setInterval(() => {
  if (studying) {
    let minutes = Math.floor((Date.now() - startTime) / 60000);

    if (minutes >= 50) {
      studyTime++;

      localStorage.setItem("studyHours", studyTime);

      studying = false;

      updateTree();

      alert("🌳 Congratulations! Your tree grew!");
    }
  }
}, 1000);

window.addEventListener("beforeunload", () => {
  if (studying) {
    localStorage.removeItem("studyHours");
  }
});

updateTree();

function analyzePDF() {
  let file = document.getElementById("pdfFile").files[0];

  if (!file) {
    alert("Please upload a PDF first!");

    return;
  }

  document.getElementById("summary").innerHTML = `
⏳ AI is reading your PDF...

<br><br>

Generating summary...
`;

  setTimeout(() => {
    document.getElementById("summary").innerHTML = `
✅ Main Points:

• Important concepts explained
• Key definitions extracted
• Main ideas organized
`;

    document.getElementById("flashcards").innerHTML = `
🃏 Flashcard 1:
Question: What is the main topic?

Answer: The topic of the PDF.


<br><br>

🃏 Flashcard 2:
Question: Explain the important concept.

Answer: Review the lesson notes.
`;

    document.getElementById("quizAI").innerHTML = `
1) What is the main idea?

2) Explain an important concept.

3) Give an example.

4) What did you learn?

5) Why is this topic important?
`;
  }, 3000);
}
function joinRoom() {
  let room = document.getElementById("roomName").value;

  if (room === "") {
    alert("Enter room name first!");

    return;
  }

  document.getElementById("roomTitle").innerHTML = `
📚 Room: ${room}
<br>
🟢 You joined the study room
`;
}
const LIMIT = 5;
const TIME_WINDOW = 20 * 60 * 1000;

let distractions = JSON.parse(localStorage.getItem("distractions")) || [];

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    const now = Date.now();

    distractions.push(now);

    distractions = distractions.filter((time) => now - time <= TIME_WINDOW);

    localStorage.setItem("distractions", JSON.stringify(distractions));

    checkDistraction();
  }
});

function checkDistraction() {
  const count = distractions.length;

  document.getElementById("exitCount").textContent = count;

  const message = document.getElementById("message");

  if (count >= LIMIT) {
    message.innerHTML = `
        🚨 We noticed that you left your study session
        <strong>${count}</strong> times in the last 20 minutes.<br><br>
        Would you like to enable <strong>Focus Mode</strong>?
        `;
  } else if (count >= 3) {
    message.innerHTML = `
        ⚠️ You seem to be getting distracted.<br>
        Try staying focused on your current session.
        `;
  } else {
    message.innerHTML = "💪 Great! You're staying focused.";
  }
}

function enableFocusMode() {
  alert(`
🔒 Focus Mode Activated

✔ Close social media
✔ Turn on Do Not Disturb
✔ Stay on this page
✔ Finish your study session

Good luck! 🚀
`);
}

checkDistraction();
