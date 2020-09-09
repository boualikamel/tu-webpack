import template from "./header.html";
export class Header {
  constructor() {
    console.log(`This is header constructor`);
    this.setTemplate();
  }
  setTemplate() {
    document.getElementById('body').insertAdjacentHTML( 'afterbegin', template );
  }
}