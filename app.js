// ================= SAMPLE DATA =================
const sampleUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    coins: 450,
    status: "active",
    joined: "2025-09-15",
    campaigns_created: 3,
    subscriptions_made: 45,
    password: "password",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@example.com",
    role: "user",
    coins: 820,
    status: "active",
    joined: "2025-08-22",
    campaigns_created: 2,
    subscriptions_made: 82,
    password: "password",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    role: "user",
    coins: 150,
    status: "active",
    joined: "2025-10-01",
    campaigns_created: 1,
    subscriptions_made: 15,
    password: "password",
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily@example.com",
    role: "user",
    coins: 0,
    status: "banned",
    joined: "2025-07-10",
    campaigns_created: 0,
    subscriptions_made: 0,
    password: "password",
  },
  {
    id: 5,
    name: "Admin User",
    email: "admin@easysubscribe.com",
    role: "admin",
    coins: 0,
    status: "active",
    joined: "2025-01-01",
    campaigns_created: 0,
    subscriptions_made: 0,
    password: "admin123",
    username: "admin",
  },
];

let sampleCampaigns = [
  {
    id: 1,
    user_id: 1,
    channel_name: "Tech Reviews Daily",
    channel_url: "https://youtube.com/@techreviews",
    target_subscribers: 100,
    current_subscribers: 67,
    coins_used: 1000,
    status: "active",
    created: "2025-10-20",
  },
  {
    id: 2,
    user_id: 2,
    channel_name: "Cooking With Sarah",
    channel_url: "https://youtube.com/@cookingsarah",
    target_subscribers: 200,
    current_subscribers: 200,
    coins_used: 2000,
    status: "completed",
    created: "2025-10-10",
  },
  {
    id: 3,
    user_id: 1,
    channel_name: "Gaming Zone",
    channel_url: "https://youtube.com/@gamingzone",
    target_subscribers: 50,
    current_subscribers: 12,
    coins_used: 500,
    status: "paused",
    created: "2025-10-25",
  },
  {
    id: 4,
    user_id: 3,
    channel_name: "Fitness Journey",
    channel_url: "https://youtube.com/@fitnessjourney",
    target_subscribers: 150,
    current_subscribers: 0,
    coins_used: 0,
    status: "pending",
    created: "2025-10-26",
  },
];

const availableCampaigns = [
  {
    channel_name: "Travel Vlogs",
    channel_thumbnail: "🌍",
    coins_reward: 10,
    channel_url: "https://youtube.com/@travelvlogs",
  },
  {
    channel_name: "Music Covers",
    channel_thumbnail: "🎵",
    coins_reward: 10,
    channel_url: "https://youtube.com/@musiccovers",
  },
  {
    channel_name: "Comedy Sketches",
    channel_thumbnail: "😂",
    coins_reward: 10,
    channel_url: "https://youtube.com/@comedysketches",
  },
  {
    channel_name: "DIY Crafts",
    channel_thumbnail: "✂️",
    coins_reward: 10,
    channel_url: "https://youtube.com/@diycrafts",
  },
];

const coinSettings = {
  earn_per_subscription: 10,
  cost_per_subscriber: 10,
  daily_login_bonus: 5,
};

const coinTransactions = [
  {
    id: 1,
    user: "John Doe",
    type: "earned",
    amount: 10,
    balance_after: 450,
    date: "2025-10-26 14:30",
    description: "Subscribed to Travel Vlogs",
  },
  {
    id: 2,
    user: "John Doe",
    type: "spent",
    amount: -1000,
    balance_after: 440,
    date: "2025-10-20 09:15",
    description: "Created campaign: Tech Reviews Daily",
  },
  {
    id: 3,
    user: "Sarah Smith",
    type: "purchased",
    amount: 500,
    balance_after: 820,
    date: "2025-10-18 16:45",
    description: "Purchased 500 coins package",
  },
];

const adminStats = {
  total_users: 5,
  active_users: 4,
  total_campaigns: 4,
  active_campaigns: 2,
  total_revenue: 1247.5,
  coins_in_circulation: 1420,
  user_growth_last_30_days: [
    { date: "2025-09-27", users: 2 },
    { date: "2025-10-04", users: 2 },
    { date: "2025-10-11", users: 3 },
    { date: "2025-10-18", users: 4 },
    { date: "2025-10-25", users: 5 },
  ],
};

// ================= GLOBAL STATE =================
const state = {
  loggedInUser: null,
  adminLoggedIn: false,
};

// ================= UTILITIES =================
function $(selector) {
  return document.querySelector(selector);
}
function $all(selector) {
  return [...document.querySelectorAll(selector)];
}
function showView(viewId) {
  $all(".view").forEach((v) => v.classList.add("hidden"));
  $("#" + viewId).classList.remove("hidden");
}
function showToast(message, type = "success") {
  const toast = document.createElement("div");
  toast.className = `toast toast--${type}`;
  toast.textContent = message;
  $("#toast-container").appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

// ================= AUTH FUNCTIONS =================
function handleLogin(e) {
  e.preventDefault();
  const email = $("#login-email").value.trim();
  const password = $("#login-password").value;
  const user = sampleUsers.find((u) => u.email === email && u.password === password);
  if (user && user.role === "user") {
    state.loggedInUser = user;
    initDashboard();
    window.location.hash = "dashboard";
  } else {
    showToast("Invalid credentials", "error");
  }
}
function handleGoogleSignin() {
  // Simulate selecting first user
  state.loggedInUser = sampleUsers[0];
  initDashboard();
  window.location.hash = "dashboard";
}
function handleAdminLogin(e) {
  e.preventDefault();
  const username = $("#admin-user").value.trim();
  const password = $("#admin-pass").value;
  const admin = sampleUsers.find(
    (u) => u.username === username && u.password === password && u.role === "admin"
  );
  if (admin) {
    state.adminLoggedIn = true;
    initAdminDashboard();
    window.location.hash = "admin-dashboard";
  } else {
    showToast("Invalid admin credentials", "error");
  }
}
function logoutUser() {
  state.loggedInUser = null;
  window.location.hash = "login";
}
function logoutAdmin() {
  state.adminLoggedIn = false;
  window.location.hash = "admin-login";
}

// ================= DASHBOARD RENDERING =================
function initDashboard() {
  if (!state.loggedInUser) return;
  // Update navbar info
  $("#welcome-msg").textContent = `Welcome, ${state.loggedInUser.name}`;
  $("#coin-balance").textContent = `${state.loggedInUser.coins} coins`;

  // Stats cards content
  const stats = [
    {
      label: "Subscriptions Made",
      value: state.loggedInUser.subscriptions_made,
    },
    {
      label: "Campaigns Created",
      value: state.loggedInUser.campaigns_created,
    },
    {
      label: "Coins Earned",
      value: state.loggedInUser.coins,
    },
    {
      label: "Coins Spent",
      value: sampleCampaigns
        .filter((c) => c.user_id === state.loggedInUser.id)
        .reduce((sum, c) => sum + c.coins_used, 0),
    },
  ];
  const statsGrid = $("#stats-cards");
  statsGrid.innerHTML = "";
  stats.forEach((s) => {
    const div = document.createElement("div");
    div.className = "stat-card";
    div.innerHTML = `<span class="stat-value">${s.value}</span><span>${s.label}</span>`;
    statsGrid.appendChild(div);
  });

  // Available campaigns
  const availGrid = $("#available-campaigns");
  availGrid.innerHTML = "";
  availableCampaigns.forEach((c) => {
    const card = document.createElement("div");
    card.className = "campaign-card";
    card.innerHTML = `
      <div class="campaign-thumb">${c.channel_thumbnail}</div>
      <div class="campaign-card__body">
        <p class="campaign-name">${c.channel_name}</p>
        <p class="campaign-reward">+${c.coins_reward} coins</p>
        <button class="btn btn--primary btn--sm subscribe-btn" data-url="${c.channel_url}">
          Subscribe &amp; Earn
        </button>
      </div>`;
    availGrid.appendChild(card);
  });

  // My campaigns table
  renderMyCampaigns();
}
function renderMyCampaigns() {
  const tbody = $("#my-campaigns-table tbody");
  tbody.innerHTML = "";
  const userCampaigns = sampleCampaigns.filter((c) => c.user_id === state.loggedInUser.id);
  userCampaigns.forEach((c) => {
    const tr = document.createElement("tr");
    const progressPercent = Math.round((c.current_subscribers / c.target_subscribers) * 100);
    tr.innerHTML = `
      <td>${c.channel_name}</td>
      <td>${c.target_subscribers}</td>
      <td>${c.current_subscribers}</td>
      <td>
        <div style="width: 100px; background: var(--color-secondary); border-radius: 4px; overflow: hidden;">
          <div style="width:${progressPercent}%; background: var(--color-primary); height:6px"></div>
        </div>
      </td>
      <td><span class="status status--info">${c.status}</span></td>`;
    tbody.appendChild(tr);
  });
}

// ================= CAMPAIGN FORM =================
function updateCoinRequirement() {
  const count = parseInt($("#subscriber-slider").value, 10);
  $("#sub-count").textContent = count;
  const coinsNeeded = count * coinSettings.cost_per_subscriber;
  $("#coins-required").textContent = coinsNeeded;
  $("#create-campaign-btn").disabled = coinsNeeded > state.loggedInUser.coins;
}
function handleCreateCampaign(e) {
  e.preventDefault();
  const url = $("#channel-url").value.trim();
  const subsWanted = parseInt($("#subscriber-slider").value, 10);
  const coinsNeeded = subsWanted * coinSettings.cost_per_subscriber;
  if (coinsNeeded > state.loggedInUser.coins) {
    showToast("Insufficient coins", "error");
    return;
  }
  const newCampaign = {
    id: sampleCampaigns.length + 1,
    user_id: state.loggedInUser.id,
    channel_name: url.split("@")[1] || url,
    channel_url: url,
    target_subscribers: subsWanted,
    current_subscribers: 0,
    coins_used: coinsNeeded,
    status: "active",
    created: new Date().toISOString().split("T")[0],
  };
  sampleCampaigns.push(newCampaign);
  state.loggedInUser.campaigns_created += 1;
  state.loggedInUser.coins -= coinsNeeded;
  showToast("Campaign created", "success");
  updateCoinRequirement();
  initDashboard();
}

function handleSubscribeClick(e) {
  if (!e.target.classList.contains("subscribe-btn")) return;
  const url = e.target.dataset.url;
  window.open(url, "_blank");
  state.loggedInUser.coins += coinSettings.earn_per_subscription;
  state.loggedInUser.subscriptions_made += 1;
  showToast(`+${coinSettings.earn_per_subscription} coins added`, "success");
  initDashboard();
}

// ================= SETTINGS =================
function populateSettings() {
  $("#setting-name").value = state.loggedInUser.name;
  $("#setting-email").value = state.loggedInUser.email;
}
function handleSettingsSave(e) {
  e.preventDefault();
  state.loggedInUser.name = $("#setting-name").value.trim();
  state.loggedInUser.email = $("#setting-email").value.trim();
  showToast("Profile updated", "success");
  window.location.hash = "dashboard";
}

// ================= CHANGE PASSWORD =================
const passReq = {
  min_length: 8,
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  special: /[!@#$%^&*()_+\-=\[\]{}|;:',.<>?]/,
};
const passReqListEl = $("#pass-req-list");
const reqItems = [
  { key: "length", text: "At least 8 characters" },
  { key: "uppercase", text: "Contains uppercase letter" },
  { key: "lowercase", text: "Contains lowercase letter" },
  { key: "number", text: "Contains number" },
  { key: "special", text: "Contains special character" },
];
passReqListEl.innerHTML = reqItems
  .map((i) => `<li id="req-${i.key}">❌ ${i.text}</li>`)
  .join("");

function evaluatePassword() {
  const pwd = $("#new-pass").value;
  let passed = 0;
  if (pwd.length >= passReq.min_length) passed++;
  if (passReq.uppercase.test(pwd)) passed++;
  if (passReq.lowercase.test(pwd)) passed++;
  if (passReq.number.test(pwd)) passed++;
  if (passReq.special.test(pwd)) passed++;

  reqItems.forEach((i) => {
    const el = $(`#req-${i.key}`);
    const ok =
      i.key === "length"
        ? pwd.length >= passReq.min_length
        : passReq[i.key]?.test(pwd);
    el.textContent = `${ok ? "✅" : "❌"} ${i.text}`;
  });

  const strengthText = $("#strength-text");
  const bars = ["Weak", "Weak", "Medium", "Medium", "Strong", "Strong"];
  strengthText.textContent = pwd ? bars[passed] : "";
  strengthText.style.color = passed < 3 ? "var(--color-error)" : passed < 5 ? "var(--color-warning)" : "var(--color-success)";

  const match = pwd && pwd === $("#confirm-pass").value;
  $("#match-text").textContent = match ? "Passwords match" : pwd ? "Passwords do not match" : "";
  $("#match-text").style.color = match ? "var(--color-success)" : "var(--color-error)";

  $("#change-pass-btn").disabled = !(passed === 5 && match && $("#current-pass").value);
}

function handleChangePassword(e) {
  e.preventDefault();
  showToast("Password changed successfully", "success");
  setTimeout(() => {
    logoutUser();
  }, 2000);
}

// ================= ADMIN DASHBOARD =================
function initAdminDashboard() {
  // KPI cards
  const kpiData = [
    { label: "Total Users", value: adminStats.total_users },
    { label: "Active Users", value: adminStats.active_users },
    { label: "Total Campaigns", value: adminStats.total_campaigns },
    { label: "Active Campaigns", value: adminStats.active_campaigns },
    { label: "Total Revenue", value: `$${adminStats.total_revenue}` },
    { label: "Coins in Circulation", value: adminStats.coins_in_circulation },
  ];
  const kpiGrid = $("#admin-kpis");
  kpiGrid.innerHTML = "";
  kpiData.forEach((k) => {
    const div = document.createElement("div");
    div.className = "stat-card";
    div.innerHTML = `<span class="stat-value">${k.value}</span><span>${k.label}</span>`;
    kpiGrid.appendChild(div);
  });

  // Charts
  renderAdminCharts();
  // Tables
  renderAdminUsersTable();
  renderAdminCampaignsTable();
  renderTransactionTable();
  // Fill coin settings
  $("#earn-rate").value = coinSettings.earn_per_subscription;
  $("#cost-rate").value = coinSettings.cost_per_subscriber;
  $("#daily-bonus").value = coinSettings.daily_login_bonus;
}

function renderAdminCharts() {
  // User growth line chart
  const ctx1 = $("#user-growth-chart").getContext("2d");
  new Chart(ctx1, {
    type: "line",
    data: {
      labels: adminStats.user_growth_last_30_days.map((d) => d.date),
      datasets: [
        {
          label: "Users",
          data: adminStats.user_growth_last_30_days.map((d) => d.users),
          borderColor: "#1FB8CD",
          backgroundColor: "rgba(31,184,205,0.1)",
          tension: 0.3,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
    },
  });
  // Campaign performance bar chart
  const ctx2 = $("#campaign-bar-chart").getContext("2d");
  new Chart(ctx2, {
    type: "bar",
    data: {
      labels: ["Active", "Paused", "Completed", "Pending"],
      datasets: [
        {
          label: "Campaigns",
          data: [
            sampleCampaigns.filter((c) => c.status === "active").length,
            sampleCampaigns.filter((c) => c.status === "paused").length,
            sampleCampaigns.filter((c) => c.status === "completed").length,
            sampleCampaigns.filter((c) => c.status === "pending").length,
          ],
          backgroundColor: [
            "#1FB8CD",
            "#FFC185",
            "#B4413C",
            "#ECEBD5",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
    },
  });
}
function renderAdminUsersTable() {
  const tbody = $("#admin-users-table tbody");
  tbody.innerHTML = "";
  sampleUsers
    .filter((u) => u.role === "user")
    .forEach((u) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${u.id}</td>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.coins}</td>
        <td>${u.status}</td>
        <td>${u.joined}</td>
        <td><button class="btn btn--outline btn--sm" onclick="alert('View user ${u.id}')">View</button></td>`;
      tbody.appendChild(tr);
    });
}
function renderAdminCampaignsTable() {
  const tbody = $("#admin-campaigns-table tbody");
  tbody.innerHTML = "";
  sampleCampaigns.forEach((c) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.id}</td>
      <td>${c.user_id}</td>
      <td>${c.channel_name}</td>
      <td>${c.target_subscribers}</td>
      <td>${c.current_subscribers}</td>
      <td>${c.coins_used}</td>
      <td>${c.status}</td>
      <td>${c.created}</td>`;
    tbody.appendChild(tr);
  });
}
function renderTransactionTable() {
  const tbody = $("#transaction-table tbody");
  tbody.innerHTML = "";
  coinTransactions.forEach((t) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${t.id}</td>
      <td>${t.user}</td>
      <td>${t.type}</td>
      <td>${t.amount}</td>
      <td>${t.balance_after}</td>
      <td>${t.date}</td>
      <td>${t.description}</td>`;
    tbody.appendChild(tr);
  });
}

function handleCoinSettingsSave(e) {
  e.preventDefault();
  coinSettings.earn_per_subscription = parseInt($("#earn-rate").value, 10);
  coinSettings.cost_per_subscriber = parseInt($("#cost-rate").value, 10);
  coinSettings.daily_login_bonus = parseInt($("#daily-bonus").value, 10);
  showToast("Coin settings updated", "success");
}

// ================= EVENT LISTENERS =================
function addEventListeners() {
  $("#login-form").addEventListener("submit", handleLogin);
  $("#google-signin").addEventListener("click", handleGoogleSignin);
  $("#admin-login-form").addEventListener("submit", handleAdminLogin);
  $("#logout-btn").addEventListener("click", logoutUser);
  $("#admin-logout-btn").addEventListener("click", logoutAdmin);
  $("#subscriber-slider").addEventListener("input", updateCoinRequirement);
  $("#create-campaign-form").addEventListener("submit", handleCreateCampaign);
  $("#available-campaigns").addEventListener("click", handleSubscribeClick);
  $("#settings-form").addEventListener("submit", handleSettingsSave);
  $("#change-password-form").addEventListener("submit", handleChangePassword);
  $("#new-pass").addEventListener("input", evaluatePassword);
  $("#confirm-pass").addEventListener("input", evaluatePassword);
  $("#current-pass").addEventListener("input", evaluatePassword);
  $("#coin-settings-form").addEventListener("submit", handleCoinSettingsSave);

  // Profile dropdown
  $("#profile-btn").addEventListener("click", () => {
    $("#profile-menu").classList.toggle("hidden");
  });

  // Dropdown navigation buttons
  $all("[data-nav]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.nav;
      window.location.hash = target;
    });
  });

  // Admin sidebar navigation
  $all("[data-admin-page]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const page = btn.dataset.adminPage;
      $all(".admin-page").forEach((p) => p.classList.add("hidden"));
      $("#admin-page-" + page).classList.remove("hidden");
    });
  });

  // Hash change handling
  window.addEventListener("hashchange", handleHashChange);
}

// ================= ROUTING =================
function handleHashChange() {
  const hash = window.location.hash.replace("#", "") || "login";
  switch (hash) {
    case "login":
      showView("login-view");
      break;
    case "dashboard":
      if (state.loggedInUser) {
        showView("dashboard-view");
      } else {
        window.location.hash = "login";
      }
      break;
    case "settings":
      if (state.loggedInUser) {
        populateSettings();
        showView("settings-view");
      } else {
        window.location.hash = "login";
      }
      break;
    case "change-password":
      if (state.loggedInUser) {
        showView("change-password-view");
      } else {
        window.location.hash = "login";
      }
      break;
    case "admin-login":
      showView("admin-login-view");
      break;
    case "admin-dashboard":
      if (state.adminLoggedIn) {
        showView("admin-dashboard-view");
      } else {
        window.location.hash = "admin-login";
      }
      break;
    default:
      window.location.hash = "login";
  }
}

// ================= INIT =================
function init() {
  addEventListeners();
  handleHashChange();
  // Initialize coin requirement slider once
  updateCoinRequirement();
}

document.addEventListener("DOMContentLoaded", init);
