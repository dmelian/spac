//file: hbspage.js
( function(window, document, app, undefined) {

	var Page= function(){
		this.id= "";

	};

	Page.prototype= new app.BasePage();
	Page.prototype.constructor= Page;


//	PAGE METHODS
///////////////////////////////////////////////////

	Page.prototype.open = function ( id, params ) {
		this.id= id;
	};

	Page.prototype.show = function ( content ) {
		var template, html;
		
		template = app.templates[this.id];
		html = template();
		content.innerHTML= html;
	}; 

	app.hbsPage= Page;

}) (window, document, window.app);
