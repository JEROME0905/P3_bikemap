// Création d'un objet slider
var slider = Object.create(Slide);

// Définition des variables de l'objet slider
slider.initialisation(document.getElementById("slides"),document.getElementById("left_chevron"),document.getElementById("right_chevron"),-100,100,0,0,5000,0,-200,2,document.getElementById("play"),document.getElementById("pause"));

// Mise en route de l'objet slider
slider.initSlide();


// Création d'un objet slide
var maps = Object.create(Maps);

// Définition des variables de l'objet maps
maps.init('icons/bike-vert.png','icons/bike-rouge.png','icons/bike-bleu.png',document.getElementById("adresse"),document.getElementById("nbr-places"),document.getElementById("nbr-velo-dispo"),document.getElementById("formulaireReservation"),document.getElementById("infoStation"),document.getElementById("nom"),document.getElementById("prenom"));

// Mise en route de l'objet maps
maps.initMaps();


// Création d'un objet canvas
var canvas = Object.create(Canvas);

// Définition des variables de l'objet canvas
canvas.initialisation(document.getElementById("boutonReservation"),document.getElementById("signatureCanvas"),document.getElementById("annuler"),document.getElementById("nom"),document.getElementById("prenom"));

// Lancement de l'objet canvas
canvas.initCanvas();


// Création d'un objet timer
var timer = Object.create(Timer);

// Définition des variables de l'objet timer
timer.init(document.getElementById("reserver"),document.getElementById("information-reservation"),document.getElementById("signatureCanvas"),document.getElementById("lastTimes"),20);

// Lancement de l'objet timer
timer.initTimer();