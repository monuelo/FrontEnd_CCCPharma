import { Product } from './Product.js';
import { Comparators } from './OrderMethods.js';
import './Separators.js';

class ProductList extends HTMLUListElement {
    constructor() {
        super()
        this.refresh = new CustomEvent('refresh');
    }
    getProductsJson() {
        // WORK IN PROGRESS
        return fetch("https://cccpharma-rest.herokuapp.com/products/", { method: "GET" })
            .then(data => data.json())
            .catch(err => console.log(err.message))
    }

    setProductsInDOM() {
        this.products.forEach(product => {
            //console.log(product);
            const productCard = new Product(product);
            this.appendChild(productCard);
        });
        this.dispatchEvent(this.refresh);
    }

    connectedCallback() {
        this.url = "components/product"
        this.getProductsJson().then(productsJson => this.render(productsJson));
    }

    render(products, method = "name") {
        this.innerHTML = ``
        this.products = products.sort(Comparators[method]);
        var classes = ['mdc-image-list', 'mdc-image-list--masonry', 'product-list'];
        this.classList.add(...classes);
        this.setProductsInDOM();
    }
}

try {
    customElements.define('product-list', ProductList, { extends: 'ul' });

} catch (err) {
    const h3 = document.createElement('h3');
    h3.innerHTML = "Something went wrong!";
    document.body.appendChild(h3);
}