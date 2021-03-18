class Carte {


    constructor (iconBaseVert, iconBaseRouge, iconBaseBleu, adresseElt, placesTotalElt, veloDispoElt, formulaireReservationElt, infoStationElt, stationFermmeeElt, reservationImpossibleElt, nomElt, prenomElt) {
        
        // Définition des différents markers.
        this.iconBaseVert = iconBaseVert;
        this.iconBaseRouge = iconBaseRouge;
        this.iconBaseBleu = iconBaseBleu;

        // Définition des variables du DOM.
        this.adresseElt = adresseElt;
        this.placesTotalElt = placesTotalElt;
        this.veloDispoElt = veloDispoElt;
        this.formulaireReservationElt = formulaireReservationElt;
        this.infoStationElt = infoStationElt;
        this.inputNomElt = nomElt;
        this.inputPrenomElt = prenomElt;
        this.stationFermmeeElt = stationFermmeeElt;
        this.reservationImpossibleElt = reservationImpossibleElt;
        this.iconChoisie ="";
        
        // Définition des variables qui vont permettrent de récupérer la latitude d'un marker.
        this.latitudeLongitude = "";
        this.latitudeMarker = ""; 

        // Définition des variables contenant les mises à jour du DOM. 
        this.adresse = "";
        this.place = "";
        this.veloDispo = "";

        // Création d'une instance de la classe Ajax pour récupérer les donneés des stations de la ville de Lyon. 
        this.ajax = new Ajax();

        // La variable qui va contenir la carte de Lyon.
        this.carteLyon;
    }



    initilisationDeLaCarte() {

        this.ajax.get("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=d9ce4a4ff8aee76cf49b9b8394047ea940b54c4d", function(reponse) {

            let tabJcdecauxLyon = JSON.parse(reponse); // récupération des données de l'api Jcdecaux de la ville de Lyon.
            this.creationDeLaCarte();
            
        // Ajout des marqueurs sur la carte. 
			for (let element in tabJcdecauxLyon) {

				if ((tabJcdecauxLyon[element].status === "OPEN") && (tabJcdecauxLyon[element].available_bikes === 0))					
					this.iconChoisie = this.iconBaseBleu;	
 				else if (tabJcdecauxLyon[element].status === "OPEN")
					this.iconChoisie = this.iconBaseVert;
				else					
					this.iconChoisie = this.iconBaseRouge;
					let myIcon = L.icon ({
					iconUrl: this.iconChoisie,
					iconSize: [39, 42],
					iconAnchor: [25, 50],
					popupAnchor: [-3, -76],
				});

				let marker = L.marker([tabJcdecauxLyon[element].position.lat,tabJcdecauxLyon[element].position.lng],{ icon: myIcon }).addTo(this.carteLyon).on('click', cliqueSurUnMarker.bind(this));
            }
				
                function cliqueSurUnMarker(e) { 
					this.latitudeLongitude = JSON.stringify(e.latlng); // Récupération  et conversion de la latitude et de la longitude du marker sur lequel on a cliqué en String.
                    sessionStorage.setItem("latitudeLongitude", this.latitudeLongitude); // Stockage de la latitude et de la longitude dans sessionStorage.
					this.latitudeMarker = this.latitudeLongitude.split(','); // Récupération de la latitude.   
					this.latitudeMarker = this.latitudeMarker[0].split(':'); // Récupération des coordonnées de la latitude.
					for ( let i in tabJcdecauxLyon) {
						if (this.latitudeMarker[1] === JSON.stringify(tabJcdecauxLyon[i].position.lat)) {
							if ((tabJcdecauxLyon[i].status === "OPEN") && (tabJcdecauxLyon[i].available_bikes === 0))
								this.miseAjourDomInfoStation("", "", "", "La station est ouverte mais aucun vélo n'est disponible");
                            else if(tabJcdecauxLyon[i].status === "OPEN") {
								this.adresse = tabJcdecauxLyon[i].address;
								this.place = tabJcdecauxLyon[i].bike_stands;
								this.veloDispo = " " + tabJcdecauxLyon[i].available_bikes;
								this.miseAjourDomInfoStation(this.adresse,this.place,this.veloDispo);
                                this.affichageDuDernierPrenomEtNomTapePartUtilisateur();
							} else
								this.miseAjourDomInfoStation("","","","La station est fermée. Sélectionner une autre station");	
						}
					}
				}
			
        }.bind(this));
    }


    
    creationDeLaCarte() {
        this.carteLyon = L.map('maps').setView([45.75, 4.85], 14); // Cordonnées de la ville de Lyon.
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiamVyb21lNDVkd2pwMyIsImEiOiJja2w5dWpxYXkwcjV3MnJuMDJhcHJrcGF2In0.EOImOSC9SzgDUCy6OuxuQQ'
        }).addTo(this.carteLyon);
    }



    affichageDuDernierPrenomEtNomTapePartUtilisateur() {
        this.inputPrenomElt.value = localStorage.getItem("Prenom");
        this.inputNomElt.value = localStorage.getItem("Nom");	
    }


   
    miseAjourDomInfoStation(textAdresse, textplacesTotal, textveloDispo, reservationImpossible) {
		if (textveloDispo.length > 0) {
			this.infoStationElt.style.display = "block";
			this.stationFermmeeElt.style.display = "none";
			this.adresseElt.textContent = textAdresse;
			this.placesTotalElt.textContent = textplacesTotal;
			this.veloDispoElt.textContent = textveloDispo;
			this.reservationImpossibleElt.textContent = "";
		} else {
			this.stationFermmeeElt.style.display = "block";
            this.infoStationElt.style.display = "none";
			this.adresseElt.textContent = "";
			this.placesTotalElt.textContent = "";
			this.veloDispoElt.textContent = "";
            this.reservationImpossibleElt.textContent = reservationImpossible;
		}
	}
} 