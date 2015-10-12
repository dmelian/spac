//file: pages/hbs.js
( function(window, document, app, pageId, undefined) {

	var Page= function(){
		this.id= pageId;
		this.content = {
			posts:[
				{
					title: 'Multilevel Handle Bars Template',
					date: '10/10/2013',
					author: 'John Smith'
				}, {
					title: 'Peter and his guitar',
					date: '11/12/2012',
					author: 'Nicolas'
				}, {
					title: 'The beautiful girl',
					date: '3/7/2015',
					author: 'George Jungle'
				}, {
					title: 'The big mountain',
					date: '30/8/2015',
					author: 'Margaret MacPerson'
				}
			]
		};

	};

	Page.prototype= new app.BasePage();
	Page.prototype.constructor= Page;


//	PAGE METHODS
///////////////////////////////////////////////////

	Page.prototype.show = function ( content ) {
		var template = app.templates['dynamic-example'];
		var html = template(this.content);
		content.innerHTML= html;
	}; 

	app.registerPage(pageId, Page);

}) (window, document, window.app, 'hbs');
