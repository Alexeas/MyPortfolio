//Web-component
class MyInput extends HTMLElement {

  constructor(){
    super();
    this.attachShadow({mode: "open"});
  }
  connectedCallback() {
    this.style.backgroundColor = "black";
    this.style.color = "white";
    this.style.display = "block";
    this.style.padding = "12px";
    this.style.border = "4px solid gray";

    if (!this.style.width) {
      this.style.width = "100%";
      this.style.height = "100px";
    }
  }
  disconnectedCallback() {
    console.log("I am dead");
  }
  static get observedAttributes() {
    return ["id", "width", "border"];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    //Код при изменении атрибута
  }
}

customElements.define("my-input", MyInput);

