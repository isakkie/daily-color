const palettes = window.DAILY_COLOR_PALETTES || [
  {
    title: "低饱和的明亮感",
    colors: [
      { hex: "#d8ddcf", name: "雾灰绿", role: "主色", ratio: 44 },
      { hex: "#f6efe1", name: "温米白", role: "留白", ratio: 28 },
      { hex: "#8b9b88", name: "鼠尾草", role: "支撑", ratio: 16 },
      { hex: "#9d4c42", name: "暖砖红", role: "点缀", ratio: 8 },
      { hex: "#32352f", name: "深苔灰", role: "收边", ratio: 4 }
    ],
    reason: "灰绿降低自然色的攻击性，米白让画面有呼吸感，砖红只做小面积出现，整组颜色会显得清爽但不寡淡。",
    practice: "找一个低饱和主色，再用一个小面积暖色让它变得有精神。",
    scenes: [
      "米白针织、灰绿外套、酒红小包。",
      "九宫格里让绿色和米白占多数，红色只出现一次。",
      "标题用深灰绿，重点线条用暖红，背景保持温白。",
      "靠垫或小花器做点缀，墙面与织物保持安静。"
    ]
  },
  {
    title: "干净的冷暖平衡",
    colors: [
      { hex: "#dfe7ea", name: "晨雾蓝", role: "主色", ratio: 42 },
      { hex: "#fff8ea", name: "奶油白", role: "留白", ratio: 30 },
      { hex: "#6e8ea5", name: "旧牛仔蓝", role: "支撑", ratio: 14 },
      { hex: "#c5a15b", name: "柔金色", role: "点缀", ratio: 9 },
      { hex: "#44413b", name: "烟灰褐", role: "收边", ratio: 5 }
    ],
    reason: "冷蓝负责清醒，奶油白把冷感软化，柔金色像一束微弱的光，让整体更亲近。",
    practice: "今天留意一个冷色背景里的暖色小物，看看它是不是让画面变得更有人味。",
    scenes: [
      "浅蓝衬衫、奶白裤装、金色耳饰。",
      "蓝白照片之间插入一张带暖光的近景。",
      "正文保持深灰，章节标记用柔金，图表用旧蓝。",
      "床品用冷白蓝，台灯或木器提供一点暖意。"
    ]
  },
  {
    title: "温柔但有骨架",
    colors: [
      { hex: "#ead8cc", name: "淡陶土", role: "主色", ratio: 40 },
      { hex: "#f8f3eb", name: "纸白", role: "留白", ratio: 28 },
      { hex: "#b47b65", name: "玫瑰棕", role: "支撑", ratio: 17 },
      { hex: "#59736d", name: "灰蓝绿", role: "对比", ratio: 10 },
      { hex: "#2f302b", name: "墨灰", role: "收边", ratio: 5 }
    ],
    reason: "粉棕色容易变甜，加入灰蓝绿以后会有冷静的骨架，墨灰少量出现能把轮廓收住。",
    practice: "如果一个颜色太甜，试着给它配一个偏冷、偏灰的颜色。",
    scenes: [
      "陶土色上衣、米白半裙、灰绿围巾。",
      "暖色照片之间放入一张植物或阴影图。",
      "封面温柔，目录和页码用墨灰保持秩序。",
      "木色与粉棕做软装，植物负责降温。"
    ]
  }
];

const state = {
  currentIndex: 0,
  refreshCount: 0,
  capturedColors: [],
  library: JSON.parse(localStorage.getItem("dailyColorLibrary") || "[]")
};

const els = {
  dateLine: document.querySelector("#dateLine"),
  colorArt: document.querySelector("#colorArt"),
  paletteTitle: document.querySelector("#paletteTitle"),
  paletteReason: document.querySelector("#paletteReason"),
  dailySwatches: document.querySelector("#dailySwatches"),
  practiceText: document.querySelector("#practiceText"),
  wearScene: document.querySelector("#wearScene"),
  photoScene: document.querySelector("#photoScene"),
  docScene: document.querySelector("#docScene"),
  homeScene: document.querySelector("#homeScene"),
  refreshPalette: document.querySelector("#refreshPalette"),
  randomMood: document.querySelector("#randomMood"),
  weather: document.querySelector("#weather"),
  mood: document.querySelector("#mood"),
  energy: document.querySelector("#energy"),
  saveDaily: document.querySelector("#saveDaily"),
  imageInput: document.querySelector("#imageInput"),
  dropZone: document.querySelector("#dropZone"),
  canvas: document.querySelector("#sourceCanvas"),
  emptyCanvasText: document.querySelector("#emptyCanvasText"),
  capturePaletteBoard: document.querySelector("#capturePaletteBoard"),
  captureSwatches: document.querySelector("#captureSwatches"),
  analysisCopy: document.querySelector("#analysisCopy"),
  clearCapture: document.querySelector("#clearCapture"),
  saveCapture: document.querySelector("#saveCapture"),
  markImageOnly: document.querySelector("#markImageOnly"),
  libraryGrid: document.querySelector("#libraryGrid"),
  librarySyncNote: document.querySelector("#librarySyncNote"),
  exportLibrary: document.querySelector("#exportLibrary"),
  importLibrary: document.querySelector("#importLibrary"),
  clearLibrary: document.querySelector("#clearLibrary")
};

const ctx = els.canvas.getContext("2d", { willReadFrequently: true });

function init() {
  els.dateLine.textContent = new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "long"
  }).format(new Date());
  selectDailyPalette();
  renderDaily();
  renderLibrary();
  bindEvents();
}

function bindEvents() {
  els.refreshPalette.addEventListener("click", () => {
    state.refreshCount += 1;
    state.currentIndex = pickPaletteIndex(`manual-${state.refreshCount}`);
    renderDaily();
  });

  [els.weather, els.mood, els.energy].forEach((control) => {
    control.addEventListener("input", () => {
      state.refreshCount = 0;
      renderDaily();
    });
  });

  els.randomMood.addEventListener("click", () => {
    pickRandomSelect(els.weather);
    pickRandomSelect(els.mood);
    els.energy.value = String(1 + Math.floor(Math.random() * 5));
    state.refreshCount += 1;
    state.currentIndex = pickPaletteIndex(`random-${state.refreshCount}`);
    renderDaily();
  });

  els.saveDaily.addEventListener("click", () => {
    addToLibrary({
      type: "今日色彩",
      title: palettes[state.currentIndex].title,
      colors: palettes[state.currentIndex].colors,
      note: palettes[state.currentIndex].reason
    });
  });

  els.imageInput.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (file) loadImageFile(file);
  });

  ["dragenter", "dragover"].forEach((name) => {
    els.dropZone.addEventListener(name, (event) => {
      event.preventDefault();
      els.dropZone.classList.add("is-dragging");
    });
  });

  ["dragleave", "drop"].forEach((name) => {
    els.dropZone.addEventListener(name, (event) => {
      event.preventDefault();
      els.dropZone.classList.remove("is-dragging");
    });
  });

  els.dropZone.addEventListener("drop", (event) => {
    const file = event.dataTransfer.files?.[0];
    if (file?.type.startsWith("image/")) loadImageFile(file);
  });

  els.clearCapture.addEventListener("click", clearCapture);

  els.saveCapture.addEventListener("click", () => {
    addToLibrary({
      type: "捕捉颜色",
      title: "从画面抽象出的配色",
      colors: state.capturedColors,
      note: buildCaptureExplanation(state.capturedColors)
    });
  });

  els.markImageOnly.addEventListener("click", () => {
    els.analysisCopy.textContent = "已标记为“不是配色本身好看”。这张图可以留作灵感，但暂时不进入你的可复用配色库。";
  });

  els.exportLibrary.addEventListener("click", exportLibrary);
  els.importLibrary.addEventListener("change", importLibrary);

  els.clearLibrary.addEventListener("click", () => {
    state.library = [];
    persistLibrary();
    renderLibrary();
    setLibraryMessage("已清空当前浏览器里的色彩库。");
  });
}

function pickRandomSelect(select) {
  select.selectedIndex = Math.floor(Math.random() * select.options.length);
}

function selectDailyPalette() {
  const today = getDateKey();
  const storedDate = localStorage.getItem("dailyColorDate");
  const storedIndex = Number(localStorage.getItem("dailyColorIndex"));
  if (storedDate === today && Number.isInteger(storedIndex) && palettes[storedIndex]) {
    state.currentIndex = storedIndex;
    return;
  }
  state.currentIndex = pickPaletteIndex("daily");
  localStorage.setItem("dailyColorDate", today);
  localStorage.setItem("dailyColorIndex", String(state.currentIndex));
}

function pickPaletteIndex(salt) {
  const weather = els.weather.value;
  const mood = els.mood.value;
  const energy = Number(els.energy.value);
  const seed = hashString(`${getDateKey()}-${weather}-${mood}-${energy}-${salt}`);
  const scored = palettes.map((palette, index) => ({
    index,
    score: getPaletteScore(palette, weather, mood, energy)
  }));
  const bestScore = Math.max(...scored.map((item) => item.score));
  const candidates = scored.filter((item) => item.score === bestScore);
  return candidates[seed % candidates.length]?.index || seed % palettes.length;
}

function getPaletteScore(palette, weather, mood, energy) {
  const tags = palette.tags || {};
  let score = 0;
  if (tags.weather?.includes(weather)) score += 3;
  if (tags.mood?.includes(mood)) score += 3;
  if (tags.energy?.includes(energy)) score += 2;
  if (!tags.weather && !tags.mood && !tags.energy) score += 1;
  return score;
}

function getDateKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function hashString(value) {
  let hash = 0;
  for (let index = 0; index < value.length; index++) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

function renderDaily() {
  const base = palettes[state.currentIndex];
  const shifted = adaptPalette(base);
  const gradientStops = shifted.colors
    .map((color, index) => `${color.hex} ${index * 20}% ${(index + 1) * 20 + 8}%`)
    .join(", ");

  els.colorArt.style.background = `
    linear-gradient(125deg, ${gradientStops}),
    linear-gradient(180deg, ${shifted.colors[1].hex}, ${shifted.colors[0].hex})
  `;
  els.paletteTitle.textContent = shifted.title;
  els.paletteReason.textContent = shifted.reason;
  els.practiceText.textContent = shifted.practice;
  [els.wearScene, els.photoScene, els.docScene, els.homeScene].forEach((el, index) => {
    el.textContent = shifted.scenes[index];
  });

  els.dailySwatches.innerHTML = shifted.colors
    .map(
      (color) => `
        <div class="swatch" style="background:${color.hex}; color:${readableText(color.hex)}">
          <strong>${color.role} ${color.ratio}%</strong>
          <small>${color.name} ${color.hex}</small>
        </div>
      `
    )
    .join("");
}

function adaptPalette(base) {
  const weatherText = els.weather.options[els.weather.selectedIndex].text;
  const moodText = els.mood.options[els.mood.selectedIndex].text;
  const energy = Number(els.energy.value);
  let reason = base.reason;
  if (energy <= 2) reason += " 今天强度偏低，点缀色可以放在很小的面积里。";
  if (energy >= 4) reason += " 今天可以让点缀色更靠近脸部或画面中心。";
  return {
    ...base,
    title: `${base.title}`,
    reason: `${weatherText}，${moodText}。${reason}`
  };
}

function loadImageFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => drawAndAnalyze(img);
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
}

function drawAndAnalyze(img) {
  const maxW = 800;
  const maxH = 520;
  const ratio = Math.min(maxW / img.width, maxH / img.height);
  const width = Math.max(1, Math.round(img.width * ratio));
  const height = Math.max(1, Math.round(img.height * ratio));
  els.canvas.width = maxW;
  els.canvas.height = maxH;
  ctx.clearRect(0, 0, maxW, maxH);
  ctx.fillStyle = "#f5f1e8";
  ctx.fillRect(0, 0, maxW, maxH);
  ctx.drawImage(img, (maxW - width) / 2, (maxH - height) / 2, width, height);
  els.emptyCanvasText.style.display = "none";

  const imageData = ctx.getImageData((maxW - width) / 2, (maxH - height) / 2, width, height);
  const samples = samplePixels(imageData.data, 2500);
  state.capturedColors = clusterColors(samples, 5).map((color, index) => ({
    ...color,
    role: ["主色", "支撑", "过渡", "点缀", "收边"][index] || "颜色",
    name: nameColor(color.hex)
  }));
  renderCapture();
}

function samplePixels(data, limit) {
  const pixels = [];
  const step = Math.max(4, Math.floor(data.length / 4 / limit) * 4);
  for (let i = 0; i < data.length; i += step) {
    const alpha = data[i + 3];
    if (alpha < 180) continue;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const saturation = getSaturation(r, g, b);
    const lightness = (Math.max(r, g, b) + Math.min(r, g, b)) / 510;
    if (lightness > 0.98 || lightness < 0.03) continue;
    pixels.push([r, g, b, saturation]);
  }
  return pixels;
}

function clusterColors(samples, count) {
  if (!samples.length) return [];
  let centers = seedCenters(samples, count);
  for (let iteration = 0; iteration < 12; iteration++) {
    const groups = centers.map(() => []);
    samples.forEach((pixel) => {
      const index = nearestCenter(pixel, centers);
      groups[index].push(pixel);
    });
    centers = centers.map((center, index) => averageGroup(groups[index]) || center);
  }

  const groups = centers.map(() => []);
  samples.forEach((pixel) => groups[nearestCenter(pixel, centers)].push(pixel));

  return centers
    .map((center, index) => {
      const group = groups[index];
      const rgb = averageGroup(group) || center;
      return {
        hex: rgbToHex(rgb[0], rgb[1], rgb[2]),
        ratio: Math.round((group.length / samples.length) * 100),
        size: group.length
      };
    })
    .filter((color) => color.size > samples.length * 0.015)
    .sort((a, b) => b.ratio - a.ratio)
    .slice(0, count);
}

function seedCenters(samples, count) {
  const sorted = [...samples].sort((a, b) => {
    const aScore = a[3] * 80 + Math.abs(a[0] - a[2]);
    const bScore = b[3] * 80 + Math.abs(b[0] - b[2]);
    return bScore - aScore;
  });
  const centers = [];
  for (let i = 0; i < count; i++) {
    centers.push(sorted[Math.floor((i / count) * (sorted.length - 1))] || samples[i % samples.length]);
  }
  return centers;
}

function nearestCenter(pixel, centers) {
  let nearest = 0;
  let minDistance = Infinity;
  centers.forEach((center, index) => {
    const distance =
      (pixel[0] - center[0]) ** 2 + (pixel[1] - center[1]) ** 2 + (pixel[2] - center[2]) ** 2;
    if (distance < minDistance) {
      minDistance = distance;
      nearest = index;
    }
  });
  return nearest;
}

function averageGroup(group) {
  if (!group?.length) return null;
  const total = group.reduce(
    (acc, pixel) => [acc[0] + pixel[0], acc[1] + pixel[1], acc[2] + pixel[2]],
    [0, 0, 0]
  );
  return total.map((value) => Math.round(value / group.length));
}

function renderCapture() {
  els.saveCapture.disabled = state.capturedColors.length === 0;
  els.markImageOnly.disabled = state.capturedColors.length === 0;
  const ratioTotal = state.capturedColors.reduce((sum, color) => sum + color.ratio, 0) || 1;
  const previewBlocks = state.capturedColors
    .map((color) => {
      const width = Math.max(4, (color.ratio / ratioTotal) * 100);
      return `<span style="flex-basis:${width}%; background:${color.hex}"></span>`;
    })
    .join("");
  const floatingChips = state.capturedColors
    .map(
      (color, index) => `
        <div class="capture-swatch" style="background:${color.hex}; color:${readableText(color.hex)}">
          <span>
            <strong>${color.role} ${color.ratio}%</strong><br />
            <small>${color.name} ${color.hex}</small>
          </span>
          <button type="button" aria-label="删除 ${color.name}" data-remove="${index}">×</button>
        </div>
      `
    )
    .join("");

  els.capturePaletteBoard.innerHTML = state.capturedColors.length
    ? `
      <div class="palette-board-preview" aria-label="按比例生成的综合色彩预览">
        ${previewBlocks}
      </div>
      <div class="palette-board-chips">
        ${floatingChips}
      </div>
    `
    : `
      <div class="palette-board-preview is-empty">
        <span>抽象后的综合色彩预览</span>
      </div>
    `;

  els.captureSwatches.innerHTML = state.capturedColors.length
    ? `<p>比例预览会把主色铺大、点缀和收边压小；上方色块可以单独删除。</p>`
    : "";
  els.capturePaletteBoard.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.capturedColors.splice(Number(button.dataset.remove), 1);
      renderCapture();
    });
  });
  els.analysisCopy.textContent = buildCaptureExplanation(state.capturedColors);
}

function buildCaptureExplanation(colors) {
  if (!colors.length) return "这组抽象色块已经被清空。";
  const main = colors[0];
  const accent = colors.find((color) => color.ratio <= 12) || colors[colors.length - 1];
  const temperature = estimateTemperature(main.hex);
  const contrast = getContrastLabel(colors);
  return `${main.name}占比最高，给画面定下${temperature}的底色；${accent.name}适合做记忆点。${contrast}。如果只看这些色块仍然喜欢，就值得保存为模板。`;
}

function clearCapture() {
  state.capturedColors = [];
  ctx.clearRect(0, 0, els.canvas.width, els.canvas.height);
  els.emptyCanvasText.style.display = "flex";
  els.imageInput.value = "";
  renderCapture();
}

function addToLibrary(item) {
  state.library.unshift({
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...item
  });
  persistLibrary();
  renderLibrary();
}

function persistLibrary() {
  localStorage.setItem("dailyColorLibrary", JSON.stringify(state.library));
}

function exportLibrary() {
  if (!state.library.length) {
    setLibraryMessage("现在还没有可导出的色彩模板。");
    return;
  }
  const payload = {
    app: "daily-color",
    version: 1,
    exportedAt: new Date().toISOString(),
    items: state.library
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  const date = new Date().toISOString().slice(0, 10);
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = `daily-color-library-${date}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setLibraryMessage("已导出色彩库文件。可以把它发到另一台设备后导入。");
}

function importLibrary(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(String(reader.result));
      const importedItems = normalizeImportedLibrary(data);
      if (!importedItems.length) {
        setLibraryMessage("没有找到可导入的色彩模板。");
        return;
      }
      const existingKeys = new Set(state.library.map(getLibraryItemKey));
      const freshItems = importedItems.filter((item) => !existingKeys.has(getLibraryItemKey(item)));
      state.library = [...freshItems, ...state.library];
      persistLibrary();
      renderLibrary();
      setLibraryMessage(`已导入 ${freshItems.length} 个新模板，跳过 ${importedItems.length - freshItems.length} 个重复模板。`);
    } catch {
      setLibraryMessage("导入失败。请确认选择的是每日色彩导出的 JSON 文件。");
    } finally {
      event.target.value = "";
    }
  };
  reader.readAsText(file);
}

function normalizeImportedLibrary(data) {
  const items = Array.isArray(data) ? data : data?.items;
  if (!Array.isArray(items)) return [];
  return items
    .filter((item) => item && Array.isArray(item.colors) && item.colors.length)
    .map((item) => ({
      id: item.id || crypto.randomUUID(),
      createdAt: item.createdAt || new Date().toISOString(),
      type: item.type || "导入模板",
      title: item.title || "导入的配色",
      note: item.note || "从另一台设备导入的色彩模板。",
      colors: item.colors
        .filter((color) => color?.hex)
        .map((color, index) => ({
          hex: color.hex,
          name: color.name || nameColor(color.hex),
          role: color.role || ["主色", "支撑", "过渡", "点缀", "收边"][index] || "颜色",
          ratio: Number(color.ratio) || 0
        }))
    }))
    .filter((item) => item.colors.length);
}

function getLibraryItemKey(item) {
  return `${item.title}|${item.colors.map((color) => `${color.hex}:${color.ratio}`).join(",")}`;
}

function setLibraryMessage(message) {
  els.librarySyncNote.textContent = message;
}

function renderLibrary() {
  if (!state.library.length) {
    els.libraryGrid.innerHTML = `<p class="analysis-copy">还没有保存的颜色。等你遇到一组“脱离画面也成立”的颜色，它会出现在这里。</p>`;
    return;
  }
  els.libraryGrid.innerHTML = state.library
    .map(
      (item) => `
        <article class="library-card">
          <div class="mini-strip">
            ${item.colors
              .map((color) => `<span style="background:${color.hex}" title="${color.name || color.hex}"></span>`)
              .join("")}
          </div>
          <div class="library-card-body">
            <strong>${item.type} · ${item.title}</strong>
            <p>${item.note}</p>
            <button class="ghost-button compact" type="button" data-delete="${item.id}">删除</button>
          </div>
        </article>
      `
    )
    .join("");
  els.libraryGrid.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.library = state.library.filter((item) => item.id !== button.dataset.delete);
      persistLibrary();
      renderLibrary();
    });
  });
}

function rgbToHex(r, g, b) {
  return `#${[r, g, b].map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

function hexToRgb(hex) {
  const value = hex.replace("#", "");
  return [
    parseInt(value.slice(0, 2), 16),
    parseInt(value.slice(2, 4), 16),
    parseInt(value.slice(4, 6), 16)
  ];
}

function getSaturation(r, g, b) {
  const max = Math.max(r, g, b) / 255;
  const min = Math.min(r, g, b) / 255;
  if (max === min) return 0;
  const lightness = (max + min) / 2;
  return (max - min) / (1 - Math.abs(2 * lightness - 1));
}

function readableText(hex) {
  const [r, g, b] = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.58 ? "#242521" : "#fffdf5";
}

function nameColor(hex) {
  const [r, g, b] = hexToRgb(hex);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const light = (max + min) / 2;
  if (max - min < 18) return light > 180 ? "柔雾灰白" : light > 95 ? "中性灰" : "深灰";
  if (r > g && r > b) return g > b ? "暖陶棕" : "玫瑰红";
  if (g > r && g > b) return b > r ? "青绿" : "草木绿";
  if (b > r && b > g) return r > g ? "蓝紫" : "雾蓝";
  if (r > 170 && g > 145 && b < 120) return "柔金色";
  return "混合色";
}

function estimateTemperature(hex) {
  const [r, , b] = hexToRgb(hex);
  if (r - b > 22) return "偏暖";
  if (b - r > 22) return "偏冷";
  return "中性";
}

function getContrastLabel(colors) {
  const lightness = colors.map((color) => {
    const [r, g, b] = hexToRgb(color.hex);
    return 0.299 * r + 0.587 * g + 0.114 * b;
  });
  const gap = Math.max(...lightness) - Math.min(...lightness);
  if (gap > 150) return "明暗反差很强，适合做清晰、有轮廓的版面或穿搭";
  if (gap > 85) return "明暗有层次，但不会显得紧张";
  return "明暗接近，整体更柔和，使用时需要材质或留白来避免发闷";
}

init();
