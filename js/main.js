
// L'évènement load permet d'exécuter le code JavaScript une fois que le code html de la page est chargée.
window.addEventListener('load', function () {

    // Création d'un objet slider
    //var slider = Object.create(Slide);

    // Définition des variables de l'objet slider
    //slider.initialisation(document.getElementById("slides"),document.getElementById("left_chevron"),document.getElementById("right_chevron"),-100,100,0,0,5000,0,-200,2,document.getElementById("play"),document.getElementById("pause"));

    // Mise en route de l'objet slider
    /*slider.initSlide();*/

    let carte = new Carte('images/velo-vert.png','images/velo-rouge.png','images/velo-bleu.png',document.getElementById("adresse"),document.getElementById("nbr-places"),document.getElementById("nbr-velo-dispo"),document.getElementById("formulaireReservation"),document.getElementById("infoStation"),document.getElementById("station-fermee"), document.getElementById("reservation-impossible"),document.getElementById("nom"),document.getElementById("prenom"));
    carte.initilisationDeLaCarte(); // Mise en route de l'objet carte.

    let canvas = new Canvas(document.getElementById("reservation-impossible"),document.getElementById("boutonReservation"),document.getElementById("signatureCanvas"),document.getElementById("annuler"),document.getElementById("nom"),document.getElementById("prenom"));
    canvas.initialisationCanvas(); // Lancement de l'objet canvas.

    let timer = new Timer(document.getElementById("reserver"),document.getElementById("nom-station"),document.getElementById("nom-utilisateur"),document.getElementById("signatureCanvas"),document.getElementById("lastTimes"),20);
    timer.initialisationTimer(); // Lancement de l'objet timer.
});