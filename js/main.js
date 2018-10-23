
/* Création d'un objet slider*/
var slider = Object.create(Slide);

/*Définition des variables de l'objet slider*/
slider.initialisation(document.getElementById("slides"),document.getElementById("left_chevron"),document.getElementById("right_chevron"),-100,100,0,0,5000,0,-200,2);

/*Mise en route de l'objet slider*/
slider.initSlide();
	var maps = Object.create(Maps);
window.onload = function(){
	maps.initMaps();
};