import { GSHeader } from "./gs-header.js";

export class GSPizzaCard extends HTMLElement{
  constructor(name, price, priceFormatted, imagePath){
    super();
    this.name = name;
    this.price = price;
    this.priceFormatted = priceFormatted;
    this.imagePath = imagePath;
    GSHeader.cart = 0;
  }

  connectedCallback(){
    this.render();
  }

  render(){
    this.innerHTML = `
    <div class='card' id='card-${this.name.replaceAll(' ','')}-${this.price}'>
      <h2 class='card-name'>${this.name}</h2>
      <div class='card-container' style=''>
        <img class='card-image' id='image-${this.name.replaceAll(' ','')}-${this.price}' src='${this.imagePath}' alt='${this.name}'s pizza photo' />
        <h2 class='card-price' id='price-${this.name.replaceAll(' ','')}-${this.price}'>${this.priceFormatted} </h2>
        <button class='card-button' id='btn-${this.name.replaceAll(' ','')}-${this.price}'> Add to Shopping Bag </button>
      </div>
    </div>
    `;

    let image = document.getElementById(`image-${this.name.replaceAll(' ','')}-${this.price}`);
    let price = document.getElementById(`price-${this.name.replaceAll(' ','')}-${this.price}`);
    let button = document.getElementById(`btn-${this.name.replaceAll(' ','')}-${this.price}`);
    let cart = document.getElementById('cart');

    // 1 - event listner on the button
    button.addEventListener('click', () => {
      // 2- toggle button add to cart
      if (button.innerText === 'Remove from Shopping Bag'){
        button.innerText = 'Add to Shopping Bag';
        button.style.backgroundColor = '#3b3b3b';
        button.style.color = '#fff';
        price.style.color = '#333';
        price.style.backgroundColor = '#fff';

        // 3 - update the shopping bag price from the header component
        GSHeader.cart -= parseFloat(this.price);
        // 4 - format the price to the correct format and update the header component
        let textAry = GSHeader.cart.toFixed(2).toString().replace('.',',').split('');
        textAry.splice(2,',');
        let text = textAry.join('');
        cart.innerText = `${text} €`;


        /* this is to correct a bug that happens when the price is 0.
          Without this, adding any pizza and the peperoni  OR BBQ ,
          and then removing both pizzas, the price would be 0,00007€ (or neagative for the BBQ)
          and the styles would be broken, this way it garantees that it works
        */
        if (Math.floor(GSHeader.cart) === 0 || Math.ceil(GSHeader.cart) === 0){
          cart.innerText = '0,00 €';
        }
      } else {
        button.innerText = 'Remove from Shopping Bag';
        button.style.backgroundColor = '#3c3c3c';
        button.style.color = '#999';
        price.style.color = '#fff';
        price.style.backgroundColor = '#2a2a2a';
        GSHeader.cart +=  parseFloat(this.price);
        let textAry = GSHeader.cart.toFixed(2).toString().replace('.',',').split('');
        textAry.splice(2,',');
        let text = textAry.join('');
        cart.innerText = `${text} €`;
      }
    })
    // same thing as above but for card image
    image.addEventListener('click', () => {
      if (button.innerText === 'Remove from Shopping Bag'){
        button.innerText = 'Add to Shopping Bag';
        button.style.backgroundColor = '#3b3b3b';
        button.style.color = '#fff';
        price.style.color = '#333';
        price.style.backgroundColor = '#fff';
        GSHeader.cart -= parseFloat(this.price);
        let textAry = GSHeader.cart.toFixed(2).toString().replace('.',',').split('');
        textAry.splice(2,',');
        let text = textAry.join('');
        cart.innerText = `${text} €`;
        if (Math.floor(GSHeader.cart) === 0 || Math.ceil(GSHeader.cart) === 0){
          cart.innerText = '0,00 €';
        }
      } else {
        button.innerText = 'Remove from Shopping Bag';
        button.style.backgroundColor = '#3c3c3c';
        button.style.color = '#999';
        price.style.color = '#fff';
        price.style.backgroundColor = '#2a2a2a';
        GSHeader.cart +=  parseFloat(this.price);
        let textAry = GSHeader.cart.toFixed(2).toString().replace('.',',').split('');
        textAry.splice(2,',');
        let text = textAry.join('');
        cart.innerText = `${text} €`;
      }
    })
  }
}

customElements.define('gs-pizza-card', GSPizzaCard);