class Slide {
	

	constructor (slidesElt, flecheGaucheElt, flecheDroiteElt, vitesseGauche, vitesseDroite, dernierePosition, compteur,temps,positionInitial,positionFinale,compteurFinal,play,pause) {
		this.slidesElt = slidesElt;
	 	this.flecheGaucheElt = flecheGaucheElt;
	 	this.flecheDroiteElt = flecheDroiteElt;
	 	this.vitesseGauche = vitesseGauche;
	 	this.vitesseDroite = vitesseDroite;
	 	this.dernierePosition = dernierePosition;
	 	this.compteur = compteur;
	 	this.temps = temps;
	 	this.positionInitial = positionInitial;
	 	this.positionFinale = positionFinale;
	 	this.compteurFinal = compteurFinal;
	 	this.slideAuto;
	 	this.play= play;
	 	this.pause=pause;
    }



    initialisationSlider() {

    	document.getElementById('slider-pause').addEventListener("click",this.miseEnPauseDuSlider.bind(this)); // Si clique sur logo pause arrêt du défilement automatique du slider.
	    
		this.flecheGaucheElt.addEventListener("click", this.deplacerBlocDroite.bind(this)); // Si clique sur chevron gauche défilement des slides à gauche.
		
		this.flecheDroiteElt.addEventListener("click", this.deplacerBlocGauche.bind(this)); // Si clique sur chevron droit défilement des slides à droite.
		
		document.addEventListener("keydown", function (e) { // Si appui sur les flèches gauche ou droite du clavier défilement des slides.
		    this.recuperationCodeClavier(e.code);
		}.bind(this));

		this.slideAuto = setInterval(this.deplacerBlocGauche,this.temps); // Défilement automatique des slides.
	}



	deplacerBlocGauche() {
	    if (this.dernierePosition === this.positionFinale) {
	    	this.dernierePosition = this.positionInitial;
	    	this.slidesElt.style.left = this.dernierePosition + "%";
	    }
	    else {
	    	this.slidesElt.style.left = (this.dernierePosition + this.vitesseGauche) + "%";
	    	this.dernierePosition = (this.dernierePosition + this.vitesseGauche);
	    }
	}



	deplacerBlocDroite() {
		if (this.dernierePosition === this.positionInitial) {
			// Ne rien faire pour une fois.		
	    }
	    else{
	    	this.slidesElt.style.left = (this.dernierePosition + this.vitesseDroite) + "%";
	    	this.dernierePosition = (this.dernierePosition + this.vitesseDroite);
	    }
	}



	recuperationCodeClavier(code) {
		switch (code) {
		    case "ArrowLeft": 
		    	this.deplacerBlocDroite();
		        break;
		    case "ArrowRight":
		    	this.deplacerBlocGauche();
		        break;
    	}
	}



	miseEnPauseDuSlider() {
	this.compteur++;
		if (this.compteur=== this.compteurFinal) {
			this.slideAuto = setInterval(this.deplacerBlocDroite,this.temps);
			this.compteur = 0;
			this.play.style.display = "none";
			this.pause.style.display = "block";
		} 
		else {
			clearInterval(this.slideAuto);
			this.pause.style.display = "none";
			this.play.style.display = "block";
		}
	}
}