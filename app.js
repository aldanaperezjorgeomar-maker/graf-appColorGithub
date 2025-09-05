// Utilidades
const clamp255 = (n) => Math.max(0, Math.min(255, Number(n) || 0));
const toHex2 = (n) => clamp255(n).toString(16).padStart(2, "0").toUpperCase();
const hexToRgb = (hex) => {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
};

// Sliders y numéricos
const rRange = document.getElementById("rangeR");
const gRange = document.getElementById("rangeG");
const bRange = document.getElementById("rangeB");
const rNum   = document.getElementById("numR");
const gNum   = document.getElementById("numG");
const bNum   = document.getElementById("numB");

// Otros elementos
const preview     = document.getElementById("preview");
const rgbText     = document.getElementById("rgbText");
const hexOutput   = document.getElementById("hexOutput");
const btnCopy     = document.getElementById("btnCopy");
const btnReset    = document.getElementById("btnReset");
const colorPicker = document.getElementById("colorPicker");

// Actualizar color desde sliders/numéricos
function updateColor() {
  const r = clamp255(rRange.value);
  const g = clamp255(gRange.value);
  const b = clamp255(bRange.value);

  rNum.value = r;
  gNum.value = g;
  bNum.value = b;

  const rgb = `rgb(${r},${g},${b})`;
  preview.style.background = rgb;
  rgbText.textContent = rgb;

  const hex = `${toHex2(r)}${toHex2(g)}${toHex2(b)}`;
  hexOutput.value = hex;
  colorPicker.value = `#${hex}`;
}

// Actualizar desde inputs numéricos
function updateFromNumbers() {
  rRange.value = clamp255(rNum.value);
  gRange.value = clamp255(gNum.value);
  bRange.value = clamp255(bNum.value);
  updateColor();
}

// Actualizar desde color picker
function updateFromPicker() {
  const { r, g, b } = hexToRgb(colorPicker.value);
  rRange.value = r;
  gRange.value = g;
  bRange.value = b;
  updateColor();
}

// Copiar HEX
btnCopy.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(hexOutput.value);
    btnCopy.textContent = "¡Copiado!";
    setTimeout(() => (btnCopy.textContent = "Copiar"), 1200);
  } catch {
    hexOutput.select();
    document.execCommand("copy");
  }
});

// Reiniciar
btnReset.addEventListener("click", () => {
  rRange.value = gRange.value = bRange.value = 0;
  rNum.value = gNum.value = bNum.value = 0;
  colorPicker.value = "#000000";
  updateColor();
});

// Eventos
["input", "change"].forEach(evt => {
  rRange.addEventListener(evt, updateColor);
  gRange.addEventListener(evt, updateColor);
  bRange.addEventListener(evt, updateColor);

  rNum.addEventListener(evt, updateFromNumbers);
  gNum.addEventListener(evt, updateFromNumbers);
  bNum.addEventListener(evt, updateFromNumbers);

  colorPicker.addEventListener(evt, updateFromPicker);
});

// Inicialización
updateColor();
