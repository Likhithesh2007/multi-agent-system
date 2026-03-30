/* ===============================
   ELEMENTS
================================*/

const plannerStatus = document.getElementById("planner-status");
const researchStatus = document.getElementById("research-status");
const coderStatus = document.getElementById("coder-status");

const startBtn = document.getElementById("startBtn");
const clearBtn = document.getElementById("clearBtn");
const taskInput = document.getElementById("taskInput");

const plannerCard = document.getElementById("card-Planner-Agent");
const researchCard = document.getElementById("card-Research-Agent");
const coderCard = document.getElementById("card-Coder-Agent");

const consoleOutput = document.getElementById("consoleOutput");

const plannerResult = document.querySelector("#planner-result pre");
const researchResult = document.querySelector("#research-result pre");
const coderResult = document.querySelector("#coder-result pre");

const blueprintSection = document.getElementById("blueprint-result");

const copyBtn = document.getElementById("copyBtn");
const downloadTxt = document.getElementById("downloadTxt");
const downloadMd = document.getElementById("downloadMd");

const exampleButtons = document.querySelectorAll(".example-btn");

/* ===============================
   EXAMPLE IDEAS
================================*/

exampleButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        const text = btn.innerText;

        if(text === "Food Delivery System"){
            taskInput.value = "Build a scalable food delivery system with real-time tracking and payment integration.";
        }

        else if(text === "AI Fitness App"){
            taskInput.value = "Create an AI-powered fitness app that generates personalized workout plans.";
        }

        else if(text === "Online Learning Platform"){
            taskInput.value = "Design an online learning platform with courses, authentication, and progress tracking.";
        }

        // 🔥 OPTIONAL: auto-run for demo
        startBtn.click();
    });

});

/* ===============================
   GET FULL BLUEPRINT
================================*/

function getFullBlueprint(){
    return `
===== PLANNER OUTPUT =====
${plannerResult.textContent}

===== RESEARCH OUTPUT =====
${researchResult.textContent}

===== CODER OUTPUT =====
${coderResult.textContent}
`;
}

/* ===============================
   LOG SYSTEM
================================*/

function log(message, type="process"){

    const div = document.createElement("div");
    div.className = "log-entry " + type;
    div.innerText = message;

    consoleOutput.appendChild(div);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

/* ===============================
   SLEEP
================================*/

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* ===============================
   SWITCH OUTPUT PANEL
================================*/

function showOutput(id){

    document.querySelectorAll(".blueprint-node")
    .forEach(node => node.classList.remove("active"));

    document.getElementById(id).classList.add("active");
}

/* ===============================
   CARD CLICK EVENTS
================================*/

plannerCard.onclick = () => showOutput("planner-result");
researchCard.onclick = () => showOutput("research-result");
coderCard.onclick = () => showOutput("coder-result");

/* ===============================
   START EXECUTION
================================*/

startBtn.onclick = async () => {

    const idea = taskInput.value.trim();

    if(!idea){
        alert("Enter an idea");
        return;
    }

    consoleOutput.innerHTML = "";
    blueprintSection.classList.add("hidden");

    log("🚀 Crew Execution Started","info");

    /* RESET */

    plannerStatus.innerText = "🔵";
    researchStatus.innerText = "🔵";
    coderStatus.innerText = "🔵";

    document.querySelectorAll(".pipeline-step")
    .forEach(step => step.classList.remove("active"));

    document.getElementById("step-idea").classList.add("active");

    /* ===== PLANNER ===== */

    plannerCard.classList.add("active");
    plannerStatus.innerText = "🟡";
    document.getElementById("step-planner").classList.add("active");

    log("Planner analyzing idea...");
    await sleep(600);

    log("Planner extracting features...");
    await sleep(600);

    log("Planner designing architecture...");
    await sleep(600);

    const response = await fetch("/generate-project",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({idea})
    });

    const data = await response.json();

    plannerCard.classList.remove("active");
    plannerCard.classList.add("completed");
    plannerStatus.innerText = "🟢";

    log("Planner Completed","success");

    /* ===== RESEARCH ===== */

    researchCard.classList.add("active");
    researchStatus.innerText = "🟡";
    document.getElementById("step-research").classList.add("active");

    log("Researcher evaluating stack...");
    await sleep(600);

    log("Researcher comparing frameworks...");
    await sleep(600);

    log("Researcher finalizing technologies...");
    await sleep(600);

    researchCard.classList.remove("active");
    researchCard.classList.add("completed");
    researchStatus.innerText = "🟢";

    log("Research Completed","success");

    /* ===== CODER ===== */

    coderCard.classList.add("active");
    coderStatus.innerText = "🟡";
    document.getElementById("step-coder").classList.add("active");

    log("Coder generating structure...");
    await sleep(600);

    log("Coder creating APIs...");
    await sleep(600);

    log("Coder designing database...");
    await sleep(600);

    coderCard.classList.remove("active");
    coderCard.classList.add("completed");
    coderStatus.innerText = "🟢";

    log("Coder Completed","success");

    /* ===== OUTPUT ===== */

    document.getElementById("step-output").classList.add("active");

    log("✅ Crew Execution Finished","success");

    plannerResult.textContent = data.planner || "";
    researchResult.textContent = data.research || "";
    coderResult.textContent = data.coder || "";

    blueprintSection.classList.remove("hidden");

    showOutput("planner-result");
};

/* ===============================
   RESET
================================*/

clearBtn.onclick = () => {

    taskInput.value = "";

    plannerCard.classList.remove("active","completed");
    researchCard.classList.remove("active","completed");
    coderCard.classList.remove("active","completed");

    plannerStatus.innerText = "🔵";
    researchStatus.innerText = "🔵";
    coderStatus.innerText = "🔵";

    document.querySelectorAll(".pipeline-step")
    .forEach(step => step.classList.remove("active"));

    plannerResult.textContent = "";
    researchResult.textContent = "";
    coderResult.textContent = "";

    blueprintSection.classList.add("hidden");

    consoleOutput.innerHTML =
    '<div class="log-entry info">System initialized. Waiting for task...</div>';
};

/* ===============================
   EXPORT FEATURES
================================*/

copyBtn.onclick = async () => {

    await navigator.clipboard.writeText(getFullBlueprint());
    log("📋 Copied to clipboard","success");
};

downloadTxt.onclick = () => {

    const blob = new Blob([getFullBlueprint()], {type:"text/plain"});
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "blueprint.txt";
    link.click();
};

downloadMd.onclick = () => {

    const text = `
# Development Blueprint

## Planner
${plannerResult.textContent}

## Research
${researchResult.textContent}

## Coder
${coderResult.textContent}
`;

    const blob = new Blob([text], {type:"text/markdown"});
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "blueprint.md";
    link.click();
};