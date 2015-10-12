//file: pages/main.js
( function(window, document, app, pageId, undefined) {

	var Page= function(){
		this.id= pageId;
		this.texts= [
			"Welcome to our single page application.",
			"This is the main page.",
			"Do you like it?.",
		];

	};

	Page.prototype= new app.BasePage();
	Page.prototype.constructor= Page;


//	PAGE METHODS
///////////////////////////////////////////////////

	Page.prototype.show = function ( content ) {
		var el,i;
		
		for (i= 0; i < this.texts.length; i++) {
			el= document.createTextNode(this.texts[i]); content.appendChild(el);
			el= document.createElement('br'); content.appendChild(el);
		}

	}; 

	app.registerPage(pageId, Page);

}) (window, document, window.app, 'main');
