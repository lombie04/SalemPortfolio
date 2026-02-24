const PROJECTS = [
  {
    title: "Meal Forecasting & Stock Management (Django)",
    description:
      "End-to-end web app for forecasting meals, tracking stock items, and producing manager/accounting dashboards. Built for real operational workflows.",
    tags: ["Django", "SQLite", "Dashboards", "Inventory"],
    impact: [
      "Role-based dashboards (Chef/Manager/Accounts/Audit)",
      "Stock issuance + forecasting flow designed for traceability",
      "Deployment-ready structure (GitHub + hosting)"
    ],
    links: [
      { label: "Repo", href: "#", note: "Add your GitHub repo link" },
      { label: "Case Study", href: "#", note: "Optional: write a 1-page case study" }
    ]
  },
  {
    title: "Shrinkage Prevention Thesis (ARIMA + Isolation Forest)",
    description:
      "Capstone research: forecast consumption and flag anomalies to reduce inventory shrinkage in Zimbabwean hospitality contexts.",
    tags: ["Python", "ARIMA", "Isolation Forest", "Research"],
    impact: [
      "Clear variable design + defensible methodology",
      "Model evaluation with decision-friendly reporting",
      "Ethics + auditability built into the narrative"
    ],
    links: [
      { label: "Summary", href: "#", note: "Add a public PDF summary (no sensitive data)" }
    ]
  },
  {
    title: "Operations Reporting (Excel/Power Query)",
    description:
      "Practical reporting workflows to track capacity, attendance, and interval-level coverage — optimized for fast refreshes and consistent definitions.",
    tags: ["Excel", "Power Query", "Data Quality"],
    impact: [
      "Repeatable refresh pipeline for monthly updates",
      "Reduced manual copy/paste risk with structured tables",
      "Clear metrics and validation checks"
    ],
    links: [
      { label: "Screenshots", href: "#", note: "Add anonymized screenshots" }
    ]
  }
];

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else node.setAttribute(k, String(v));
  }
  for (const child of children) {
    if (typeof child === "string") node.appendChild(document.createTextNode(child));
    else if (child) node.appendChild(child);
  }
  return node;
}

function renderProjects() {
  const grid = document.getElementById("projectGrid");
  if (!grid) return;

  grid.innerHTML = "";

  for (const p of PROJECTS) {
    const tagRow = el("div", { class: "tagrow" }, p.tags.map(t => el("span", { class: "tag" }, [t])));

    const impactList = el(
      "ul",
      { class: "bullets" },
      (p.impact || []).map(i => el("li", {}, [i]))
    );

    const links = el(
      "div",
      { class: "links" },
      (p.links || []).map(l => {
        const a = el("a", { class: "btn btn-ghost", href: l.href, target: l.href.startsWith("http") ? "_blank" : "_self", rel: "noopener noreferrer" }, [l.label]);
        if (l.href === "#") {
          a.setAttribute("aria-disabled", "true");
          a.addEventListener("click", (e) => e.preventDefault());
          a.title = l.note || "Update this link";
        }
        return a;
      })
    );

    const card = el("article", { class: "card project" }, [
      tagRow,
      el("h3", {}, [p.title]),
      el("p", {}, [p.description]),
      impactList,
      el("p", { class: "meta" }, ["Tip: add 1–2 metrics (time saved, error reduced, speed improved)."]),
      links
    ]);

    grid.appendChild(card);
  }
}

function setupTheme() {
  const btn = document.getElementById("themeToggle");
  if (!btn) return;

  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    document.documentElement.setAttribute("data-theme", saved);
  }

  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });
}

function setupNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.getElementById("navlinks");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
}

function setupMailtoHelper() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", () => {
    // Nothing fancy — mailto handles it. This keeps the site backend-free.
  });
}

renderProjects();
setupTheme();
setupNav();
setupYear();
setupMailtoHelper();
