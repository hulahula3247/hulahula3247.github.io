/* Icon licenses are retained under assets/. */
(() => {
  "use strict";
  const i18n = window.siteI18n;
  let savedLanguage;
  try { savedLanguage = localStorage.getItem("homepage-language"); } catch { /* Storage can be blocked in private or file previews. */ }
  let language = i18n.resolveLanguage(new URLSearchParams(location.search).get("lang"), savedLanguage, navigator.language);
  let data = i18n.locales[language];
  let labels = i18n.strings[language];
  let filter = "selected";
  const icons = window.siteIcons;
  const brandIcons = window.siteBrandIcons;
  const escape = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const icon = name => brandIcons[name]
    ? `<svg class="icon brand-icon" data-brand-icon="${escape(name)}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="${escape(brandIcons[name])}"></path></svg>`
    : `<i data-icon="${escape(name)}"></i>`;
  const fill = (id, html) => { const element = document.getElementById(id); if (element) element.innerHTML = html; };
  const external = (url, label, name = "", newTab = true) => {
    const content = (name ? icon(name) : "") + escape(label);
    const attributes = name ? ` aria-label="${escape(label)}" title="${escape(label)}"` : "";
    return /^(https?:\/\/|mailto:)/i.test(url || "")
      ? `<a href="${escape(url)}"${attributes}${url.startsWith("mailto:") || !newTab ? "" : ' target="_blank" rel="noopener noreferrer"'}>${content}</a>`
      : `<span class="unavailable" aria-disabled="true" title="${escape(labels.noLink)}">${content}</span>`;
  };
  const authorHTML = (authors, role = "") => authors.map(author => author.replace(/\*/g, "").trim() === (data.profile.authorName || data.profile.name)
    ? `<strong>${escape(author)}</strong>${role ? ` <span class="author-role">(${escape(role)})</span>` : ""}` : escape(author)).join(", ");
  const timeline = entries => entries.map(entry => `<article class="timeline-entry"><div class="timeline-period">${escape(entry.period)}</div><div><h3>${escape(entry.title)}</h3>${entry.organization ? `<p class="timeline-organization">${escape(entry.organization)}</p>` : ""}${entry.detail ? `<p class="timeline-detail">${escape(entry.detail)}</p>` : ""}${entry.advisor ? `<p class="timeline-detail">${escape(entry.advisor)}</p>` : ""}</div></article>`).join("");
  const awardCount = count => (count === 1 ? labels.awardCountOne : labels.awardCountMany).replace("{count}", count);

  function acceptanceHTML(paper, inline = false) {
    if (!paper.acceptance) return "";
    const { accepted, submitted } = paper.acceptance;
    const rate = (100 * accepted / submitted).toFixed(1);
    const tag = inline ? "span" : "p";
    return `<${tag} class="paper-acceptance">${escape(labels.acceptanceRate)} ${rate}%</${tag}>`;
  }

  function venueHTML(paper, showYear = true) {
    const status = paper.status === "under-review" ? '<span class="paper-status">Under review</span>' : "";
    const venue = paper.venue ? `<strong class="paper-conference">${escape(paper.venue)}${showYear && paper.year ? ` ${escape(paper.year)}` : ""}</strong>` : "";
    return venue + status;
  }

  function publicationHTML(paper) {
    const project = data.researchDemos.find(project => project.paperId === paper.id);
    const paperLink = (url, label, name) => /^https?:\/\//i.test(url || "")
      ? `<a href="${escape(url)}" aria-label="${escape(label)}" title="${escape(label)}" target="_blank" rel="noopener noreferrer">${icon(name)}<span>${escape(label)}</span></a>` : "";
    const links = [
      paper.url ? paperLink(paper.url, `${labels.paperLink}${paper.urlLabel ? ` (${paper.urlLabel})` : ""}`, "file-text") : "",
      paper.pdf ? paperLink(paper.pdf, "PDF", "file-text") : "",
      paper.code ? paperLink(paper.code, "GitHub", "github") : "",
      paper.project ? paperLink(paper.project, labels.paperProject, "arrow-up-right") : ""
    ].join("");
    const authors = paper.authors.length ? `<p class="paper-authors">${authorHTML(paper.authors, paper.type)}</p>` : "";
    const role = paper.authors.length ? "" : `<span class="paper-type">${escape(paper.type)}</span>`;
    const actions = links ? `<div class="paper-actions">${links}</div>` : "";
    const description = !paper.authors.length && paper.description ? `<p class="paper-description">${escape(paper.description)}</p>` : "";
    const title = paper.url ? external(paper.url, paper.title) : escape(paper.title);
    const year = paper.year ? `<span class="paper-year">${escape(paper.year)}</span>` : '<span class="paper-year" aria-hidden="true"></span>';
    const footer = `<div class="paper-footer"><p class="paper-venue">${venueHTML(paper, false)}${acceptanceHTML(paper, true)}${role}</p>${actions}</div>`;
    return `<article class="publication" id="${escape(paper.id)}" data-selected="${Boolean(paper.selected)}">${year}<div class="paper-main"><div class="paper-overview"><div class="paper-body"><h3>${title}</h3>${authors}${footer}${description}</div></div>${project ? demoHTML(project) : ""}</div></article>`;
  }

  function renderAwards(compact) {
    const titleTag = compact ? "h4" : "h3";
    const archiveOpen = Boolean(document.querySelector("#awards-list details[data-award-archive]")?.open);
    const sorted = [...data.awards].sort((a, b) => b.date.localeCompare(a.date));
    const featured = compact ? sorted.filter(award => award.featured) : [];
    const awardList = (awards, tag) => `<ul class="award-entries">${awards.map(award => `<li class="award-entry" data-award-id="${escape(award.id)}"><time datetime="${escape(award.date)}">${escape(award.date.replace("-", "."))}</time><div><${tag}>${escape(award.event || award.title)}${award.localName ? ` <span class="award-local-name">${escape(award.localName)}</span>` : ""}</${tag}><p>${award.event ? `<span class="award-result${award.placement === 1 ? " award-result-first" : ""}">${escape(award.title)}</span>${award.organization ? ", " : ""}` : ""}${escape(award.organization)}</p></div></li>`).join("")}</ul>`;
    const highlights = featured.length ? `<div class="featured-awards" aria-labelledby="featured-awards-title"><h3 class="award-group-title" id="featured-awards-title">${escape(labels.featuredAwards)}</h3>${awardList(featured, "h4")}</div>` : "";
    const list = awardList(sorted, titleTag);
    if (!compact) return list;
    const programming = `<div class="competitive-programming" aria-label="${escape(labels.competitiveProgramming)}"><p class="competitive-intro">${escape(data.competitiveProgrammingIntro)}</p><ul class="competitive-profiles">${data.competitiveProgramming.map(profile => {
      const rank = profile.rank ? `<strong>${escape(profile.rank)}</strong>` : "";
      const rating = profile.maxRating ? `${rank ? " / " : ""}${escape(labels.peakRating)} <strong>${escape(profile.maxRating)}</strong>` : "";
      const category = profile.category ? `<span class="competitive-category">(${escape(profile.category)})</span>` : "";
      const platformIcon = profile.iconImage ? `<img src="${escape(profile.iconImage)}" class="platform-logo" alt="" width="18" height="18">` : icon(profile.icon);
      return `<li data-platform="${escape(profile.platform)}"><a class="competitive-profile" href="${escape(profile.url)}" target="_blank" rel="noopener noreferrer"><span class="competitive-platform"><span class="competitive-platform-name">${platformIcon}${escape(profile.platform)}</span>${category}</span><span class="competitive-account"><span class="competitive-handle">${escape(profile.handle)}</span><span class="competitive-rating">${rank}${rating}</span>${icon("arrow-up-right")}</span></a></li>`;
    }).join("")}</ul></div>`;
    const heading = `<span class="award-archive-label">${escape(labels.allAwards)}</span><span class="award-archive-count">${escape(awardCount(sorted.length))}</span>`;
    return programming + highlights + `<details class="award-archive" data-award-archive${archiveOpen ? " open" : ""}><summary>${heading}${icon("chevron-down")}</summary>${list}</details>`;
  }

  function demoHTML(demo) {
    const overviewOpen = Boolean(document.querySelector(`details[data-paper-details="${demo.paperId}"]`)?.open);
    const figure = `<figure class="project-figure"><a href="${escape(demo.figure.src)}" target="_blank" rel="noopener noreferrer"><img src="${escape(demo.figure.src)}" alt="${escape(demo.figure.alt)}" width="${demo.figure.width}" height="${demo.figure.height}" loading="lazy"></a><figcaption>Overview of ${escape(demo.title)}</figcaption></figure>`;
    const description = demo.summary.split("\n\n").map(paragraph => `<p class="project-summary">${escape(paragraph)}</p>`).join("");
    return `<details class="paper-details" data-paper-details="${escape(demo.paperId)}"${overviewOpen ? " open" : ""}><summary>${escape(labels.paperDetails)}${icon("chevron-down")}</summary><div class="paper-detail-content" id="${escape(demo.id)}">${figure}${description}</div></details>`;
  }

  function videoHTML(demo) {
    const detailsOpen = Boolean(document.querySelector(`details[data-demo-details="${demo.id}"]`)?.open);
    const videos = demo.videos.map(video => {
      const source = escape(video.url);
      const fallback = /^\.\/assets\/[a-z0-9-]+\.mp4$/i.test(video.url)
        ? `<a href="${source}">${escape(labels.videoFallback)}</a>`
        : external(video.url, labels.videoFallback);
      return `<figure class="demo-video"><video controls muted loop playsinline preload="metadata" aria-label="${escape(`${demo.title}: ${video.label}`)}"><source src="${source}" type="video/mp4">${fallback}</video><figcaption>${escape(video.label)}</figcaption></figure>`;
    }).join("");
    const description = demo.videoDescription ? `<p class="demo-description">${escape(demo.videoDescription)}</p>` : "";
    return `<article class="research-video" id="${escape(demo.id)}-video"><h3>${escape(demo.videoTitle || demo.title)}</h3><div class="demo-videos">${videos}</div><p class="demo-specs demo-overview"><span><strong>${escape(demo.speedup)}&times; speedup</strong> in ${escape(demo.software)} (Model: ${escape(demo.model)})</span></p><details class="demo-details" data-demo-details="${escape(demo.id)}"${detailsOpen ? " open" : ""}><summary>${escape(labels.demoDetails)}${icon("chevron-down")}</summary>${description}<p class="demo-specs"><span>[HW] ${escape(demo.hardware)}</span><span>[SW] ${escape(demo.software)}</span></p><p class="demo-specs"><span>[Acceleration] [FFN]: ${escape(demo.ffn)}</span><span>[Attention]: ${escape(demo.attention)}</span></p></details></article>`;
  }

  function renderIcons() {
    document.querySelectorAll("i[data-icon]").forEach(element => {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      for (const [key, value] of Object.entries({ viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "1.7", "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true", class: "icon" })) svg.setAttribute(key, value);
      svg.innerHTML = icons[element.dataset.icon] || icons.link;
      element.replaceWith(svg);
    });
  }

  function renderThemeToggle() {
    const dark = window.siteTheme?.current === "dark";
    document.querySelectorAll("[data-theme-toggle]").forEach(button => {
      const label = dark ? labels.lightMode : labels.darkMode;
      if (!button.dataset.themeToggleReady) {
        button.innerHTML = `<span class="theme-toggle-orbit" aria-hidden="true"><span class="theme-toggle-sun">${icon("sun")}</span><span class="theme-toggle-moon">${icon("moon")}</span></span>`;
        button.dataset.themeToggleReady = "true";
      }
      button.title = label;
      button.setAttribute("aria-label", label);
      button.setAttribute("aria-pressed", String(dark));
    });
  }

  function applyFilter() {
    document.querySelectorAll("[data-filter]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.filter === filter)));
    document.querySelectorAll(".publication").forEach(paper => { paper.hidden = filter === "selected" && paper.dataset.selected !== "true"; });
  }

  function setLanguageMenuOpen(switcher, open) {
    switcher.querySelector("[data-language-menu]").hidden = !open;
    switcher.querySelector("[data-language-trigger]").setAttribute("aria-expanded", String(open));
  }

  function closeLanguageMenus() {
    document.querySelectorAll(".language-switch").forEach(switcher => setLanguageMenuOpen(switcher, false));
  }

  function renderPage() {
    data = i18n.locales[language];
    labels = i18n.strings[language];
    const publications = [...data.publications].sort((a, b) => (Number(a.year) || Infinity) - (Number(b.year) || Infinity));
    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n]").forEach(element => { element.textContent = labels[element.dataset.i18n]; });
    document.querySelectorAll("[data-i18n-aria]").forEach(element => element.setAttribute("aria-label", labels[element.dataset.i18nAria]));
    document.querySelectorAll("[data-i18n-title]").forEach(element => { element.title = labels[element.dataset.i18nTitle]; });
    document.querySelectorAll("[data-profile-name]").forEach(element => { element.textContent = data.profile.name; });
    document.querySelectorAll("[data-year]").forEach(element => { element.textContent = new Date().getFullYear(); });
    document.querySelectorAll("[data-language]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.language === language)));
    document.querySelectorAll("[data-language-current]").forEach(element => { element.textContent = language.toUpperCase(); });
    document.title = document.body.dataset.page === "cv"
      ? `${data.profile.name} | ${labels.cvDocumentTitle}`
      : i18n.locales.en.profile.name;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.content = `${data.profile.name} - ${labels.metaDescription}`;
    try { localStorage.setItem("homepage-language", language); } catch { /* Switching still works without persistence. */ }

    if (document.body.dataset.page === "cv") {
      const profile = data.profile;
      fill("cv-profile", `<h1>${escape(profile.name)}</h1><p>${escape(profile.role)}<br>${escape(profile.researchFocus)}</p>`);
      fill("cv-summary", data.biography.map(paragraph => `<p>${escape(paragraph)}</p>`).join(""));
      fill("cv-education", timeline(data.education));
      fill("cv-awards", renderAwards(false));
      fill("cv-publications", publications.map(paper => `<article class="cv-paper"><h3>${escape(paper.title)}</h3><p>${escape(paper.type)}${paper.authors.length ? `<br>${authorHTML(paper.authors)}` : ""}</p><p class="paper-venue">${venueHTML(paper)}</p>${!paper.authors.length && paper.description ? `<p class="paper-description">${escape(paper.description)}</p>` : ""}${acceptanceHTML(paper)}</article>`).join(""));
      fill("cv-skills", data.skills.map(skill => `<li>${escape(skill)}</li>`).join(""));
      document.getElementById("cv-skills").closest("section").hidden = data.skills.length === 0;
    } else {
      const profile = data.profile;
      const contact = [
        [profile.github, "GitHub", "github"],
        [profile.scholar, labels.scholar, "googlescholar"],
        [profile.orcid, "ORCID", "orcid"]
      ].filter(([url]) => Boolean(url));
      const email = profile.email ? `<li class="profile-link profile-email">${external(`mailto:${profile.email}`, profile.email, "mail")}</li>` : "";
      fill("profile", `<div class="profile-top"><div class="profile-photo"><img src="${escape(profile.photo)}" alt="${escape(profile.photoAlt)}" width="512" height="512"></div><div><h1>${escape(profile.name)}</h1><p class="profile-role">${escape(profile.role)}</p><p class="profile-location">${icon("map-pin")}${escape(profile.location)}</p></div></div><ul class="profile-links">${email}${contact.map(([url, label, name]) => `<li class="profile-link">${external(url, label, name, false)}</li>`).join("")}</ul>`);
      fill("biography", data.biography.map(paragraph => `<p>${escape(paragraph)}</p>`).join(""));
      fill("research-list", data.research.map(item => `<li><strong>${escape(item.title)}</strong>${item.description ? `<p class="research-description">${escape(item.description)}</p>` : ""}</li>`).join(""));
      fill("publication-list", publications.map(publicationHTML).join(""));
      fill("demo-list", data.researchDemos.filter(demo => demo.videos?.length).map(videoHTML).join(""));
      document.querySelector(".publication-filter").hidden = data.publications.every(paper => paper.selected);
      document.querySelector(".publication-footnote").hidden = !data.publications.some(paper => paper.authors.some(author => author.includes("*")));
      fill("awards-list", renderAwards(true));
      fill("education-list", timeline(data.education));

      applyFilter();
    }
    document.querySelectorAll("[data-local-page]").forEach(link => { link.href = `./${link.dataset.localPage}?lang=${language}`; });
    const updated = document.getElementById("updated-at");
    if (updated) updated.textContent = `${labels.updated} ${data.updated}`;
    renderThemeToggle();
    renderIcons();
  }

  document.querySelectorAll("[data-theme-toggle]").forEach(button => button.addEventListener("click", () => {
    window.siteTheme.toggle();
    renderThemeToggle();
    renderIcons();
  }));
  window.addEventListener("site-theme-change", () => {
    renderThemeToggle();
    renderIcons();
  });

  document.querySelectorAll(".language-switch").forEach(switcher => {
    const trigger = switcher.querySelector("[data-language-trigger]");
    const choices = [...switcher.querySelectorAll("[data-language]")];
    setLanguageMenuOpen(switcher, false);
    switcher.addEventListener("pointerenter", event => {
      if (event.pointerType !== "mouse") return;
      switcher.dataset.languageHover = "true";
      setLanguageMenuOpen(switcher, true);
    });
    switcher.addEventListener("pointerleave", event => {
      if (event.pointerType !== "mouse") return;
      switcher.dataset.languageHover = "false";
      setLanguageMenuOpen(switcher, false);
    });
    trigger.addEventListener("click", () => {
      setLanguageMenuOpen(switcher, switcher.dataset.languageHover === "true" || trigger.getAttribute("aria-expanded") !== "true");
    });
    trigger.addEventListener("keydown", event => {
      if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
      event.preventDefault();
      setLanguageMenuOpen(switcher, true);
      choices[event.key === "ArrowUp" ? choices.length - 1 : 0].focus();
    });
    switcher.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        event.preventDefault();
        setLanguageMenuOpen(switcher, false);
        trigger.focus();
      } else if (event.target !== trigger && ["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
        event.preventDefault();
        const index = choices.indexOf(document.activeElement);
        const next = event.key === "Home" ? 0 : event.key === "End" ? choices.length - 1 : (index + (event.key === "ArrowDown" ? 1 : -1) + choices.length) % choices.length;
        choices[next].focus();
      }
    });
    switcher.addEventListener("focusout", event => {
      if (!switcher.contains(event.relatedTarget)) setLanguageMenuOpen(switcher, false);
    });
  });
  document.addEventListener("pointerdown", event => {
    if (!event.target.closest(".language-switch")) closeLanguageMenus();
  });

  document.querySelectorAll("[data-language]").forEach(button => button.addEventListener("click", () => {
    closeLanguageMenus();
    button.closest(".language-switch").querySelector("[data-language-trigger]").focus();
    if (button.dataset.language === language) return;
    language = button.dataset.language;
    renderPage();
    try {
      const url = new URL(location.href);
      url.searchParams.set("lang", language);
      history.replaceState(null, "", url);
    } catch { /* Some local-file browsers disallow history updates. */ }
    document.getElementById("language-status").textContent = labels.languageChanged;
  }));

  if (document.body.dataset.page === "cv") {
    document.getElementById("print-cv").addEventListener("click", () => window.print());
  } else {

    document.querySelectorAll("[data-filter]").forEach(button => button.addEventListener("click", () => {
      filter = button.dataset.filter;
      applyFilter();
    }));

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          document.querySelectorAll(".main-nav a").forEach(link => {
            if (link.hash === `#${entry.target.id}`) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        }
      }, { rootMargin: "-100px 0px -55% 0px", threshold: 0 });
      document.querySelectorAll("#about, #publications, #awards").forEach(section => observer.observe(section));
    }
  }
  renderPage();
})();
