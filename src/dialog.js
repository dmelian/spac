//file: dialog.js
( function(window, document, app, undefined) {

//	var appDialog;
	
	var Dialog= function(){
		var myself= this;

		this.open= function(title, content, actions){
			var body, dlg, el;

			body= document.getElementsByTagName("body")[0];

			// insert the background
			// TODO: Check if it already exists
	
			this.background= document.createElement("div");
			this.background.className= "dlg-lock-page";
			body.appendChild(this.background);
	
			// open the dialog
	
			this.container= document.createElement("div");
			this.container.className= "dlg-window-size";
			dlg= document.createElement("div");
			dlg.className= "dlg-container";

			el= document.createElement("div"); el.className='dlg-header'; 
			el.appendChild( document.createTextNode(title) );
			dlg.appendChild(el);
		

			el= document.createElement("div"); el.className='dlg-content'; 
			//el.appendChild( document.createTextNode(content) );
			el.innerHTML= content;
			dlg.appendChild(el);

			el= document.createElement("div"); el.className='dlg-footer';
			this.closeButton= document.createElement("button");
			this.closeButton.addEventListener("click", myself.close, false);
			this.closeButton.appendChild(document.createTextNode('Ok'));
			el.appendChild(this.closeButton);
			dlg.appendChild(el);

			this.container.appendChild(dlg);
			body.appendChild(this.container);
		};
	
		this.close= function(){
			var body;

			body= document.getElementsByTagName("body")[0];
		
			myself.closeButton.removeEventListener("click", myself.close, false);
			body.removeChild(myself.container);
			body.removeChild(myself.background);
		};

	};
	
	Dialog.prototype.showMessage= function(msgHtml, title){
		if ( typeof title == 'undefined' ) title= 'INFO';
		this.open(title, msgHtml);
	};

//	PUBLICS

//	appDialog= new Dialog(); // An application dialog object, for the use of the functions directly 
//	window.app.showMessage= appDialog.showMessage.bind(appDialog);

//	window.app.Dialog= Dialog; // Also you can use the class 
	window.app.dlg= new Dialog();

}) (window, document, window.app);
