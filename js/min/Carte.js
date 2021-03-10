class Carte {

    constructor (iconBaseVert, iconBaseRouge, iconBaseBleu, adresseElt, placesTotalElt, veloDispoElt, formulaireReservationElt, infoStationElt, stationFermmeeElt, reservationImpossibleElt, nomElt, prenomElt) {
        // Définition des différents markers
        this.iconBaseVert = iconBaseVert;
        this.iconBaseRouge = iconBaseRouge;
        this.iconBaseBleu = iconBaseBleu;

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
        this.tabJcdecauxLyon = this.recuperationDesdonnneesDeLaJcdecaux(); 
        this.iconChoisie ="";

        // definition des variables qui vont permettrent de récupérer la latitude d'un marker.
        this.latLng = "";
        this.lat1 = ""; 
        this.latMarker = "";

        /* Définition des variables contenant les mises à jour du DOM */
        this.adresse = "";
        this.place = "";
        this.veloDispo = "";
    }


    getThis() {
        return this;
    }


    initilisationDeLaCarte() {
        let carteLyon;
        console.log(this);
        console.log(this.tabJcdecauxLyon)
        this.creationDeLaCarte(carteLyon);
        this.ajoutDesMarkersSurLaCarte(carteLyon);
    }


    recuperationDesdonnneesDeLaJcdecaux () {
        let jcdecauxLyon;
       ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=d9ce4a4ff8aee76cf49b9b8394047ea940b54c4d",function(reponse) {
        jcdecauxLyon =  JSON.parse(reponse);
        console.log(jcdecauxLyon);
        }); 
        console.log(jcdecauxLyon);
        return jcdecauxLyon;
    }


    creationDeLaCarte(carteLyon) {

        // Initialisation de la carte
        carteLyon = L.map('maps').setView([45.75, 4.85], 14); // Cordonnées de la ville de Lyon

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: 'pk.eyJ1IjoiamVyb21lNDVkd2pwMyIsImEiOiJja2w5dWpxYXkwcjV3MnJuMDJhcHJrcGF2In0.EOImOSC9SzgDUCy6OuxuQQ'
        }).addTo(carteLyon);
    }



    ajoutDesMarkersSurLaCarte(carteLyon) {
        for (element in this.tabJcdecauxLyon) {

            if ((this.tabJcdecauxLyon[element].status === "OPEN") && (this.tabJcdecauxLyon[element].available_bikes === 0))					
            this.iconChoisie = this.iconBaseBleu;	

             else if (this.tabJcdecauxLyon[element].status === "OPEN")
             this.iconChoisie = this.iconBaseVert;

            else					
            this.iconChoisie = this.iconBaseRouge;
        
                myIcon = L.icon ({
                iconUrl: this.iconChoisie,
                iconSize: [39, 42],
                iconAnchor: [25, 50],
                popupAnchor: [-3, -76],
            });

            let marker = L.marker([this.tabJcdecauxLyon[element].position.lat, this.tabJcdecauxLyon[element].position.lng],{ icon: myIcon }).addTo(carteLyon).on('click', cliqueSurUnMarkker.bind(this));
        }
    }


    cliqueSurUnMarkker() { 

        // Récupération de la latitude du marker sur lequel on a cliqué.
        // Transformation de ces donnés en chaine de caractère String.

        this.latLng = JSON.stringify(this.getLatLng());
        console.log(this.latLng);
        this.lat1 = this.latLng.split(','); // Récupération de la latitude   
        console.log(this.lat1);
        this.latMarker = this.lat1[0].split(':'); // Récupération des coordonnées de la latitude
        console.log(this.latMarker);
        for (element in this.tabJcdecauxLyon) {
            if (this.latMarker[1] === JSON.stringify(this.tabJcdecauxLyon[element].position.lat)) {

                if ((this.tabJcdecauxLyon[element].status === "OPEN") && (this.tabJcdecauxLyon[element].available_bikes === 0))
                this.miseAjourDom("", "", "", "La station est ouverte mais aucun vélo n'est disponible");

                 else if(this.tabJcdecauxLyon[element].status === "OPEN") {

                    this.adresse = this.tabJcdecauxLyon[element].address;
                    this.place = this.tabJcdecauxLyon[element].bike_stands;
                    this.veloDispo = " " + this.tabJcdecauxLyon[element].available_bikes;
                    this.miseAjourDom(this.adresse,this.place,this.veloDispo);
                    this.affichageDuDernierPrenomEtNomTapeParUtilisateur();

                } else
                this.miseAjourDom("","","","La station est fermée. Sélectionner une autre station");	
            }
        }
		
    }



    affichageDuDernierPrenomEtNomTapeParUtilisateur() {
        this.inputPrenomElt.value = localStorage.getItem("Prenom");
        this.inputNomElt.value = localStorage.getItem("Nom");			
    }




    miseAjourDom(textAdresse, textplacesTotal, textveloDispo, reservationImpossible) {
		
		if (textveloDispo.length > 0) {
			this.infoStationElt.style.display = "block";
			this.adresseElt.textContent = textAdresse;
			this.placesTotalElt.textContent = textplacesTotal;
			this.veloDispoElt.textContent = textveloDispo;

			this.stationFermmeeElt.style.display = "none";
			this.reservationImpossibleElt.textContent = "";
		}

		else {
			this.stationFermmeeElt.style.display = "block";
			this.reservationImpossibleElt.textContent = reservationImpossible;

			this.infoStationElt.style.display = "none";
			this.adresseElt.textContent = "";
			this.placesTotalElt.textContent = "";
			this.veloDispoElt.textContent = "";
		}

	}
} 