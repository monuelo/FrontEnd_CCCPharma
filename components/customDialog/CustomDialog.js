class CustomDialog extends HTMLElement {
    connectedCallback() {
    	this.title = this.getAttribute("title");
    	this.content = this.getAttribute("content");

    	this.contents = {
			"product-form": `<form is="product-form"></form>`,
			"product-sale": `<form is="product-sale"></form>`,
    		"sign-up": `<form is="sign-up-form"></form>`,
    		"login": `<form is="login-form"></form>`,
    		"report": `<custom-report></custom-report>`
    	};

    	this.identification = {
			"product-form": "pform-dialog",
			"product-sale": "purchase-dialog",
    		"sign-up": "register-dialog",
    		"login": "login-dialog",
    		"report": "report-dialog"
    	};

        this.render();
    }

    render() {
        this.innerHTML = `
			<div class="mdc-dialog" id="${ this.identification[this.content] }"
		       role="alertdialog"
		       aria-modal="false"
		       aria-labelledby="my-dialog-title"
		       aria-describedby="my-dialog-content">

		    <div class="mdc-dialog__container">
		      <div class="mdc-dialog__surface">
		        <h2 class="mdc-dialog__title" id="my-dialog-title">${this.title}</h2>
		        <div class="mdc-dialog__content" id="my-dialog-content">
		          ${ this.contents[this.content] }
		        </div>
		      </div>
		    </div>
		    <div class="mdc-dialog__scrim"></div>
		  </div>	
		`
    }
}

try {
    customElements.define( 'custom-dialog', CustomDialog );
} catch (err) {
	const h3 = document.createElement('h3');
	h3.innerHTML = "Something went wrong!";
	document.body.appendChild(h3);
}