(function () {
  "use strict";

  // Global owner profile for all app policies.
  const GLOBAL_PROFILE = Object.freeze({
    developerName: "Urmin Hirpara",
    baseContactEmail: "urmin.org@gmail.com"
  });

  window.PRIVACY_GLOBAL = GLOBAL_PROFILE;

  const config = window.APP_CONFIG || {};
  const appName = config.appName || "My App";
  const developer = config.developer || GLOBAL_PROFILE.developerName;
  const contactEmail = config.contactEmail || buildAliasEmail(config.contactAlias || slugify(appName));
  const lastUpdated = config.lastUpdated || new Date().toISOString().slice(0, 10);
  const homeHref = config.homeHref || "../";

  document.title = appName + " Privacy Policy";
  setMetaByName("description", "Privacy policy for " + appName + " by " + developer + ".");
  setMetaByProperty("og:title", appName + " Privacy Policy");
  setMetaByProperty("og:description", "Read the privacy policy for " + appName + ".");
  setMetaByProperty("og:type", "website");
  setMetaByProperty("og:url", window.location.href);

  const policyRoot = document.querySelector("[data-policy-root]");
  const policyContent = document.querySelector("[data-policy-content]");

  if (!policyRoot || !policyContent) {
    return;
  }

  const header = document.createElement("header");
  header.className = "policy-header";

  const backLink = document.createElement("a");
  backLink.className = "back-link";
  backLink.href = homeHref;
  backLink.textContent = "\u2190 Back to all apps";

  const title = document.createElement("h1");
  title.textContent = appName + " Privacy Policy";

  const metaGrid = document.createElement("dl");
  metaGrid.className = "meta-grid";

  appendMeta(metaGrid, "App", appName, false);
  appendMeta(metaGrid, "Developer", developer, false);
  appendMeta(metaGrid, "Contact", contactEmail, true);
  appendMeta(metaGrid, "Last updated", formatDate(lastUpdated), false);

  header.appendChild(backLink);
  header.appendChild(title);
  header.appendChild(metaGrid);

  const footer = document.createElement("footer");
  footer.className = "site-footer";

  const footerText = document.createElement("p");
  footerText.textContent = "\u00A9 " + new Date().getFullYear() + " " + developer + ". Contact: ";

  const mailLink = document.createElement("a");
  mailLink.href = "mailto:" + contactEmail;
  mailLink.textContent = contactEmail;

  footerText.appendChild(mailLink);
  footer.appendChild(footerText);

  policyRoot.insertBefore(header, policyRoot.firstChild);
  policyRoot.appendChild(footer);

  function appendMeta(container, label, value, asEmail) {
    const term = document.createElement("dt");
    term.textContent = label;

    const detail = document.createElement("dd");
    if (asEmail) {
      const link = document.createElement("a");
      link.href = "mailto:" + value;
      link.textContent = value;
      detail.appendChild(link);
    } else {
      detail.textContent = value;
    }

    container.appendChild(term);
    container.appendChild(detail);
  }

  function buildAliasEmail(alias) {
    const parts = GLOBAL_PROFILE.baseContactEmail.split("@");
    if (parts.length !== 2) {
      return GLOBAL_PROFILE.baseContactEmail;
    }

    const cleanAlias = String(alias || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!cleanAlias) {
      return GLOBAL_PROFILE.baseContactEmail;
    }

    return parts[0] + "+" + cleanAlias + "@" + parts[1];
  }

  function slugify(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function formatDate(rawDate) {
    const parsed = new Date(rawDate + "T00:00:00");
    if (Number.isNaN(parsed.getTime())) {
      return rawDate;
    }

    return parsed.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  function setMetaByName(name, content) {
    let tag = document.querySelector('meta[name="' + name + '"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", name);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  }

  function setMetaByProperty(property, content) {
    let tag = document.querySelector('meta[property="' + property + '"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("property", property);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  }
})();
