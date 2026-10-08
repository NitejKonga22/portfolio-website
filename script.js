const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxxJNqkShJk8cXnmXbEP2BM2R2AgS7igby4iy-6yE-EyUPiABfqfIGJ7ZsUOfzKzJpi/exec";
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
const admin = document.getElementById("admin");
const responsesBox = document.getElementById("responsesBox");
const loginBox = document.getElementById("loginBox");

function getResponses() {
  return JSON.parse(localStorage.getItem("contactResponses") || "[]");
}
function saveResponses(data) {
  localStorage.setItem("contactResponses", JSON.stringify(data));
}
function escapeHtml(value) {
  return String(value).replace(/[&<>\"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const item = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    message: document.getElementById("message").value.trim(),
    timestamp: new Date().toLocaleString()
  };
  const data = getResponses();
  data.push(item);
  saveResponses(data);

  if (APPS_SCRIPT_URL) {
    try {
      await fetch(APPS_SCRIPT_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(item) });
    } catch (_) {}
  }
  status.textContent = "Message sent successfully!";
  status.className = "success";
  form.reset();
});

document.getElementById("themeBtn").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const dark = document.body.classList.contains("dark");
  localStorage.setItem("theme", dark ? "dark" : "light");
  document.getElementById("themeBtn").textContent = dark ? "☀️" : "🌙";
});
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  document.getElementById("themeBtn").textContent = "☀️";
}

document.getElementById("adminToggle").addEventListener("click", () => admin.classList.toggle("hidden"));
document.getElementById("loginBtn").addEventListener("click", () => {
  const user = document.getElementById("adminUser").value;
  const pass = document.getElementById("adminPass").value;
  if (user === "admin" && pass === "1234") {
    loginBox.classList.add("hidden"); responsesBox.classList.remove("hidden"); renderResponses();
  } else alert("Invalid credentials");
});
document.getElementById("logoutBtn").addEventListener("click", () => {
  responsesBox.classList.add("hidden"); loginBox.classList.remove("hidden");
});
async function renderResponses() {
  const box = document.getElementById("responses");
  let data = getResponses();
  if (APPS_SCRIPT_URL) {
    try {
      const response = await fetch(APPS_SCRIPT_URL);
      if (response.ok) {
        const sheetData = await response.json();
        if (Array.isArray(sheetData)) data = sheetData;
      }
    } catch (_) {
      // Keep localStorage as a fallback for offline/demo use.
    }
  }
  box.innerHTML = data.length ? data.map((r, i) => `<div class="response"><b>#${i + 1} ${escapeHtml(r.name)}</b><br>📧 ${escapeHtml(r.email)}<br>💬 ${escapeHtml(r.message)}<br><small>🕒 ${escapeHtml(r.timestamp)}</small></div>`).join("") : "<p>No responses yet.</p>";
}
