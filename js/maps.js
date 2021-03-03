var Maps = {

	init: function(iconBaseVert,iconBaseRouge,iconBaseBleu,adresseElt,placesTotalElt,veloDispoElt,formulaireReservationElt,infoStationElt, stationFermmeeElt, reservationImpossibleElt, nomElt, prenomElt) {

		// Définition des différents markers
		this.iconBaseVert = iconBaseVert;
		this.iconBaseRouge = iconBaseRouge;
		this.iconBaseBleu = iconBaseBleu;

		this.iconChoisie ="";

		// definition des variables qui vont permettrent de récupérer la latitude d'un marker.
		this.latLng = "";
		this.lat1 = ""; 
		this.latMarker = "";

		// Définition des variables du DOM
		this.adresseElt = adresseElt;
		this.placesTotalElt = placesTotalElt;
		this.veloDispoElt = veloDispoElt;
		this.formulaireReservationElt = formulaireReservationElt;
		this.infoStationElt = infoStationElt;
		this.inputNomElt = nomElt;
		this.inputPrenomElt = prenomElt;


		this.stationFermmeeElt = stationFermmeeElt;
		this.reservationImpossibleElt = reservationImpossibleElt;

		// Récuperation des données de la jcDecaux
		this.tabJcdecauxLyon = ""; 

		/* Définition des variables contenant les mises à jour du DOM */
		this.adresse = "";
		this.place = "";
		this.veloDispo = "";
		obj = this;
	},

	initMaps: function() {
			/*Récuperation des données de la jcDecaux*/
		ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=d9ce4a4ff8aee76cf49b9b8394047ea940b54c4d",function(reponse) {

			// Récuperation des données de la jcDecaux
			obj.tabJcdecauxLyon = JSON.parse(reponse);

			// Initialisation de la carte
			var mymap = L.map('maps').setView([45.75, 4.85], 14); // Cordonnées de la ville de Lyon

			L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
				attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
				maxZoom: 18,
				id: 'mapbox/streets-v11',
				tileSize: 512,
				zoomOffset: -1,
				accessToken: 'pk.eyJ1IjoiamVyb21lNDVkd2pwMyIsImEiOiJja2w5dWpxYXkwcjV3MnJuMDJhcHJrcGF2In0.EOImOSC9SzgDUCy6OuxuQQ'
			}).addTo(mymap);
			
			// Ajout des marqueurs sur la carte 
			for (element in obj.tabJcdecauxLyon) {

				if ((obj.tabJcdecauxLyon[element].status === "OPEN") && (obj.tabJcdecauxLyon[element].available_bikes === 0))					
					obj.iconChoisie = obj.iconBaseBleu;	

 				else if (obj.tabJcdecauxLyon[element].status === "OPEN")
					obj.iconChoisie = obj.iconBaseVert;

				else					
					obj.iconChoisie = obj.iconBaseRouge;
			
					myIcon = L.icon ({
					iconUrl: obj.iconChoisie,
					iconSize: [39, 42],
					iconAnchor: [25, 50],
					popupAnchor: [-3, -76],
				});

				var marker = L.marker([obj.tabJcdecauxLyon[element].position.lat,obj.tabJcdecauxLyon[element].position.lng],{ icon: myIcon }).addTo(mymap).on('click', onClick);
				
				function onClick() { 

					// Récupération de la latitude et de la longitude du marker sur lequel on a cliqué.
					// Transformation de ces donnés en chaine de caractère String.

					obj.latLng = JSON.stringify(this.getLatLng());
					obj.lat1 = obj.latLng.split(','); // Récupération de la latitude   
					obj.latMarker = obj.lat1[0].split(':'); // Récupération des coordonnées de la latitude

					for (element in obj.tabJcdecauxLyon) {
						if (obj.latMarker[1] === JSON.stringify(obj.tabJcdecauxLyon[element].position.lat)) {

							if ((obj.tabJcdecauxLyon[element].status === "OPEN") && (obj.tabJcdecauxLyon[element].available_bikes === 0))
								obj.updateDOM("", "", "", "La station est ouverte mais aucun vélo n'est disponible");

							 else if(obj.tabJcdecauxLyon[element].status === "OPEN") {

								obj.adresse = obj.tabJcdecauxLyon[element].address;
								obj.place = obj.tabJcdecauxLyon[element].bike_stands;
								obj.veloDispo = " " + obj.tabJcdecauxLyon[element].available_bikes;
								obj.updateDOM(obj.adresse,obj.place,obj.veloDispo);

							} else
								obj.updateDOM("","","","La station est fermée. Sélectionner une autre station");	
						}
					}

					// Affichage du dernier prénom et nom tapé par l'utilisateur
					obj.inputPrenomElt.value = localStorage.getItem("Prenom");
					obj.inputNomElt.value = localStorage.getItem("Nom");

					
				};
			}
		});
	},

	updateDOM:function(textAdresse, textplacesTotal, textveloDispo, reservationImpossible) {
		
		if (textveloDispo.length > 0) {
			obj.infoStationElt.style.display = "block";
			obj.adresseElt.textContent = textAdresse;
			obj.placesTotalElt.textContent = textplacesTotal;
			obj.veloDispoElt.textContent = textveloDispo;

			obj.stationFermmeeElt.style.display = "none";
			obj.reservationImpossibleElt.textContent = "";
		}

		else {
			obj.stationFermmeeElt.style.display = "block";
			obj.reservationImpossibleElt.textContent = reservationImpossible;

			obj.infoStationElt.style.display = "none";
			obj.adresseElt.textContent = "";
			obj.placesTotalElt.textContent = "";
			obj.veloDispoElt.textContent = "";
		}

	}
};