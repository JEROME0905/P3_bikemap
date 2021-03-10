class Canvas {



    constructor(reservationImpossibleElt, boutonReservation, signatureCanvas, btnAnnuler, nom, prenom) {
        // Les variables du DOM
		this.reservationImpossibleElt = reservationImpossibleElt;
		this.boutonReservationElt = boutonReservation;
		this.signatureCanvasElt = signatureCanvas;
		this.btnAnnulerElt = btnAnnuler;
		this.inputNomElt = nom;
		this.inputPrenomElt = prenom;

		// Variables liées au canvas
		this.canvasElt = document.getElementById("canvas");
		this.ctx = this.canvasElt.getContext("2d");
		this.dessin = false;
    }


	
    initialisationCanvas() {
		this.affichageDuCanvas();
		this.cacherLeCanvasSiUtilisateurAppuiSurLeBtnAnnuler();
		this.miseEnFormeDuTrait();
	}



	affichageDuCanvas() {
		// Affiche le canvas si quelqu'un clique sur le btn réserver du formulaire.
		this.boutonReservationElt.addEventListener("click", function(event) {
			if( (this.inputNomElt.value.length === 0) || (this.inputPrenomElt.value.length === 0) || 
			(this.reservationImpossibleElt.textContent === "La station est fermée. Sélectionner une autre station" ) ||
			(this.reservationImpossibleElt.textContent === "La station est ouverte mais aucun vélo n'est disponible") ) {
				event.preventDefault;
			} else {
				this.signatureCanvasElt.style.display = "flex";
				// Sauvegarde du prenom et du nom que l'utilisateur à tapé
				localStorage.setItem("Nom", this.inputNomElt.value);
				localStorage.setItem("Prenom" , this.inputPrenomElt.value);
				// Effacement du canvas
				this.ctx.clearRect(0,0,800,300);	
			}
		}.bind(this));
	}



    cacherLeCanvasSiUtilisateurAppuiSurLeBtnAnnuler() {
		this.btnAnnulerElt.addEventListener("click", function() {
			this.signatureCanvasElt.style.display = "none";
		}.bind(this));
	}

	

    miseEnFormeDuTrait() {
		this.ctx.strokeStyle = "white"; // Couleur du trait
    	this.ctx.lineWidth = 1; // Taille du trait
		this.dessinerAvecLaSouris(); 
		this.dessinerAvecLeDoigt();
	}



	dessinerAvecLaSouris() {
		// Btn de la souris enfoncé
        this.canvasElt.addEventListener("mousedown", function (e) {
	        this.ctx.beginPath(); // Initialisation du tracé;
	        this.ctx.moveTo(e.offsetX, e.offsetY); // Permet de savoir ou commence le tracé
	        this.dessin = true;
    	}.bind(this));
		// Déplacement de la souris
		this.canvasElt.addEventListener("mousemove", function (e) {
	      	// Si le bouton est enfoncé, on dessine
	        if (this.dessin === true)
            	this.dessiner(e.offsetX, e.offsetY);  // offsetX sauvegarde la position horizontale, offsetY sauvegarde la position verticale
		        // Aucun décalage avec la souris  
    	}.bind(this));
		// Btn souris relaché
		this.canvasElt.addEventListener("mouseup", function (e) {
			this.dessin = false;
		}.bind(this));
	}



	dessinerAvecLeDoigt() {
		// doigt appuyé sur l'écran
	    this.canvasElt.addEventListener("touchstart", function (e) {
	        this.dessin = true;
	        this.ctx.beginPath();
	        var touchX = e.touches[0].clientX - this.canvasElt.getBoundingClientRect().left;
	        var touchY = e.touches[0].clientY - this.canvasElt.getBoundingClientRect().top;
	        this.ctx.moveTo(touchX, touchY);
	        // empeche le scroll de l'écran
	        e.preventDefault();
	    }.bind(this));
	    // le doigt se déplace sur l'écran
	    this.canvasElt.addEventListener("touchmove", function (e) {
 			var touchX = e.touches[0].clientX - this.canvasElt.getBoundingClientRect().left;
	        var touchY = e.touches[0].clientY - this.canvasElt.getBoundingClientRect().top;
		    if (this.dessin === true)
            this.dessiner(touchX, touchY);
		    e.preventDefault();
	    }.bind(this));
	    // Le doigt se retire de l'écran
	    this.canvasElt.addEventListener("touchend", function (e) {
		    this.dessin = false;
	    }.bind(this));
	}



    dessiner (x, y) {
		this.ctx.lineTo(x,y); // Ajout du segment.
	    this.ctx.stroke(); // dessine le contour du segment.
	}
}