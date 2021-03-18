class Ajax {
    get(url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", url); // Définition du type de requête.
        xhr.send(null); // Envoie de la requête.

    // L'évènement onload se déclenche lorsqu'une XMLHttpRequesttransaction se termine avec succès.
        xhr.onload = function() {
            if (xhr.status != 200)
                alert("La requête a échoué");
            else
                callback(xhr.responseText);
        }
    // onerror se déclenche lorsque la requête n’a pas pu aboutir.
        xhr.onerror = function() {
            alert("Erreur " + xhr.status + " : " + xhr.statusText); // On affiche le statut et le message correspondant de l'erreur.
        }
    }    
}