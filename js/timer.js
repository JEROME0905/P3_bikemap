var Timer = {

	init:function (reserver,infoReservation,minutes) {
		this.reserverElt = reserver;
		this.infoReservationElt = infoReservation;
		this.minutes = minutes;
		this.reserverCanvasElt = document.getElementById("signatureCanvas");
		this.lastTimesElt = document.getElementById("lastTimes");
		this.secondes = 00;
		objTimer = this;

	},


	initTimer:function(){
		objTimer.reserverElt.addEventListener("click",function(){
			objTimer.reserverCanvasElt.style.display = "none";

			ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=d9ce4a4ff8aee76cf49b9b8394047ea940b54c4d",function(reponse){

				
			});




			setInterval(objTimer.diminuerCompteur, 1000);
		});
	},

	diminuerCompteur: function() {
		var lastTimes = "";

		if((objTimer.secondes === 00) & (objTimer.minutes === 00)){
			// Supprimer l'animation;
		}

		else if(objTimer.secondes === 00) {
			objTimer.minutes = objTimer.minutes -1;
			objTimer.secondes = 59;
			lastTimes = objTimer.minutes + " min " + objTimer.secondes +"s";
		} 

		else {
			objTimer.secondes = objTimer.secondes -1;
			lastTimes = objTimer.minutes + " min " + objTimer.secondes +"s";
		}
		var nameStation = document.getElementById("nameStation").textContent;
		var nom = document.getElementById("nom").value;
		var prenom = document.getElementById("prenom").value;  
		// Mise à jour du DOM
		objTimer.infoReservationElt.textContent = "Vélo réservé à la station " +  nameStation + " par " + nom + " " + prenom;  
		objTimer.lastTimesElt.textContent = "Temps restant : " + lastTimes; 
	}

};