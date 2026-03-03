// Web Component: Demo Card
class CSSDemoCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const title = this.getAttribute('title') || 'Default Title';
        const description = this.getAttribute('description') || 'Default Description';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    padding: 1.5rem;
                    background: oklch(95% 0.05 250);
                    border-radius: 1rem;
                    border: 1px solid oklch(80% 0.1 250);
                    box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
                }
                h3 {
                    margin-top: 0;
                    color: oklch(50% 0.2 250);
                }
                p {
                    color: oklch(30% 0.05 250);
                    margin-bottom: 0;
                }
                .tag {
                    display: inline-block;
                    padding: 0.2rem 0.6rem;
                    background: oklch(70% 0.2 250);
                    color: white;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    margin-bottom: 0.5rem;
                }
            </style>
            <div class="tag">Web Component</div>
            <h3>${title}</h3>
            <p>${description}</p>
        `;
    }
}

// Register Custom Element
customElements.define('css-demo-card', CSSDemoCard);

// Log to console for debugging
console.log('Modern CSS Showcase initialized.');
