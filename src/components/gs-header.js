export class GSHeader extends HTMLElement{
  constructor(cart){
    super();
    this.render();
    this.cart = cart || '0,00';
  }

  connectedCallback(){
    this.render();
  }

  render(){
    this.innerHTML = `
    <div class='h-left' >
      <a href='https://en.wikipedia.org/wiki/Pizza' target='_blank'>
        <img class='logo' src="assets/logo.png" alt="Pizzaria Logo">
      </a>
      <p class='word-logo'> Gabriel's Pizzaria </p>
    </div>
    <div class='h-right'>
      <p class='header-text' id="cart" >${this.cart} €</p>
      <img class='bag' src="assets/shoppingBag.png" alt="shopping bag image">
    </div>
    `;
  }

}

window.customElements.define('gs-header', GSHeader);
