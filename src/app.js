import { generatePalette, shadow } from "./modules/utils.js";
import { Color } from "./modules/Color";
import * as convert from "color-convert";
import { Notyf } from "notyf";
import "notyf/notyf.min.css"; // for React, Vue and Svelte

// Create an instance of Notyf
const notyf = new Notyf();

//const colors = generatePalette("#ff5733");
//console.log(colors);
const container = document.querySelector("main");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let entry = form.firstElementChild.value;
  if (/^#[0-9A-F]{6}$/i.test(entry)) {
    const palette = generatePalette(entry);
    console.log(palette);
    displayColors(palette);
  } else {
    // Display an error notification
    notyf.error("🚫la valeur d'entrée n'est pas une hexadecimal valide🚫");
    throw new Error(
      "🚫la valeur d'entrée>> is not a valid Hexadecimal color 🚫"
    );
  }
});

function displayColors(palette) {
  container.innerHTML = "";
  document.querySelector("header").classList.add("minimized");
  const gradientColors = [
    0,
    Math.round(palette.length / 2),
    palette.length - 1,
  ].map((index) => `#${convert.hsl.hex(palette[index])}`);

  document.body.style.background = `linear-gradient(-45deg, ${gradientColors.join(
    ","
  )}`;

  // Redéfini background-size
  document.body.style.backgroundSize = `400% 400%`;

  palette.forEach((element) => {
    let color = new Color(element);
    color.display(container);
  });
  const entry = form.firstElementChild.value;
  document.documentElement.style.setProperty("--shadow-color", shadow(entry));
}

container.addEventListener("click", (e) => {
  copy(e);
});

async function copy(e) {
  const color = e.target.closest(".color").dataset.color;
  await navigator.clipboard.writeText(color);
  notyf.success(`copied ${color} to clipboard`);
}
