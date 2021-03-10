/*Fonction ajax qui permet de récupérer des donneés*/
function ajaxGet(url, callback)
{
	var req = new XMLHttpRequest();
	req.open("GET", url);
	req.addEventListener("load", function (){
		if (req.status >= 200 && req.status < 400) {
			// Appelle la focntion callback en lui passant la reponse de la requête 
				callback(req.responseText);
		}
		else {
			console.error(req.status + " " + req.statusText + " " + url);
		}
	});
	req.addEventListener("error", function() {
		console.error("Erreur réseau avec l'URL" + url);
	});
	req.send(null);
};



// Execute un appel AJAX POST
// Prend en parametre l'URL cible, la donnée a envoyer et la fonction callback appelée en cas de succès 
// Le parametre isJson permet d'indiquer si l'envoi concerne des données JSON
function ajaxPost(url, data, callback, isJson){
	var req = new XMLHttpRequest();
	req.open("POST", url);
	req.addEventListener("load", function (){
		if (req.status >= 200 && req.status < 400) {
			// Appelle la fonction callback en lui passant la réponse de la requête
				callback(req.responseText);
		} else {
			console.error(req.status + " " + req.statusText + " " + url);
		}

	});
	req.addEventListener("error", function () {
		console.log("Erreur réseau avec l'URL " + url);
	});
		if (isJson) {
			// Définit le contenu de la requete comme etant du JSON
			req.setRequestHeader("Content-Type", "application/json");
			// Transforme la donnée du format JSON vers le format texte avant l'envoi
			data = JSON.stringify(data);
		}
		req.send(data);
}