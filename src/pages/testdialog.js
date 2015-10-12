//file: testdialog.js
( function(window, document, app, pageId, undefined) {

	var Page= function(){
		this.id= pageId;
		this.testNo= 0;
		
		this.loginDataDef= {
			id: 'login',
			fields: [
				{
					id: 'user',
					caption: 'Usuario',
					type: ['text', 16]
				}, {
					id: 'password',
					caption: 'Contraseña',
					type: ['password', 16]
				}
			]
		};

	};

	Page.prototype= new app.BasePage();
	Page.prototype.constructor= Page;


//	PAGE METHODS
///////////////////////////////////////////////////

	Page.prototype.show= function( content ) {
		
		this.button= document.createElement("button");
		this.button.addEventListener("click", this.doAction.bind(this), false);
		this.button.appendChild( document.createTextNode("Click me!") );
		content.appendChild(this.button);

	};
	
	Page.prototype.doAction= function(){
		switch (this.testNo) {
			case 0:
				app.dlg.showMessage('Hola Mundo!');
				break;
			case 1:
				app.dlg.showMessage('Ya somos capaces de mostrar un mensaje por pantalla', 'Mi test del showMessage');
				break;
			case 2:
				app.dlg.showMessage('Test 3<br>Este es el <b>tercero</b>.<h3>¿Que te parece?</h3>', 'Testing.....');
				break;
			case 3:
				app.dlg.showMessage('Faltan por poner mas acciones y mas funcionalidad', 'TODO LIST');
				break;
		}
		this.testNo= ++this.testNo % 4;
	}; 

	Page.prototype.hide= function() {
		this.button.removeEventListener("click", this.doAction, false);
		//TODO: Ver si se está eliminando.
	};

	app.registerPage(pageId, Page);

}) (window, document, window.app, 'testDialog');
