// L'évènement load permet d'exécuter le code JavaScript une fois que le code html de la page est chargée.
window.addEventListener('load', function () {

    let slider = new Slider(document.getElementById("slides"),document.getElementById("left_chevron"),document.getElementById("right_chevron"),-100,100,0,0,5000,0,-400,2,document.getElementById("play"),document.getElementById("pause"));
    slider.initialisationSlider(); // Mise en route de l'objet slider.

    let carte = new Carte('images/velo-vert.png','images/velo-rouge.png','images/velo-bleu.png',document.getElementById("adresse"),document.getElementById("nbr-places"),document.getElementById("nbr-velo-dispo"),document.getElementById("formulaireReservation"),document.getElementById("infoStation"),document.getElementById("station-fermee"), document.getElementById("reservation-impossible"),document.getElementById("nom"),document.getElementById("prenom"));
    carte.initilisationDeLaCarte(); // Mise en route de l'objet carte.

    let canvas = new Canvas(document.getElementById("reservation-impossible"),document.getElementById("boutonReservation"),document.getElementById("signatureCanvas"),document.getElementById("annuler"),document.getElementById("nom"),document.getElementById("prenom"));
    canvas.initialisationCanvas(); // Lancement de l'objet canvas.

    let timer = new Timer(document.getElementById("reserver"),document.getElementById("nom-station"),document.getElementById("nom-utilisateur"),document.getElementById("signatureCanvas"),document.getElementById("lastTimes"),20);
    timer.initialisationTimer(); // Lancement de l'objet timer.

    let imagePaysageVersPortrait = new ImagePaysageVersPortrait(document.getElementsByClassName("imagesSlider"), ["slider/paysage/Slide-01.jpg", "slider/paysage/Slide-02.jpg", "slider/paysage/Slide-03.jpg", "slider/paysage/Slide-04.jpg", "slider/paysage/Slide-05.jpg"], ["slider/portrait/Slide-01.jpg", "slider/portrait/Slide-02.jpg", "slider/portrait/Slide-03.jpg", "slider/portrait/Slide-04.jpg", "slider/portrait/Slide-05.jpg"]);
    imagePaysageVersPortrait.initialisationImagePaysageVersPortrait(); // Lancement de L'objet imagePaysageVersPortrait.
});