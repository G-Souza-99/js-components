export class GSFooter extends HTMLElement{
  constructor( ){
    super();
  }

  get author(){
    return this.getAttribute('author');
  }

  set author(value){
    this.setAttribute('author', value);
  }

  connectedCallback(){
    this.render();
  }

  render(){
    this.innerHTML = `
    <a class='footer-text' href='https://www.linkedin.com/in/gsouzaa4/' target='_blank'>
      <p>Pizzaria by ${this.author}</p>
    </a>
    `;
  }


}

customElements.define('gs-footer', GSFooter);
