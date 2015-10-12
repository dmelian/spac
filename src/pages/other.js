//file: pages/other.js
( function(window, document, app, pageId, undefined) {

	var Page= function(){
		this.id= pageId;
		this.texts= [
			"This is other page.",
			"It is an anonymous one!.",
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

}) (window, document, window.app, 'other');
