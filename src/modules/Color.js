import * as convert from "color-convert";
export class Color {
  #hsl;
  #element;
  #hex;

  constructor(hsl) {
    this.#hsl = hsl;
    this.#hex = `#${convert.hsl.hex(hsl)}`;
    this.#element = this.#generateElement();
    console.log(this.#hex);
    console.log(this.#hsl);
    console.log(this.#element);
  }

  #generateElement() {
    const html = `<div class="color" data-color="${
      this.#hex
    }" style="background-color: ${this.#hex}">
	<p style="color: rgb(${this.#hsl[2] < 60 ? "#ffffff" : "#000000"}">${
      this.#hex
    }</p>
</div>`;
    return html;
  }
  display(parentElement) {
    //parentElement.innerHTML = "";
    parentElement.insertAdjacentHTML("afterbegin", this.#element);
  }
}
