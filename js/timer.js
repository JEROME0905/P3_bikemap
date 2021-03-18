class Timer {

	constructor(reserver, nomStation, nomUtilisateur, reserverCanvas, dernierTemps, minutes) {
		// Définition des variables du DOM.
		this.reserverElt = reserver;
		this.nomStationElt = nomStation;
		this.nomUtilisateurElt = nomUtilisateur;
		this.reserverCanvasElt = reserverCanvas;
		this.dernierTempsElt = dernierTemps;

		// Boolean pour savoir si l'utilisateur vient d'actualiser la page web.
		this.actualisationPageWeb;

		// Affiches les minutes et les secondes restantes. 
		this.minutes = minutes;
		this.secondes = 0o0;
		  
		// Contient le temps accordé à l'utilisateur (20 minutes) pour que celui-ci puisse retirer son vélo de la station.
		this.tempsReservation = minutes;

		// Permet de savoir si l'utilisateur a relancé une nouvelle réservation avant la fin du compte à rebours de l'ancienne réservation.
		this.compteur = 0;

		// Définition de la variable qui va lancer le compte à rebours.
		this.chrono = "";

		// Les variables qui vont contenir les informations définies dans le formulaire.
		this.nomStation = "";
		this.nom = "";
		this.prenom = "";

		// Création d'une instance de la classe Ajax pour récupérer les donneés des stations de la ville de Lyon. 
		this.ajax = new Ajax();
	}


	
	initialisationTimer() {
		this.actualisationPageWeb = 0;
		this.actualisation();
		this.reserverElt.addEventListener("click", this.validationReservation.bind(this));
	}



	validationReservation() {
	// Récupération du nom et du prénom saisi par l'utilisateur dans le formulaire de réservation
		this.nom = document.getElementById("nom").value;
		this.prenom = document.getElementById("prenom").value;
		sessionStorage.setItem("nom",this.nom);
		sessionStorage.setItem("prenom",this.prenom);

	// Si clique sur btn réserver du canvas celui n'est plus affiché.
		this.reserverCanvasElt.style.display = "none";

	// Si l'utilisateur vient d'actualiser la page web et relance une réservation => suppression de l'animation en cours et ré-initialisation des variables du temps.
	// Si l'utilisateur relance une réservation avant la fin du compte à rebours ou une fois le compte à rebours finit => suppression de l'animation en cours et ré-initialisation des variables du temps.
		if ( (this.actualisationPageWeb > 0) || (this.compteur > 0) )  {
			this.actualisationPageWeb = 0;
			this.minutes = this.tempsReservation;
			this.secondes = 0o0;
			clearInterval(this.chrono); // Arrête l'animation
		}
		this.dataJcdecaux();
		this.compteur++;
	} 



	actualisation() {
		if (sessionStorage.getItem("actualiser") === "oui") {
		// Récupération des éléments contenus dans le session storage pour relancer l'animation.
			this.nomStation = sessionStorage.getItem("nomStation");
			this.nom = sessionStorage.getItem("nom");
			this.prenom = sessionStorage.getItem("prenom");
			this.minutes = sessionStorage.getItem("minutes");
			this.secondes = sessionStorage.getItem("secondes");
			this.chrono = setInterval(this.diminuerCompteur.bind(this), 1000);
			this.actualisationPageWeb++;
		}
	}



	dataJcdecaux() {

		this.ajax.get("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=d9ce4a4ff8aee76cf49b9b8394047ea940b54c4d",function(reponse) {
			
		// Récupération des données de la ville de Lyon.
			let tabJcdecauxLyon = JSON.parse(reponse);

		// Récupération de la latitude et de la longitude du marker sur lequel le client a cliqué pour pouvoir récupérer le nom de la station.
			let latitudeLongitude =  sessionStorage.getItem("latitudeLongitude");

			for (let element in tabJcdecauxLyon) {
				if (latitudeLongitude === JSON.stringify(tabJcdecauxLyon[element].position)) {  
					this.nomStation = tabJcdecauxLyon[element].name;
					this.nomStation = this.nomStation.split('-');
				// Sauvegarde du nom de la station
					this.nomStation = this.nomStation[1];
					sessionStorage.setItem("nomStation",this.nomStation);
				}
			}
			// Lancement de l'animation qui va permettre de mettre en place le temps imparti de 20 minutes.
			this.chrono = setInterval(this.diminuerCompteur.bind(this), 1000); // Le temps est exprimé en milliseconde.
		}.bind(this));
	}



	diminuerCompteur() {
		let dernierTemps = "";
		// Si le compte à rebours se termine
		if((this.secondes === 0o0) & (this.minutes === 0o0))
			this.finDuCompteArebours();
		else if (this.secondes === 0o0)
			this.miseAjourDesMinutesEtDesSecondes(dernierTemps);
		else {
			this.miseAjourDesSecondes(dernierTemps);
		}
	}



	finDuCompteArebours() {
	// Mise à jour du DOM.
		this.nomStationElt.textContent = "";
		this.nomUtilisateurElt.textContent = "";
		this.dernierTempsElt.textContent = "";
	// Suppression de l'animation.
		clearInterval(this.chrono);
	// Rien à sauvegarder dans le sessionStorage. 
		sessionStorage.setItem("actualiser","non");
	}



	miseAjourDesMinutesEtDesSecondes(dernierTemps) {
		this.minutes = this.minutes -1;
		this.secondes = 59;
		this.miseAjourSessionStorage();
		dernierTemps = this.minutes + " min " + this.secondes + "s";
		this.miseAjourDuDom(dernierTemps);
	}



	miseAjourDesSecondes(dernierTemps) {
		this.secondes = this.secondes -1;
		this.miseAjourSessionStorage();
	// Mise à jour du compte à rebours.
		dernierTemps = this.minutes + " min " + this.secondes + "s";
		this.miseAjourDuDom(dernierTemps);
	}



	miseAjourSessionStorage() {
		sessionStorage.setItem("actualiser","oui");
		sessionStorage.setItem("secondes",this.secondes);
		sessionStorage.setItem("minutes",this.minutes);
	}



	miseAjourDuDom(dernierTemps) {
		this.nomStationElt.textContent = this.nomStation;
		this.nomUtilisateurElt.textContent = this.prenom + " " + this.nom;
		this.dernierTempsElt.textContent = dernierTemps;
	}
}