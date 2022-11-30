import { GSPizzaCard } from "./gs-pizza-card.js";

const url = 'mocks/list.json';
let data = [];
let isReady = false;

export class GSMain extends HTMLElement{
  constructor() {
    super();
  }

  connectedCallback(){
    this.render();
  }

  async renderCards(){
    let cardsContainer = document.getElementById('cards-container')
    await fetch(url).then(response => response.json()).then(json => {
      // console.log(json)
      data = json;
      isReady = true;
      return data
    })
    data.forEach(pizza => {
      const pizzaCard = new GSPizzaCard(pizza.name, pizza.price, pizza.priceFormatted, pizza.imagePath);
      cardsContainer.appendChild(pizzaCard);
    })
  }

  render(){
    if(!isReady){
      this.innerHTML = `
      <div style=' display:flex; justify-content:center; align-items:center; height:600px; width:100%'>
        <img src='assets/spinner.svg' style='width:50px; height:50px;'></img>
      </div>
      `;
    } 
    this.innerHTML = `
      <div class='container' id='container'>
        <h1 class='title'>Pizza In Stock</h1>

        <input class='filter'
          type="text"
          value=""
          placeholder="Type to Filter..."
          />
      </div>

      <div id='cards-container' class='cards-container'>
        <div id='no-pizza' class='no-pizza'>
          <p class='hidden-text'> No pizzas with that name were found :( </p>
        </div>
      </div>
    `;
    this.renderCards();

    let noPizza = document.getElementById('no-pizza');
    document.querySelector('input').addEventListener('keyup', (e) => {
      let search = e.target.value;
      let cards = document.querySelectorAll('gs-pizza-card');
      console.log(cards)
      cards.forEach(card => {
        let name = card.querySelector('h2').innerText;
        // if more than 0 letters are typed, filter the cards
        // if less than 0 letters are typed, show all cards
        // if no match, hide all cards and show noPizza
        if(search.length > 0){
          if(name.toLowerCase().includes(search.toLowerCase())){
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        } else if(search.length <= 0){
          card.style.display = 'block';
        }
      })
      // if no cards are displayed, show noPizza
      let cardsDisplayed = document.querySelectorAll('gs-pizza-card[style="display: block;"]');
      if(cardsDisplayed.length <= 0){
        noPizza.style.display = 'block';
      } else {
        noPizza.style.display = 'none';
      }
      
      
    });
  }
}

customElements.define('gs-main', GSMain);


