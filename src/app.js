//file: app.js
( function(window, document, undefined) {

	var App= function(){
		var myself= this;

		this.actions= {};
		this.pageClasses= {};
		this.pageStack= [];
		this.changingLocationHash= false;
		this.msgCount= 0;
		this.msgDuration= 3000; // milliseconds
		this.domId= 0;
		
//	APP CALLBACKS
///////////////////////////////////////////////////
		
		
		// METODOS DE EVENTOS EN LOS QUE THIS ES UN NODO DEL DOM, Y MYSELF ES ENTONCES EL PUNTERO AL OBJETO
		
		// Closure para gestionar los eventos y que tengan acceso al objeto (this)
		this.eventDispatcher= function( evt ){

			switch( evt.type ){
				case "hashchange": 
					if (! myself.changingLocationHash ) myself.openPage( window.location.hash.slice(1) );
					else myself.changingLocationHash= false;
					break;
				
				case "popstate":
					//TODO: Eventos de cambios en el historial de navegación (se pulso atras o alante)
					//TODO: ¿Como tratar el historial?. Back = close = pop. Forward = no hace nada.
					//SE EJECUTA ESTE EVENTO CADA VEZ QUE EL USUARIO CAMBIA EL LOCATION DE FORMA MANUAL,
					// mirar el objeto window.history.
					// Podría sincronizarse con la pila? -> no porque mezcla todo el historial de la sesión actual (en cualquier dominio).
					// Además no tiene opción para recorrerlo. Entiendo que lo que debemos hacer es limpiar la pila y dejar main y la entrada manual.
					myself.sendMessage( 'Manual page. History length:' + window.history.length, "debugBar" );
					break;
				
				case "blur":
					if ( evt.target.id ) myself.sendMessage( 'Blur con id:' + evt.target.id );
					//Hemos encontrado un jallo. No se necesitan montar eventos por los formularios.
					//Con uno a nivel de window va que se mata. Todo le llega. !!!!!
					// Me equivoqué la última vez !!!!
					break;
					
				case "error":
					//id del dom donde se originó : evt.srcElement.id
					alert('error');
					break;

				default:
					myself.setError( "Error: unregister event of type: " + evt.type );
					//console.log("Error: unregister event of type: " + evt.type);
			}
		};

		this.executeAction= function( evt ){
			switch (this.id) {
			
				case 'login': case 'exit': case 'about': case 'help':
					myself.sendMessage( "Ha seleccionado la acción: <b>" + this.id + "</b>" );
					break;
					
				case 'close':
					myself.closeCurrentPage();
					break;
					
				default: myself.openPage( this.id );
			}
		};

		this.timeoutCallback= function(){
			myself.msgCount--;
			if (! myself.msgCount ) {
				var sb= document.getElementById("statusBar");
				sb.innerHTML= "";
			}
		};
		

	};

// ACTIONS
////////////////////////////////////////////////////

	App.prototype.addAction= function( id, caption, callback ){
		if ( caption === undefined ) caption= id;
		this.actions[id]= {id: id, caption: caption, action: callback};
	};

//	PAGES
///////////////////////////////////////////////////

	App.prototype.openPage= function( id, params ){
	
		var stackTop= this.pageStack.length - 1;
		var page;

		if ( id in this.pageClasses ){
			if ( stackTop >= 0 ) {
				if ( 'hide' in this.pageStack[stackTop] ) this.pageStack[stackTop].hide();
			}
			
			this.cleanPageContent();
			
			params= params || {};
			page= new this.pageClasses[id]( params );
			page.open(); //TODO THINK to pass de params on open not on the constructor
			stackTop= this.pageStack.push ( page );
			page.locationHash= window.location.hash; //We get the hash to use it later.
			page.show( document.getElementById("content") ); 
			this.showStackStatus();
			return true;
			//TODO: Si no pudiera abrirse retorna falso y desapila y show el top anterior.
		
		} else {
			if ( id in this.templates ) {
				page= new this.hbsPage();
				page.open( id, params );
				stackTop= this.pageStack.push ( page );
				page.locationHash= window.location.hash; 
				page.show( document.getElementById("content") ); 
				this.showStackStatus();
				return true;
			
			} else {
				this.setError('No se encuentra la página: ' + id);
				return false;
			}
		} 
		
	};


	App.prototype.closeCurrentPage= function(){
	//TODO Change the window location hash acording to the new current page.
	//TODO What about back and forward browser buttons?

		var stackTop= this.pageStack.length - 1;
		var page;

		if (stackTop >= 1) {
			if ( 'canClose' in this.pageStack[stackTop] && !this.pageStack[stackTop].canClose() ) {
				this.setError( 'No se puede cerrar la página actual');
				return false; //Error: Can't close.
				
			} else {
				page= this.pageStack.pop(); stackTop--;
				page.hide();
				page.close();
				this.cleanPageContent();

				this.pageStack[stackTop].show( document.getElementById("content") );
				this.updateLocationHash( this.pageStack[stackTop].locationHash );
				this.showStackStatus();
				return true;
			}
		} else {
			this.setError( 'Está en la única página de la aplicación, no se puede cerrar' );
			return false; //Error: no current page to close, there is only one page on the stack.
		}

	};
	

	App.prototype.showStackStatus= function(){
		var stackStatus,i,s=' [';
		stackStatus= 'Stack Status: ' + this.pageStack.length + ' pages:';
		for (i= 0; i < this.pageStack.length; i++) { stackStatus+= s + this.pageStack[i]['id']; s= ', '; }
		stackStatus+= ']';
		this.sendMessage(stackStatus);
	};

	App.prototype.registerPage= function(id, pageClass){
		this.pageClasses[id]= pageClass;
	};
	
	App.prototype.unregisterPageClass= function(id){ 
		//Only for update or limit storage porpouses.
		//TODO:
	};

//	DOM
///////////////////////////////////////////////////

		
	App.prototype.cleanPageContent= function(){
		document.getElementById("content").innerHTML="";
	};

	App.prototype.getNewId= function(){
		return (++this.domId);
	};

//	LOCATION HASH
///////////////////////////////////////////////////


	App.prototype.updateLocationHash= function( newLocationHash ){
		if (window.location.hash != newLocationHash) {
			this.changingLocationHash= true;
			window.location.hash= newLocationHash;
		}
	};


// LOG
//////////////////////////////////////////////////////////////

	App.prototype.sendMessage= function(htmlMsg, barId){
		var sb;
		//TODO: Poner un contador por barId para borrar por cada un de los lugares donde se pinta.
		if (typeof barId == 'undefined') barId= "statusBar";
		sb= document.getElementById( barId );
		sb.innerHTML= htmlMsg;
		this.msgCount++;
		window.setTimeout(this.timeoutCallback, this.msgDuration);
	};


	App.prototype.setError= function(errMsg){
		this.sendMessage(errMsg);
	};

// INITIALIZATION
//////////////////////////////////////////////////////////////


	App.prototype.init= function( initialPage ){

		//TODO: poner esto como un bucle y una lista de eventos.
		window.addEventListener('hashchange', this.eventDispatcher, false); //use capture= false
		window.addEventListener('popstate', this.eventDispatcher, false); //use capture= false
		window.addEventListener('error', this.eventDispatcher, true);
		window.addEventListener('blur', this.eventDispatcher, true);

//		body= document.getElementsByTagName('body')[0];
//		body.addEventListener('blur', this.eventDispatcher, true); 
// si lo hacemos así el evento se ejecuta como si fuera body. Perdiendo la información del control

/* Para quitar el evento:
		window.removeEventListener('hashchange', process);
*/
		//TODO. the application is reponsible for the document - title
		//TODO. The page is responsible for the titlebar.
		document.title= "SPAC";
		document.getElementById("titleBar").innerHTML= "Single Page Application Client";

		//App actions.
		this.addAction("login");
		this.addAction("help");
		this.addAction("about");
		this.addAction("close");

		for (var id in this.actions) {
			var button= document.createElement("button");
			button.innerHTML= this.actions[id].caption;
			button.id= this.actions[id].id;
			button.addEventListener("click", this.executeAction, false);
			document.getElementById("toolBar").appendChild(button);
		}
		//TODO: Si no existe o no está registrada la página inicial, coger la primera.
		if ( initialPage === undefined ) initialPage = 'main';
		window.location.hash="#"+ initialPage;
		
	};

//	PUBLIC API.
/////////////////////////////////////////////////////////////////////////
	//TODO: Poner como argumento del closure el dominio (o mirarlo desde el nombre del fichero)
	// y convertir esto en algo automático, y no en un boilderplate de cada fichero.

	window.app= new App();

}) (window, document);






