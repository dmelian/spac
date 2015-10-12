//file: basepage.js
( function(window, document, app, undefined) {

/* ¿ Cuando creamos y quitamos los eventos ?
	------------------------------------------
	Los creamos en el show (al mismo tiempo que creamos los objetos dom).
	Los destruimos en el hide (al mismo tiempos que destruimos los objeetos dom).
*/

	var BasePage= function(){
		this.stackable= true; //TODO Pages not stackables (don't push it on the stack)
	
	};

	BasePage.prototype.open= function(){ 
		/* LLamado al crear la página en la pila. 
		Sólo se llama la primera vez.
		Se puede utilizar para registrar eventos, acciones y cualquier otra cosa necesaria para la inicialización
		*/
	};
	
	BasePage.prototype.canClose= function(){
		/* LLamado antes de cerrar para pedir permiso.
		*/
		return true;
	};
	
	BasePage.prototype.close= function(){
		/* Llamado cuando se quita de la pila.
		Por si hay algo que se tenga que destruir.
		*/
	};
	
	BasePage.prototype.show= function( content ){
	/* Metodo especialmente creado para crear los elementos dom y mostrar la página 
		Damos de alta los eventos necesarios sobre estos elementos.
	*/
	};
	
	BasePage.prototype.hide= function(){
	/* El framework se carga todo el contenido de la página automáticamente antes de cargar otra.
		No hace falta eliminar los elementos dom creados en el show.
		Lo que si tenemos que hacer es quitar nuestros callbacks de la cadena de eventos.
	*/
	};

	window.app.BasePage= BasePage;



}) (window, document, window.app);
