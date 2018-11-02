var Maps = {

	init: function(iconBaseVert,iconBaseRouge,iconBaseBleu,adresseElt,placesTotalElt,veloDispoElt,formulaireReservationElt,infoStationElt){

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

		// Récuperation des données de la jcDecaux
		this.tabJcdecauxLyon = ""; 

		/* Définition des variables contenant les mises à jour du DOM */
		this.adresse = "";
		this.place = "";
		this.veloDispo = "";
		obj = this;
	},

	initMaps: function(){
			/*Récuperation des données de la jcDecaux*/
		ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=d9ce4a4ff8aee76cf49b9b8394047ea940b54c4d",function(reponse){

			// Récuperation des données de la jcDecaux
			obj.tabJcdecauxLyon = JSON.parse(reponse);
			
			/*Initialisation de la carte */
			var mymap = L.map('bike-maps').setView([45.75, 4.85], 14); // Cordonnées de la ville de Lyon

			L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		    maxZoom: 19,
		    id: 'mapbox.streets', // Affichage du nom des rue sur la carte 
		    accessToken: 'pk.eyJ1IjoiamVyb21lbGViYWlsMDkwNTE5OTMiLCJhIjoiY2pubGp6eTQ0MTM0bjNrczV5YnB1NnQ0cSJ9.J_ZfAyv-DJyBzb1h2NFFBw'
			}).addTo(mymap);
			
			// Ajout des marqueurs sur la carte 
			for (element in obj.tabJcdecauxLyon) {

				if ((obj.tabJcdecauxLyon[element].status === "OPEN") && (obj.tabJcdecauxLyon[element].available_bike_stands === 0))					
					obj.iconChoisie = obj.iconBaseBleu;	

 				else if (obj.tabJcdecauxLyon[element].status === "OPEN")
					obj.iconChoisie = obj.iconBaseVert;

				else					
					obj.iconChoisie = obj.iconBaseRouge;
			
					myIcon = L.icon ({
					iconUrl: obj.iconChoisie,
					iconSize: [30, 30],
					iconAnchor: [25, 50],
					popupAnchor: [-3, -76],
				});

				var marker = L.marker([obj.tabJcdecauxLyon[element].position.lat,obj.tabJcdecauxLyon[element].position.lng],{ icon: myIcon }).addTo(mymap).on('click', onClick);
				
				function onClick() {

					// Récupération de la latitude et de la longitude du marker sur lequel on a cliqué.
					// Transformation de ces donnés  en chaine de caractère String.

					obj.latLng = JSON.stringify(this.getLatLng());
					obj.lat1 = obj.latLng.split(','); // Récupération de la latitude   
					obj.latMarker = obj.lat1[0].split(':'); // Récupération des coordonnées de la latitude

					for (element in obj.tabJcdecauxLyon) {
						if (obj.latMarker[1] === JSON.stringify(obj.tabJcdecauxLyon[element].position.lat)) {

							if ((obj.tabJcdecauxLyon[element].status === "OPEN") && (obj.tabJcdecauxLyon[element].available_bike_stands === 0))
								obj.updateDOM("La station est ouverte mais aucun vélo n'est disponible","","");

							 else if(obj.tabJcdecauxLyon[element].status === "OPEN") {

								obj.adresse = "Adresse : " + obj.tabJcdecauxLyon[element].address;
								obj.place = " " + obj.tabJcdecauxLyon[element].bike_stands + " places";
								obj.veloDispo = " " + obj.tabJcdecauxLyon[element].available_bike_stands + " vélos disponibles";
								obj.updateDOM(obj.adresse,obj.place,obj.veloDispo);

							} else
								obj.updateDOM("La station est fermée. Sélectionner une autre station","","");	
						}
					}
				};

			}
		});
	},

	updateDOM:function(textAdresse, textplacesTotal, textveloDispo) {
		if (textplacesTotal.length > 0) {
			obj.infoStationElt.style.display = "block";
			obj.formulaireReservationElt.style.display = "block";
			obj.adresseElt.textContent = textAdresse.toLowerCase();
			obj.placesTotalElt.textContent = textplacesTotal.toLowerCase();
			obj.veloDispoElt.textContent = textveloDispo.toLowerCase();
		}	
		else {
			obj.infoStationElt.style.display = "block";
			obj.formulaireReservationElt.style.display = "none";
			obj.adresseElt.textContent = textAdresse;
			obj.placesTotalElt.textContent = textplacesTotal;
			obj.veloDispoElt.textContent = textveloDispo;
		}	
	}
};