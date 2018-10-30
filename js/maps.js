var Maps = {

	initMaps: function(){
			/*Récuperation des données de la jcDecaux*/
		ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=d9ce4a4ff8aee76cf49b9b8394047ea940b54c4d",function(reponse){
		
		// Délcaration des variables
			// Récuperation des données de la jcDecaux
			var tabJcdecauxLyon = JSON.parse(reponse);

			// Définition des différents markers
			var iconBaseVert = 'icons/bike-vert.png';
			var iconBaseRouge = 'icons/bike-rouge.png';
			var inconBaseBleu = 'icons/bike-bleu.png'

			var iconChoisie;
			// definition des variables qui vont permettrent de récupérer la latitude d'un marker.
			var latLng;
			var lat1; 
			var latMarker;

			// Définition des variables du DOM
			var adresseElt = document.getElementById("adresse");
			var placesTotalElt = document.getElementById("nbr-places");
			var veloDispoElt = document.getElementById("nbr-velo-dispo");
			var formulaireReservationElt = document.getElementById("formulaireReservation");
			var infoStationElt = document.getElementById("infoStation");	

			/* Définition des variables contenant les mises à jour du DOM */
			var adresse;
			var place;
			var veloDispo;


			/*Initialisation de la carte */
			var mymap = L.map('bike-maps').setView([45.75, 4.85], 14); // Cordonnées de la ville de Lyon

			L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
		    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		    maxZoom: 19,
		    id: 'mapbox.streets', // Affichage du nom des rue sur la carte 
		    accessToken: 'pk.eyJ1IjoiamVyb21lbGViYWlsMDkwNTE5OTMiLCJhIjoiY2pubGp6eTQ0MTM0bjNrczV5YnB1NnQ0cSJ9.J_ZfAyv-DJyBzb1h2NFFBw'
			}).addTo(mymap);
			
			// Ajout des marqueurs sur la carte 
			for (element in tabJcdecauxLyon) {

				if ((tabJcdecauxLyon[element].status === "OPEN") && (tabJcdecauxLyon[element].available_bike_stands === 0)){
					iconChoisie = inconBaseBleu;	
				} else if(tabJcdecauxLyon[element].status === "OPEN"){
					iconChoisie = iconBaseVert;
				}
				else {
					iconChoisie = iconBaseRouge;
				}			
					myIcon = L.icon ({
					iconUrl: iconChoisie,
					iconSize: [30, 30],
					iconAnchor: [25, 50],
					popupAnchor: [-3, -76],
				});

				var marker = L.marker([tabJcdecauxLyon[element].position.lat,tabJcdecauxLyon[element].position.lng],{ icon: myIcon }).addTo(mymap).on('click', onClick);
				function onClick(){
					// Récupération de la latitude et de la longitude du marker sur lequel on a cliqué.
					// Transformation de ces donnés  en chaine de caractère String.

					latLng = JSON.stringify(this.getLatLng());
					lat1 = latLng.split(','); // Récupération de la latitude   
					latMarker = lat1[0].split(':'); // Récupération des coordonnées de la latitude

					for (element in tabJcdecauxLyon) {
						if (latMarker[1] === JSON.stringify(tabJcdecauxLyon[element].position.lat)) {

							if ((tabJcdecauxLyon[element].status === "OPEN") && (tabJcdecauxLyon[element].available_bike_stands === 0)) {

								updateDOM("La station est ouverte mais aucun vélo n'est disponible","","");

							} else if(tabJcdecauxLyon[element].status === "OPEN") {

								adresse = "Adresse : " + tabJcdecauxLyon[element].address;
								place = " " + tabJcdecauxLyon[element].bike_stands + " places";
								veloDispo = " " + tabJcdecauxLyon[element].available_bike_stands + " vélos disponibles";
								updateDOM(adresse,place,veloDispo);

							} else {

								updateDOM("La station est fermée. Sélectionner une autre station","","");

							}
						}
					}
				};

				function updateDOM (textAdresse, textplacesTotal, textveloDispo) {
					if (textplacesTotal.length > 0) {
						infoStationElt.style.display = "block";
						formulaireReservationElt.style.display = "block";
						adresseElt.textContent = textAdresse.toLowerCase();
						placesTotalElt.textContent = textplacesTotal.toLowerCase();
						veloDispoElt.textContent = textveloDispo.toLowerCase();
					}	
					else {
						infoStationElt.style.display = "block";
						formulaireReservationElt.style.display = "none";
						adresseElt.textContent = textAdresse;
						placesTotalElt.textContent = textplacesTotal;
						veloDispoElt.textContent = textveloDispo;
					}	
				};
			}
		});
	}
};