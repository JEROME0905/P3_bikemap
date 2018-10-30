var Slide = {
	
	that: 0,

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

    initSlide: function () {
    	document.getElementById('slider-pause').addEventListener("click",that.sliderPause);
	    that.flecheGaucheElt.addEventListener("click", that.deplacerBlocGauche);
		that.flecheDroiteElt.addEventListener("click", that.deplacerBlocDroite);
		document.addEventListener("keydown", function (e) {
		    that.slideToMove(e.code);
		});
		that.slideAuto = setInterval(that.deplacerBlocGauche,that.time);
	},

/* Déplacement du bloc sur la gauche*/  
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

/* Déplacement du bloc sur la droite*/ 
	deplacerBlocDroite: function() {
		if (that.lastPosition === that.initialPosition) {
			//Ne rien faire pour une fois		
	    }
	    else{
	    	that.slidesElt.style.left = (that.lastPosition + that.vitesseDroite) + "%";
	    	that.lastPosition = (that.lastPosition + that.vitesseDroite);
	    }
	},

	slideToMove: function(code) {
	    console.log(code);
		switch (code) {
		    case "ArrowLeft": 
		    	that.deplacerBlocGauche();
		        break;
		    case "ArrowRight":
		    	that.deplacerBlocDroite();
		        break;
    	}
	},

	sliderPause: function() {
	that.compteur++;
	// console.log(that.compteur);  
		if (that.compteur=== that.finalCompteur) {
			that.slideAuto = setInterval(that.deplacerBlocGauche,that.time);
			that.compteur=0;
			that.play.style.display = "none";
			that.pause.style.display = "block";
		} 
		else {
			clearInterval(that.slideAuto);
			that.pause.style.display = "none";
			that.play.style.display = "block";
		}
	// console.log(that.time);
	}

};
