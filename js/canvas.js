var Canvas = {

	initialisation: function(boutonReservation,signatureCanvas,btnAnnuler,nom,prenom) {
		// Définition des variables du DOM
		this.boutonReservationElt = boutonReservation;
		this.signatureCanvasElt = signatureCanvas;
		this.btnAnnulerElt = btnAnnuler;
		this.inputNomElt = nom;
		this.inputPrenomElt = prenom;
		
		// Initialisation du canvas
		this.canvasElt = document.getElementById("canvas");
		this.ctx = this.canvasElt.getContext("2d");

		this.drawing = false;
		canvasObj = this;
	},

	initCanvas: function() {
		// Lancement de la signature canvas.
		canvasObj.displayCanvas();
		canvasObj.hiddenCanvas();
		canvasObj.drawCanvas();

	},

	displayCanvas: function() {
		// Affiche le canvas si quelqu'un clique sur le btn réserver du formulaire.
		canvasObj.boutonReservationElt.addEventListener("click", function() {
			canvasObj.signatureCanvasElt.style.display = "flex";
			// Sauvegarde du prenom et du nom que l'utilisateur à tapé
			localStorage.setItem("Nom", canvasObj.inputNomElt.value);
			localStorage.setItem("Prenom" , canvasObj.inputPrenomElt.value);

			// Effacement du canvas
			canvasObj.ctx.clearRect(0,0,800,300);	
		});
	},

	hiddenCanvas: function () {
		// Cache le canvas si l'utilisateur appui sur le btn annuler.
		canvasObj.btnAnnulerElt.addEventListener("click", function() {
			canvasObj.signatureCanvasElt.style.display = "none";
		});
	},

	drawCanvas: function(){
		// Mise en forme du trait 
		canvasObj.ctx.strokeStyle = "red"; // Couleur du trait rouge
    	canvasObj.ctx.lineWidth = 2; // Définition de la taille du trait
		canvasObj.drawMouse(); 
		canvasObj.drawTouchscreen();
	},

	drawMouse: function() {
		// Btn de la souris enfoncé
    	canvasObj.canvasElt.addEventListener("mousedown", function (e) {
	        canvasObj.ctx.beginPath(); // Initialisation du tracé;
	        canvasObj.ctx.moveTo(e.offsetX, e.offsetY); // Permet de savoir ou commence le tracé
	        canvasObj.drawing = true;
    	});
    // Déplacement de la souris
    	canvasObj.canvasElt.addEventListener("mousemove", function (e) {
	      	// Si le bouton est enfoncé, dessine
	        if (canvasObj.drawing === true)
	            canvasObj.draw(e.offsetX, e.offsetY);
		        // offsetX sauvegarde la position horizontale
		        // offsetY sauvegarde la position verticale
		        // Aucun décalage avec la souris  
    	});
    // Btn souris relaché
    	canvasObj.canvasElt.addEventListener("mouseup", function (e) {
      		canvasObj.drawing = false;
    	});
	},

	drawTouchscreen: function(){
		// doigt appuyé sur l'écran
	    canvasObj.canvasElt.addEventListener("touchstart", function (e) {
	        canvasObj.drawing = true;
	        canvasObj.ctx.beginPath();
	        var touchX = e.touches[0].clientX - canvasObj.canvasElt.getBoundingClientRect().left;
	        var touchY = e.touches[0].clientY - canvasObj.canvasElt.getBoundingClientRect().top;
	        canvasObj.ctx.moveTo(touchX, touchY);
	        // empeche le scroll de l'écran
	        e.preventDefault();
	    });

	    // le doigt se déplace sur l'écran
	    canvasObj.canvasElt.addEventListener("touchmove", function (e) {
 			var touchX = e.touches[0].clientX - canvasObj.canvasElt.getBoundingClientRect().left;
	        var touchY = e.touches[0].clientY - canvasObj.canvasElt.getBoundingClientRect().top;
		    if (canvasObj.drawing === true)
		        canvasObj.draw(touchX, touchY);
		    e.preventDefault();
	    });
	    // Le doigt se retire de l'écran
	    canvasObj.canvasElt.addEventListener("touchend", function (e) {
		    canvasObj.drawing = false;
	    });
	},

	draw:function(x,y) {
		canvasObj.ctx.lineTo(x,y); // Ajout du segment.
	    canvasObj.ctx.stroke(); // dessine le contour du segment.
	}
};