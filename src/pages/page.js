//file: pages/page.js
( function(window, document, app, pageId, undefined) {

	var Page= function( params ){
		this.id= pageId;
		
//	PAGE ATTRIBUTES
///////////////////////////////////////////////////
	
	};

	Page.prototype= new app.BasePage();
	Page.prototype.constructor= Page;

//	PAGE METHODS
///////////////////////////////////////////////////


	Page.prototype.show = function ( content ) {
	}; 

	app.registerPage(pageId, Page);

}) (window, document, window.app, 'pageId');
