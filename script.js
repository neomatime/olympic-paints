/* ================================================================
   OLYMPIC PAINTS — Script
   Hero carousel, scroll reveals, product filters, counters
   ================================================================ */

document.documentElement.classList.add("js");

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector(".menu-toggle");
const slides = [...document.querySelectorAll("[data-slide]")];
const dots = [...document.querySelectorAll("[data-dot]")];
const revealItems = [...document.querySelectorAll(".reveal")];
const contactForm = document.querySelector(".contact-form");
const atlasOptions = [...document.querySelectorAll("[data-atlas-choice]")];
const atlasInput = document.querySelector("[data-atlas-input]");
const atlasSend = document.querySelector("[data-atlas-send]");
const atlasResponse = document.querySelector("[data-atlas-response]");
const atlasFollowup = document.querySelector("[data-atlas-followup]");
const atlasVoice = document.querySelector("[data-atlas-voice]");
const atlasVoiceStatus = document.querySelector("[data-atlas-voice-status]");
const atlasSpeakToggle = document.querySelector("[data-atlas-speak-toggle]");
const themeTabs = [...document.querySelectorAll("[data-theme-filter]")];
const paintChips = [...document.querySelectorAll(".paint-chip")];
const paletteSlots = [...document.querySelectorAll(".palette-slot")];
const clearPaletteButton = document.querySelector("[data-clear-palette]");
const copyPaletteButton = document.querySelector("[data-copy-palette]");
const downloadPaletteButton = document.querySelector("[data-download-palette]");
const paletteStatus = document.querySelector("[data-palette-status]");
const designCarousel = document.querySelector("[data-design-carousel]");
const discoverySection = document.querySelector("[data-discovery-section]");
let activeSlide = 0;
let timer;
let customPalette = [];
let atlasVoiceEnabled = true;
let atlasRecognition;

/* --- Header scroll state -------------------------------------- */
function setHeaderState() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

/* --- Hero carousel -------------------------------------------- */
function setSlide(index) {
  if (!slides.length) return;
  activeSlide = index;
  slides.forEach((s, i) => s.classList.toggle("is-active", i === activeSlide));
  dots.forEach((d, i) => d.classList.toggle("is-active", i === activeSlide));
}

function startSlides() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || slides.length < 2) return;
  timer = setInterval(() => setSlide((activeSlide + 1) % slides.length), 5600);
}

/* --- Mobile menu ---------------------------------------------- */
menuToggle?.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("nav-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

/* --- Hero dots ------------------------------------------------ */
dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    clearInterval(timer);
    setSlide(Number(dot.dataset.dot));
    startSlides();
  });
});

/* --- Active nav link ------------------------------------------ */
document.querySelectorAll(".nav-group a").forEach((link) => {
  const href = link.getAttribute("href");
  const current = window.location.pathname.split("/").pop() || "index.html";
  if (href === current) {
    link.setAttribute("aria-current", "page");
  }

  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

/* --- Contact form --------------------------------------------- */
contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const note = document.createElement("p");
  note.className = "form-note";
  note.textContent = "Thank you. The Olympic Paints team will guide your next step.";
  contactForm.replaceChildren(note);
});

function sendAtlasMessage(value) {
  const message = value.trim();
  if (!message || !atlasResponse || !atlasFollowup) return;
  const reply = "Beautiful. Next I will ask about your light, style direction, surfaces, timeline and location, then help book the right Colour Cafe or virtual consultation.";
  atlasResponse.textContent = message;
  atlasResponse.style.display = "block";
  atlasFollowup.textContent = reply;
  atlasFollowup.style.display = "block";
  if (atlasInput) atlasInput.value = "";
  speakAtlas(reply);
}

function setAtlasVoiceStatus(message) {
  if (atlasVoiceStatus) atlasVoiceStatus.textContent = message;
}

function speakAtlas(message) {
  if (!atlasVoiceEnabled || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "en-ZA";
  utterance.rate = 0.96;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function initAtlasVoice() {
  if (!atlasVoice) return;
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    atlasVoice.disabled = true;
    atlasVoice.setAttribute("aria-disabled", "true");
    setAtlasVoiceStatus("Voice input is not supported in this browser. You can still type to Atlas.");
    return;
  }

  atlasVoice.disabled = false;
  atlasVoice.removeAttribute("aria-disabled");
  setAtlasVoiceStatus("Tap the microphone and tell Atlas what you want to transform.");

  atlasRecognition = new SpeechRecognition();
  atlasRecognition.lang = "en-ZA";
  atlasRecognition.interimResults = false;
  atlasRecognition.continuous = false;

  atlasRecognition.addEventListener("start", () => {
    atlasVoice.classList.add("is-listening");
    atlasVoice.setAttribute("aria-pressed", "true");
    setAtlasVoiceStatus("Atlas is listening...");
  });

  atlasRecognition.addEventListener("result", (event) => {
    const transcript = event.results?.[0]?.[0]?.transcript || "";
    if (atlasInput) atlasInput.value = transcript;
    setAtlasVoiceStatus(transcript ? "Voice captured. Sending it to Atlas." : "I could not hear that clearly.");
    if (transcript) sendAtlasMessage(transcript);
  });

  atlasRecognition.addEventListener("error", () => {
    setAtlasVoiceStatus("Atlas could not access the microphone. You can type your project instead.");
  });

  atlasRecognition.addEventListener("end", () => {
    atlasVoice.classList.remove("is-listening");
    atlasVoice.setAttribute("aria-pressed", "false");
  });

  atlasVoice.addEventListener("click", () => {
    try {
      atlasRecognition.start();
    } catch (error) {
      atlasRecognition.stop();
    }
  });
}

atlasSpeakToggle?.addEventListener("click", () => {
  atlasVoiceEnabled = !atlasVoiceEnabled;
  atlasSpeakToggle.setAttribute("aria-pressed", String(atlasVoiceEnabled));
  atlasSpeakToggle.textContent = atlasVoiceEnabled ? "Atlas voice on" : "Atlas voice off";
  if (!atlasVoiceEnabled && "speechSynthesis" in window) window.speechSynthesis.cancel();
  setAtlasVoiceStatus(atlasVoiceEnabled ? "Atlas will speak responses out loud." : "Atlas voice is muted.");
});

atlasOptions.forEach((option) => {
  option.addEventListener("click", () => sendAtlasMessage(option.dataset.atlasChoice || option.textContent));
});

atlasSend?.addEventListener("click", () => sendAtlasMessage(atlasInput?.value || "I would like to book a consultation"));
atlasInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    sendAtlasMessage(atlasInput.value);
  }
});

/* --- Scroll reveal (IntersectionObserver) --------------------- */
const observer = "IntersectionObserver" in window
  ? new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    )
  : null;

revealItems.forEach((item) => {
  if (observer) observer.observe(item);
  else item.classList.add("is-visible");
});

/* --- Animated counters ---------------------------------------- */
function animateCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const duration = 2000;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 4);
          const current = Math.floor(eased * target);
          const formatted = current.toLocaleString();

          // Preserve any suffix like "+" or inner elements
          const accent = el.querySelector(".accent");
          if (target <= 100) {
            el.innerHTML = `<span class="accent">${formatted}</span>+`;
          } else {
            el.innerHTML = `${formatted}<span class="accent">+</span>`;
          }

          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((c) => counterObserver.observe(c));
}

/* --- Product filter ------------------------------------------- */
function initProductFilters() {
  const chips = document.querySelectorAll("[data-filter]");
  const cards = document.querySelectorAll("[data-category]");
  const jumps = document.querySelectorAll("[data-filter-jump]");
  if (!chips.length || !cards.length) return;

  function applyFilter(filter) {
    chips.forEach((c) => c.classList.toggle("is-active", c.dataset.filter === filter));

    cards.forEach((card) => {
      const match = filter === "all" || card.dataset.category === filter;
      card.style.display = match ? "" : "none";

      if (match) {
        card.classList.remove("is-visible");
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            card.classList.add("is-visible");
          });
        });
      }
    });
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      applyFilter(chip.dataset.filter);
    });
  });

  jumps.forEach((jump) => {
    jump.addEventListener("click", () => {
      applyFilter(jump.dataset.filterJump);
    });
  });
}

/* --- Colour palette builder ----------------------------------- */
function renderCustomPalette() {
  paletteSlots.forEach((slot, index) => {
    const colour = customPalette[index];
    slot.classList.toggle("is-empty", !colour);
    slot.style.setProperty("--slot", colour ? colour.hex : "#fff");
    const label = slot.querySelector("small");
    if (label) label.textContent = colour ? colour.name : "Choose";
  });

  paintChips.forEach((chip) => {
    chip.classList.toggle("is-selected", customPalette.some((colour) => colour.hex === chip.dataset.hex));
  });

  if (paletteStatus) paletteStatus.textContent = "";
}

function setPaletteStatus(message) {
  if (!paletteStatus) return;
  paletteStatus.textContent = message;
}

function paletteText() {
  return customPalette.map((colour) => `${colour.name} ${colour.hex}`).join("\n");
}

function escapePdfText(text) {
  return String(text).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function hexToPdfRgb(hex) {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16) / 255;
  const g = parseInt(value.slice(2, 4), 16) / 255;
  const b = parseInt(value.slice(4, 6), 16) / 255;
  return `${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)}`;
}

/* Render the logo coin (yellow circle + logo) to JPEG bytes for the PDF */
let logoJpegPromise;

function getLogoJpeg() {
  if (!logoJpegPromise) {
    logoJpegPromise = new Promise((resolve) => {
      const img = new Image();

      img.onload = () => {
        try {
          const size = 256;
          const canvas = document.createElement("canvas");
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext("2d");

          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, size, size);
          ctx.fillStyle = "#FBC70F";
          ctx.beginPath();
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
          ctx.fill();

          // Oversize the coin artwork so the wordmark reads large,
          // clipped to the circle so corners stay clean
          ctx.save();
          ctx.clip();
          const zoom = size * 0.12;
          ctx.drawImage(img, -zoom, -zoom, size + zoom * 2, size + zoom * 2);
          ctx.restore();

          const base64 = canvas.toDataURL("image/jpeg", 0.92).split(",")[1];
          const binary = atob(base64);
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);

          resolve({ bytes, width: size, height: size });
        } catch (error) {
          resolve(null);
        }
      };

      img.onerror = () => resolve(null);
      img.src = "assests/images/logo.png";
    });
  }

  return logoJpegPromise;
}

function pdfTextBytes(text) {
  const bytes = new Uint8Array(text.length);
  for (let i = 0; i < text.length; i += 1) bytes[i] = text.charCodeAt(i) & 0xff;
  return bytes;
}

function createPalettePdf(logo) {
  const pageWidth = 842;
  const pageHeight = 595;
  const margin = 34;
  const swatchY = 170;
  const swatchHeight = 235;
  const swatchWidth = (pageWidth - margin * 2) / customPalette.length;
  const darkColours = new Set(["#111111", "#1f5e5b", "#4f6072"]);

  const swatches = customPalette.map((colour, index) => {
    const x = margin + index * swatchWidth;
    const textColor = darkColours.has(colour.hex.toLowerCase()) ? "1 1 1" : "0 0 0";
    return [
      `${hexToPdfRgb(colour.hex)} rg`,
      `${x.toFixed(2)} ${pageHeight - swatchY - swatchHeight} ${swatchWidth.toFixed(2)} ${swatchHeight} re f`,
      `${textColor} rg`,
      `BT /F2 18 Tf ${x + 20} ${pageHeight - swatchY - swatchHeight + 58} Td (${escapePdfText(colour.name)}) Tj ET`,
      `BT /F2 13 Tf ${x + 20} ${pageHeight - swatchY - swatchHeight + 32} Td (${escapePdfText(colour.hex)}) Tj ET`
    ].join("\n");
  }).join("\n");

  // Draw the real logo when available, otherwise fall back to a yellow square
  const logoDraw = logo
    ? "q 64 0 0 64 42 487 cm /Im1 Do Q"
    : `${hexToPdfRgb("#FBC70F")} rg 42 487 64 64 re f`;

  const content = [
    "1 1 1 rg 0 0 842 595 re f",
    "0.91 0.91 0.89 RG 1 w 24 24 794 547 re S",
    logoDraw,
    "0 0 0 rg BT /F2 22 Tf 128 523 Td (OLYMPIC PAINTS) Tj ET",
    "0.37 0.37 0.37 rg BT /F1 16 Tf 128 494 Td (Custom colour palette) Tj ET",
    swatches,
    "0 0 0 rg BT /F2 22 Tf 34 88 Td (Bring this palette to Atlas or your Colour Cafe consultation.) Tj ET",
    "0.37 0.37 0.37 rg BT /F1 14 Tf 34 56 Td (Created on olympicpaints.co.za/colour-collections) Tj ET"
  ].join("\n");

  const resources = logo
    ? "/Resources << /Font << /F1 4 0 R /F2 5 0 R >> /XObject << /Im1 7 0 R >> >>"
    : "/Resources << /Font << /F1 4 0 R /F2 5 0 R >> >>";

  // Each object is a list of parts (strings or Uint8Array) so the
  // binary JPEG stream survives with byte-accurate xref offsets.
  const objects = [
    ["<< /Type /Catalog /Pages 2 0 R >>"],
    ["<< /Type /Pages /Kids [3 0 R] /Count 1 >>"],
    [`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] ${resources} /Contents 6 0 R >>`],
    ["<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"],
    ["<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>"],
    [`<< /Length ${content.length} >>\nstream\n${content}\nendstream`]
  ];

  if (logo) {
    objects.push([
      `<< /Type /XObject /Subtype /Image /Width ${logo.width} /Height ${logo.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${logo.bytes.length} >>\nstream\n`,
      logo.bytes,
      "\nendstream"
    ]);
  }

  const chunks = [];
  let length = 0;
  const push = (part) => {
    const bytes = typeof part === "string" ? pdfTextBytes(part) : part;
    chunks.push(bytes);
    length += bytes.length;
  };

  push("%PDF-1.4\n");

  const offsets = [];
  objects.forEach((parts, index) => {
    offsets.push(length);
    push(`${index + 1} 0 obj\n`);
    parts.forEach(push);
    push("\nendobj\n");
  });

  const xref = length;
  push(`xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`);
  offsets.forEach((offset) => {
    push(`${String(offset).padStart(10, "0")} 00000 n \n`);
  });
  push(`trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`);

  const pdf = new Uint8Array(length);
  let position = 0;
  chunks.forEach((chunk) => {
    pdf.set(chunk, position);
    position += chunk.length;
  });

  return pdf;
}

async function downloadPaletteCard() {
  if (!customPalette.length) {
    setPaletteStatus("Choose at least one colour before downloading your palette.");
    return;
  }

  setPaletteStatus("Preparing your palette PDF...");
  const logo = await getLogoJpeg();

  const blob = new Blob([createPalettePdf(logo)], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "olympic-paints-palette.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setPaletteStatus("Palette PDF downloaded.");
}

themeTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.themeFilter;
    themeTabs.forEach((item) => item.classList.remove("is-active"));
    tab.classList.add("is-active");

    paintChips.forEach((chip) => {
      const visible = filter === "all" || chip.dataset.theme === filter;
      chip.style.display = visible ? "" : "none";
    });
  });
});

paintChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const colour = { name: chip.dataset.name, hex: chip.dataset.hex };
    const existingIndex = customPalette.findIndex((item) => item.hex === colour.hex);

    if (existingIndex >= 0) {
      customPalette.splice(existingIndex, 1);
    } else {
      if (customPalette.length >= paletteSlots.length) customPalette.shift();
      customPalette.push(colour);
    }

    renderCustomPalette();
  });
});

clearPaletteButton?.addEventListener("click", () => {
  customPalette = [];
  renderCustomPalette();
});

copyPaletteButton?.addEventListener("click", async () => {
  if (!customPalette.length) {
    setPaletteStatus("Choose at least one colour before copying your palette.");
    return;
  }

  try {
    await navigator.clipboard.writeText(paletteText());
    setPaletteStatus("Palette colours copied.");
  } catch (error) {
    setPaletteStatus(paletteText());
  }
});

downloadPaletteButton?.addEventListener("click", downloadPaletteCard);

/* --- Inspiration design carousel ------------------------------ */
function initDesignCarousel() {
  if (!designCarousel) return;

  const designSlides = [...designCarousel.querySelectorAll("[data-design-slide]")];
  const designDots = [...designCarousel.querySelectorAll("[data-carousel-dot]")];
  const prev = designCarousel.querySelector("[data-carousel-prev]");
  const next = designCarousel.querySelector("[data-carousel-next]");
  let activeDesign = 0;

  function showDesign(index) {
    activeDesign = (index + designSlides.length) % designSlides.length;
    designSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === activeDesign);
    });
    designDots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === activeDesign);
    });
  }

  prev?.addEventListener("click", () => showDesign(activeDesign - 1));
  next?.addEventListener("click", () => showDesign(activeDesign + 1));
  designDots.forEach((dot) => {
    dot.addEventListener("click", () => showDesign(Number(dot.dataset.carouselDot)));
  });
}

/* --- Intro curtain (one-time per session) ---------------------- */
function initIntroCurtain() {
  const intro = document.getElementById("site-intro");
  if (!intro) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (sessionStorage.getItem("op_intro") || reduceMotion) {
    intro.remove();
    return;
  }

  sessionStorage.setItem("op_intro", "1");
  document.body.classList.add("has-intro");

  // Keep the hero waiting underneath while the brand reveal plays.
  window.scrollTo(0, 0);

  let lifted = false;
  let timer;

  const onEscape = (event) => {
    if (event.key === "Escape") lift();
  };

  function lift() {
    if (lifted) return;
    lifted = true;
    clearTimeout(timer);
    document.removeEventListener("keydown", onEscape);
    document.body.classList.add("intro-done");
    const cleanup = () => intro.remove();
    intro.addEventListener("transitionend", cleanup, { once: true });
    setTimeout(cleanup, 1000);
  }

  timer = setTimeout(lift, 2350);

  intro.querySelector("[data-skip-intro]")?.addEventListener("click", lift);
  document.addEventListener("keydown", onEscape);
}

/* --- Marker sweep (headlines paint themselves in) -------------- */
function initMarkerSweep() {
  const ems = [...document.querySelectorAll("h2 em")];
  if (!ems.length) return;

  if (!("IntersectionObserver" in window)) {
    ems.forEach((em) => em.classList.add("is-swept"));
    return;
  }

  const sweepObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-swept");
          sweepObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  ems.forEach((em) => sweepObserver.observe(em));
}

/* --- Pinned scroll scenes (sticky stages, scroll-driven) ------- */
function initPinnedScenes() {
  const pins = [...document.querySelectorAll("[data-pin]")];
  if (!pins.length) return;

  const desktop = window.matchMedia("(min-width: 1025px)");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function update() {
    if (!desktop.matches || reduceMotion.matches) return;

    pins.forEach((pin) => {
      const total = pin.offsetHeight - window.innerHeight;
      if (total <= 0) return;

      const progress = Math.min(1, Math.max(0, -pin.getBoundingClientRect().top / total));
      pin.style.setProperty("--pin-progress", progress.toFixed(4));

      const steps = Number(pin.dataset.pinSteps || 0);
      if (!steps) return;

      const active = Math.min(steps - 1, Math.floor(progress * steps));
      if (pin._pinActive === active) return;
      pin._pinActive = active;

      const cards = pin.querySelectorAll(".journey-grid article");
      if (cards.length) {
        cards.forEach((card, index) => card.classList.toggle("is-active", index === active));
      }

      if (typeof pin._floodStep === "function") pin._floodStep(active);
    });
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}

/* --- Colour flood (hover a swatch, the room follows) ----------- */
function initColourFlood() {
  const section = document.querySelector("[data-flood-section]");
  if (!section) return;

  const swatches = [...section.querySelectorAll(".flood-swatch")];
  const nameEl = section.querySelector("[data-flood-name]");

  function applyFlood(swatch) {
    section.style.setProperty("--flood", swatch.dataset.flood);
    if (nameEl) nameEl.textContent = swatch.dataset.name;
    swatches.forEach((s) => s.classList.toggle("is-active", s === swatch));
  }

  swatches.forEach((swatch) => {
    swatch.addEventListener("mouseenter", () => applyFlood(swatch));
    swatch.addEventListener("focus", () => applyFlood(swatch));
    swatch.addEventListener("click", () => applyFlood(swatch));
  });

  // Expose a step hook so the pinned scroll scene can drive the flood
  section._floodStep = (index) => {
    const swatch = swatches[index];
    if (swatch) applyFlood(swatch);
  };

  const first = swatches[0];
  if (first) applyFlood(first);
}

/* --- Home story sequence (one scroll, one panel) --------------- */
function initStorySequence() {
  const sequence = document.querySelector("[data-story-sequence]");
  if (!sequence) return;

  const panels = [...sequence.querySelectorAll("[data-story-panel]")];
  const progress = [...sequence.querySelectorAll(".story-progress span")];
  if (!panels.length) return;
  let activeIndex = -1;

  function showPanel(index) {
    const active = Math.max(0, Math.min(panels.length - 1, index));
    if (active === activeIndex) return;
    activeIndex = active;
    panels.forEach((panel, panelIndex) => {
      panel.classList.toggle("is-active", panelIndex === active);
    });
    progress.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === active);
    });
  }

  function updateStory() {
    const rect = sequence.getBoundingClientRect();
    const scrollable = Math.max(1, sequence.offsetHeight - window.innerHeight);
    const amount = Math.min(1, Math.max(0, -rect.top / scrollable));
    showPanel(Math.round(amount * (panels.length - 1)));
  }

  window.addEventListener("scroll", updateStory, { passive: true });
  window.addEventListener("resize", updateStory);
  showPanel(0);
  updateStory();
}

/* --- Colour discovery intent capture -------------------------- */
function initDiscoveryTool() {
  if (!discoverySection) return;

  const choices = [...discoverySection.querySelectorAll("[data-discovery-choice]")];
  const result = discoverySection.querySelector("[data-discovery-result]");
  if (!choices.length || !result) return;

  const content = {
    home: {
      title: "Book a Colour Cafe consultation",
      text: "Bring room photos, natural-light notes and any furniture or flooring references. Atlas will help prepare the brief."
    },
    retail: {
      title: "Plan a brand-led design consultation",
      text: "Share your customer experience goals, traffic zones and durability needs so the team can connect colour, finish and paint performance."
    },
    work: {
      title: "Shape a workspace palette",
      text: "Atlas will capture how the space needs to feel, from calm focus to creative energy, then route you to the right designer."
    },
    exterior: {
      title: "Match colour with exterior performance",
      text: "Prepare photos, sun exposure, surface condition and style references so Olympic Paints can recommend colour and coating direction."
    }
  };

  function setChoice(key) {
    const selected = content[key] || content.home;
    choices.forEach((choice) => choice.classList.toggle("is-active", choice.dataset.discoveryChoice === key));
    result.querySelector("h3").textContent = selected.title;
    result.querySelector("p").textContent = selected.text;
  }

  choices.forEach((choice) => {
    choice.addEventListener("click", () => setChoice(choice.dataset.discoveryChoice));
  });
}

/* --- Video facade (click-to-load YouTube or local MP4) -------- */
function initVideoFacade() {
  const frames = [...document.querySelectorAll("[data-video], [data-video-src]")];
  if (!frames.length) return;

  // YouTube's player needs a real HTTP(S) origin. Opened straight from disk
  // (file://) it returns "Error 153", so fall back to opening the video on
  // YouTube in a new tab. Served over http/https it embeds inline as normal.
  // Local MP4 files play fine on file:// too.
  const canEmbed = location.protocol === "http:" || location.protocol === "https:";

  frames.forEach((frame) => {
    const play = () => {
      if (frame.classList.contains("is-playing")) return;

      // Self-hosted MP4 (e.g. the Our Story films)
      const src = frame.dataset.videoSrc;
      if (src) {
        const video = document.createElement("video");
        video.src = src;
        video.controls = true;
        video.autoplay = true;
        video.playsInline = true;
        video.setAttribute("playsinline", "");
        frame.classList.add("is-playing");
        frame.appendChild(video);
        video.focus();
        return;
      }

      // YouTube embed
      const id = frame.dataset.video;
      if (!id) return;

      if (!canEmbed) {
        window.open(`https://youtu.be/${id}`, "_blank", "noopener");
        return;
      }

      const iframe = document.createElement("iframe");
      iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;
      iframe.title = "Olympic Paints film";
      iframe.loading = "lazy";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;

      frame.classList.add("is-playing");
      frame.appendChild(iframe);
      iframe.focus();
    };

    frame.addEventListener("click", play);
    frame.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        play();
      }
    });
  });
}

/* --- Init ----------------------------------------------------- */
window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();
startSlides();
animateCounters();
initProductFilters();
renderCustomPalette();
initDesignCarousel();
initAtlasVoice();
initIntroCurtain();
initColourFlood();
initStorySequence();
initDiscoveryTool();
initMarkerSweep();
initPinnedScenes();
initVideoFacade();
