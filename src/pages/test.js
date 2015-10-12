//file: pages/test.js
( function(window, document, app, pageId, undefined) {

	var Page= function( params ){
		this.id= pageId;
		this.config= {
			tests: [
				{ id: 0, route:"testDialog", caption:"Testeo de dialogos" },
			]
		};
		
//	PAGE ATTRIBUTES
///////////////////////////////////////////////////
	
	};

	Page.prototype= new app.BasePage();
	Page.prototype.constructor= Page;

//	PAGE METHODS
///////////////////////////////////////////////////

	Page.prototype.open= function(){
		var i;
		for (i= 0; i < this.config.tests.length; i++) {
			this.config.tests[i]['id']= app.getNewId();
		}
		app.BasePage.prototype.open.call(this); //llamada al metodo de la clase madre.
	};

	Page.prototype.show= function( content ){
		var template = app.templates['spac-test'];
		var html = template(this.config);
		content.innerHTML= html;

	};
	


	app.registerPage(pageId, Page);

}) (window, document, window.app, 'spac-test');
