var Maps = {

	marker:0,
	myIcon:0,

	initMaps: function(){
		/*Récuperation des données de la jcDecaux*/
		ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=d9ce4a4ff8aee76cf49b9b8394047ea940b54c4d",function(reponse){
		var tabJcdecauxLyon = JSON.parse(reponse);

		/*Initialisation de la carte */
		var mymap = L.map('bike-maps').setView([45.75, 4.85], 13);
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	    maxZoom: 18,
	    id: 'mapbox.streets',
	    accessToken: 'pk.eyJ1IjoiamVyb21lbGViYWlsMDkwNTE5OTMiLCJhIjoiY2pubGp6eTQ0MTM0bjNrczV5YnB1NnQ0cSJ9.J_ZfAyv-DJyBzb1h2NFFBw'
		}).addTo(mymap);
		// Nous définissons le dossier qui contiendra les marqueurs
		var iconBase = 'https://github.com/JEROME0905/P3_bikemap/blob/master/icons/bike.png';
		for (element in tabJcdecauxLyon) {
				myIcon = L.icon ({
				iconUrl: iconBase,
				iconSize: [50, 50],
				iconAnchor: [25, 50],
				popupAnchor: [-3, -76],
			});
			 marker = L.marker([tabJcdecauxLyon[element].position.lat,tabJcdecauxLyon[element].position.lng], { icon: myIcon }).addTo(mymap);
			 marker.bindPopup(element);
		}



		
		});
	}
};