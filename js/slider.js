var Slide = {
	
	// Initisalisation des variables de l'objet
	initialisation: function(slidesElt, flecheGaucheElt, flecheDroiteElt, vitesseGauche, vitesseDroite, lastPosition, compteur,time,initialPosition,finalPosition,finalCompteur,play,pause) {
		this.slidesElt = slidesElt;
	 	this.flecheGaucheElt = flecheGaucheElt;
	 	this.flecheDroiteElt = flecheDroiteElt;
	 	this.vitesseGauche = vitesseGauche;
	 	this.vitesseDroite = vitesseDroite;
	 	this.lastPosition = lastPosition;
	 	this.compteur = compteur;
	 	this.time = time;
	 	this.initialPosition = initialPosition;
	 	this.finalPosition = finalPosition;
	 	this.finalCompteur = finalCompteur;
	 	this.slideAuto;
	 	this.play= play;
	 	this.pause=pause;
	 	that = this;
    },

    // Mise en route de l'objet
    initSlide: function () {
    	// Si clique sur logo pause arret du défilement automatique du slider
    	document.getElementById('slider-pause').addEventListener("click",that.sliderPause);
	    
	    // Si clique sur chevron gauche défilement des slides a gauche
	    that.flecheGaucheElt.addEventListener("click", that.deplacerBlocDroite);

		 // Si clique sur chevron droit défilement des slides a droite
		that.flecheDroiteElt.addEventListener("click", that.deplacerBlocGauche);
		
		// Si appui sur les fleches gauche ou droite du clavier defilement des slides
		document.addEventListener("keydown", function (e) {
		    that.slideToMove(e.code);
		});

		// 	Défilement automatique des slides.
		that.slideAuto = setInterval(that.deplacerBlocGauche,that.time);
	},

	// Déplacement du bloc sur la gauche /  
	deplacerBlocGauche: function() {
	    if (that.lastPosition === that.finalPosition) {
	    	that.lastPosition = that.initialPosition;
	    	that.slidesElt.style.left = that.lastPosition + "%";
	    }
	    else {
	    	that.slidesElt.style.left = (that.lastPosition + that.vitesseGauche) + "%";
	    	that.lastPosition = (that.lastPosition + that.vitesseGauche);
	    }
	},

	//Déplacement du bloc sur la droite
	deplacerBlocDroite: function() {
		if (that.lastPosition === that.initialPosition) {
			// Ne rien faire pour une fois		
	    }
	    else{
	    	that.slidesElt.style.left = (that.lastPosition + that.vitesseDroite) + "%";
	    	that.lastPosition = (that.lastPosition + that.vitesseDroite);
	    }
	},

	// Récupération du code clavier et lancement de la méthode adaptée
	slideToMove: function(code) {
		switch (code) {
		    case "ArrowLeft": 
		    	that.deplacerBlocGauche();
		        break;
		    case "ArrowRight":
		    	that.deplacerBlocDroite();
		        break;
    	}
	},

// Mise en pause du slider
	sliderPause: function() {
	that.compteur++;
		if (that.compteur=== that.finalCompteur) {
			that.slideAuto = setInterval(that.deplacerBlocDroite,that.time);
			that.compteur=0;
			that.play.style.display = "none";
			that.pause.style.display = "block";
		} 
		else {
			clearInterval(that.slideAuto);
			that.pause.style.display = "none";
			that.play.style.display = "block";
		}
	}

};
