
// ======= Template =======

const template = document.createElement('template');

template.innerHTML = `
  <style>
  .user-card {
		font-family: 'Arial', sans-serif;
		background: #f4f4f4;
		width: 500px;
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-gap: 10px;
		margin-bottom: 15px;
		border-bottom: darkorchid 5px solid;
	}

	.user-card img {
		width: 100%;
	}

	.user-card button {
		cursor: pointer;
		background: darkorchid;
		color: #fff;
		border: 0;
		border-radius: 5px;
		padding: 5px 10px;
	}
  </style>

  <div class="user-card">
    <img />
    <div>
      <h3></h3>
      <div class="info">
        <p><slot name="email" /></p>
        <p><slot name="phone" /></p>
      </div>
      <button id="toggle-info">Hide Info</button>
    </div>
  </div>
`;

// ======= Component =======

class Component extends HTMLElement {
    constructor() {
        super();
        this.showInfo = true;
        this.shadow = this.attachShadow({ mode: 'open'});
    }

    render() {
        this.shadowRoot.appendChild(template.content.cloneNode(true)); //this.shadow.innerHTML = template;
        this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
        this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
    }

    toggleInfo() {
        this.showInfo = !this.showInfo;
    
        const info = this.shadowRoot.querySelector('.info');
        const toggleBtn = this.shadowRoot.querySelector('#toggle-info');
    
        if(this.showInfo) {
          info.style.display = 'block';
          toggleBtn.innerText = 'Hide Info';
        } else {
          info.style.display = 'none';
          toggleBtn.innerText = 'Show Info';
        }
    }
    
    connectedCallback() {
        this.render();
        this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo());
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('#toggle-info').removeEventListener();
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {

    }
  
}
  
window.customElements.define('test-comp', Component);