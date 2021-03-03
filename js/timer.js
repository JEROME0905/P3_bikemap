var Timer = {

	init:function (reserver, nomStation, nomUtilisateur, reserverCanvas, lastTimes, minutes) {
		// Définition des variables du DOM.
		this.reserverElt = reserver;
		this.nomStationElt = nomStation;
		this.nomUtilisateurElt = nomUtilisateur;
		this.reserverCanvasElt = reserverCanvas;
		this.lastTimesElt = lastTimes;

		// Définitions des variables pour faire le compteur. 
		this.minutes = minutes;
		this.secondes = 00;
		  
		// Défintion de la variable qui sauvegarder le temps imparti.
		this.newTimes = minutes;

		// Définition de la variable compteur pour relancer le compteur au début si nouvelle réservation.
		this.compteur = 0;

		// Définition de la variable qui va lancer l'animation pour le compteur.
		this.chrono = "";

		// Défintion des variables qui vont contenir les informations définies dans le formulaire.
		this.nameStation = "";
		this.nom = "";
		this.prenom = "";

		objTimer = this;

	},

	dataJcdecaux: function() {
		ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=d9ce4a4ff8aee76cf49b9b8394047ea940b54c4d",function(reponse) {
			// Récupération des données de la ville de Lyon.
			var tabJcdecauxLyon = JSON.parse(reponse);
			// Récupération de l'adresse de la gare contenu dans le formulaire.
			var adresse = document.getElementById("adresse").textContent;

			for (element in obj.tabJcdecauxLyon) {
				// Si l'adresse saisi dans le formulaire correspond à une adresse dans la ville de Lyon récupération du nom de la gare.
				if (adresse === tabJcdecauxLyon[element].address) {
					objTimer.nameStation = tabJcdecauxLyon[element].name;
					objTimer.nameStation = objTimer.nameStation.split('-');
					// sauvegarde du nom de la station
					objTimer.nameStation = objTimer.nameStation[1];
					sessionStorage.setItem("nameStation",objTimer.nameStation);
				}
			}
			// Lancement de l'animation qui va permetre de mettre en place le temps imparti de 20 minutes.
			objTimer.chrono = setInterval(objTimer.diminuerCompteur, 1000); 
		});
	},

	initTimer:function() {
			// Initialisation de la variable time;
			var time = 0;

		if (sessionStorage.getItem("actualiser") === "oui") {
			// Recuperation des animations contenu dans le session storage pour relancer l'animation
			objTimer.nameStation = sessionStorage.getItem("nameStation");
			objTimer.nom = sessionStorage.getItem("nom");
			objTimer.prenom = sessionStorage.getItem("prenom");
			objTimer.minutes = sessionStorage.getItem("minutes");
			objTimer.secondes = sessionStorage.getItem("secondes");
			objTimer.chrono = setInterval(objTimer.diminuerCompteur, 1000);
			time++;
		}

		objTimer.reserverElt.addEventListener("click",function() {
			// Récupération du nom et du prenom saisi par l'utilisateur dans le formulaire de réservation
			objTimer.nom = document.getElementById("nom").value;
			objTimer.prenom = document.getElementById("prenom").value;
			sessionStorage.setItem("nom",objTimer.nom);
			sessionStorage.setItem("prenom",objTimer.prenom);

			// Si clique sur btn réserver du canvas celui n'est plus affiché.
			objTimer.reserverCanvasElt.style.display = "none";


			// Si nouvelle réservation arrète animation session storage.	
			if (time > 0) {
				time = 0;
				objTimer.minutes = objTimer.newTimes;
				objTimer.secondes = 00;
				clearInterval(objTimer.chrono);
			}

			// Si nouvelle réservation supprime ancienne animation.
			if (objTimer.compteur > 0) {
				objTimer.minutes = objTimer.newTimes;
				objTimer.secondes = 00;
				clearInterval(objTimer.chrono);
			}

			objTimer.dataJcdecaux();
			objTimer.compteur++;
		});
	},



	diminuerCompteur: function() {
		var lastTimes = "";

		// Si le compte à rebours se termine
		if((objTimer.secondes === 00) & (objTimer.minutes === 00)) {
			// Mise à jour du DOM
			objTimer.nomStationElt.textContent = "";
			objTimer.nomUtilisateurElt.textContent = "";
			
			objTimer.lastTimesElt.textContent = "";
			// Supression de l'animation.
			clearInterval(objTimer.chrono);
			// Le session storage ne se lancera pas car plus de compte à rebour
			// Rien à sauvegarde 
			sessionStorage.setItem("actualiser","non");
		}
		else if(objTimer.secondes === 00) {
			// Mise à jour des minutes et des secondes
			objTimer.minutes = objTimer.minutes -1;
			objTimer.secondes = 59;

			// Mise à jour du session storage
			sessionStorage.setItem("actualiser","oui");
			sessionStorage.setItem("minutes",objTimer.minutes);
			sessionStorage.setItem("secondes",objTimer.secondes);

			// Mise à jour du compte à rebours
			lastTimes = objTimer.minutes + " min " + objTimer.secondes +"s";

			// Mise à jour du DOM  
			objTimer.nomStationElt.textContent = objTimer.nameStation;
			objTimer.nomUtilisateurElt.textContent = objTimer.prenom + " " + objTimer.nom;
			objTimer.lastTimesElt.textContent = lastTimes; 
		} 
		else {
			// Mise à jour des secondes
			objTimer.secondes = objTimer.secondes -1;
			
			// Mise à jour du session storage
			sessionStorage.setItem("actualiser","oui");
			sessionStorage.setItem("secondes",objTimer.secondes);
			sessionStorage.setItem("minutes",objTimer.minutes);

			// Mise à jour du compte à rebours
			lastTimes = objTimer.minutes + " min " + objTimer.secondes +"s";

			// Mise à jour du DOM  
			objTimer.nomStationElt.textContent = objTimer.nameStation;
			objTimer.nomUtilisateurElt.textContent = objTimer.prenom + " " + objTimer.nom;
			objTimer.lastTimesElt.textContent = lastTimes; 
		}
	},
};