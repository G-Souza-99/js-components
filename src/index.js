// importing the custom classes
import { GSHeader } from './components/gs-header.js';
import { GSFooter } from './components/gs-footer.js';
import { GSMain } from './components/gs-main.js';
import { GSPizzaCard } from './components/gs-pizza-card.js';

window.onresize = () => {
  if (window.innerWidth < 1024){
    document.body.innerHTML = `
      <div style='
        display:flex;
        justify-content:center;
        align-items:center;
        height:100vh;
        width:100vw;
        font-size: 20px;
        font-weight: bold;
        color: #fff;
        background-color:#000;
        '>
        I look much better in a wide window ;)
      </div>
    `;
  } else {
    window.location.reload();
  }
}