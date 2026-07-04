const scanBtn = document.getElementById("scanBtn");
const fingerArea = document.getElementById("fingerArea");

const progressFill = document.getElementById("progressFill");
const percent = document.getElementById("percent");

const statusText = document.getElementById("statusText");

const analysisBox = document.getElementById("analysisBox");

const moodName = document.getElementById("moodName");
const moodDescription = document.getElementById("moodDescription");

const resultIcon = document.getElementById("resultIcon");

const historyList = document.getElementById("historyList");


const moods = [

    {
        mood: "Happy",
        icon: "fa-face-smile",
        color: "#00e676",
        description:
            "Your positive energy is extremely high. The AI detected a cheerful and optimistic emotional pattern."
    },

    {
        mood: "Excited",
        icon: "fa-face-laugh-beam",
        color: "#00d9ff",
        description:
            "High excitement detected. Your emotional activity indicates enthusiasm and motivation."
    },

    {
        mood: "Calm",
        icon: "fa-face-meh",
        color: "#4fc3f7",
        description:
            "Your heartbeat pattern appears balanced. The AI predicts a calm and relaxed emotional state."
    },

    {
        mood: "Focused",
        icon: "fa-brain",
        color: "#8e7dff",
        description:
            "Strong concentration signals detected. Your neural activity suggests deep focus."
    },

    {
        mood: "Curious",
        icon: "fa-lightbulb",
        color: "#ffd54f",
        description:
            "Curiosity level is high. Your responses indicate an active and learning mindset."
    },

    {
        mood: "Sleepy",
        icon: "fa-bed",
        color: "#90caf9",
        description:
            "Low energy detected. The AI believes you may need rest or a short break."
    }

];

const aiMessages = [

    "Initializing neural engine...",
    "Connecting biometric sensors...",
    "Analyzing fingerprint frequency...",
    "Matching emotional patterns...",
    "Reading heartbeat simulation...",
    "Building psychological profile...",
    "Checking stress indicators...",
    "Scanning facial micro-signals...",
    "Predicting emotional response...",
    "Generating final AI report..."

];

let scanning = false;
let progress = 0;
let timer;

function randomItem(array) {

    return array[
        Math.floor(Math.random() * array.length)
    ];

}

scanBtn.addEventListener("click", startScan);

fingerArea.addEventListener("click", startScan);

function startScan() {

    if (scanning) return;

    scanning = true;

    progress = 0;

    progressFill.style.width = "0%";

    percent.textContent = "0%";

    fingerArea.classList.add("scanning");

    statusText.textContent = "Scanning...";

    scanBtn.disabled = true;

    scanBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Scanning';

    historyList.innerHTML = "";

    typeMessage(aiMessages[0]);

    let index = 0;

    timer = setInterval(() => {

        progress += Math.floor(Math.random() * 6) + 2;

        if (progress > 100)
            progress = 100;

        progressFill.style.width =
            progress + "%";

        percent.textContent =
            progress + "%";

        if (
            progress > 10 &&
            index < aiMessages.length - 1
        ) {

            index++;

            typeMessage(
                aiMessages[index]
            );

        }

        if (progress >= 100) {

            clearInterval(timer);

            setTimeout(showResult, 800);

        }

    }, 170);

}

function typeMessage(text) {

    analysisBox.textContent = "";

    let i = 0;

    const typing = setInterval(() => {

        analysisBox.textContent += text.charAt(i);

        i++;

        if (i >= text.length) {

            clearInterval(typing);

        }

    }, 30);

}

function showResult() {

    const selectedMood = randomItem(moods);

    statusText.textContent = "Analysis Complete";

    // Result Icon
    resultIcon.innerHTML =
        `<i class="fa-solid ${selectedMood.icon}"></i>`;

    resultIcon.style.background =
        `linear-gradient(135deg, ${selectedMood.color}, #006eff)`;

    resultIcon.style.boxShadow =
        `0 0 30px ${selectedMood.color}`;

    // Mood Text
    moodName.textContent = selectedMood.mood;
    moodName.style.color = selectedMood.color;

    moodDescription.textContent =
        selectedMood.description;

    // Final AI Report
    analysisBox.innerHTML = `
AI Scan Completed Successfully.

Dominant Emotion :
${selectedMood.mood}

Confidence Score :
${randomNumber(91,99)}%

Stress Level :
${randomNumber(5,35)}%

Energy Level :
${randomNumber(60,100)}%

Recommendation :
Stay positive and continue taking care of yourself.
`;

    // Add Scan History
    addHistory(selectedMood);

    // Finish Animation
    fingerArea.classList.remove("scanning");

    scanBtn.disabled = false;

    scanBtn.innerHTML =
        '<i class="fa-solid fa-bolt"></i> Scan Again';

    scanning = false;

}

function randomNumber(min, max){

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

}

function addHistory(mood){

    const li = document.createElement("li");

    const time =
        new Date().toLocaleTimeString([],{
            hour:"2-digit",
            minute:"2-digit"
        });

    li.innerHTML = `
<strong>${mood.mood}</strong>
&nbsp;&nbsp;|&nbsp;&nbsp;
Confidence ${randomNumber(90,99)}%
&nbsp;&nbsp;|&nbsp;&nbsp;
${time}
`;

    historyList.prepend(li);

    while(historyList.children.length > 5){

        historyList.removeChild(
            historyList.lastChild
        );

    }

}

const moodCards =
    document.querySelectorAll(".mood-card");

moodCards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform =
            "translateY(-8px) scale(1.05)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform =
            "";

    });

});

const glows =
    document.querySelectorAll(".glow");

glows.forEach((glow,index)=>{

    let angle = index * 120;

    setInterval(()=>{

        angle += 1;

        const x =
            Math.cos(angle*Math.PI/180)*15;

        const y =
            Math.sin(angle*Math.PI/180)*15;

        glow.style.transform =
            `translate(${x}px,${y}px)`;

    },40);

});

setInterval(()=>{

    if(!scanning){

        fingerArea.animate(

            [

                {
                    transform:"scale(1)"
                },

                {
                    transform:"scale(1.03)"
                },

                {
                    transform:"scale(1)"
                }

            ],
            {
                duration:1800
            }

        );

    }

},2200);

window.addEventListener("load",()=>{

    analysisBox.textContent =
        "MoodScan AI is online.\n\nPlace your finger on the scanner and press 'Start Scan' to begin the futuristic emotion analysis.";

});

document.addEventListener("keydown",(e)=>{

    if(e.code==="Space"){

        e.preventDefault();

        if(!scanning){

            startScan();

        }

    }

});
