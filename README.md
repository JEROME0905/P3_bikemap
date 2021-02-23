# P3 - Easy Bike - parcours développeur web junior

<br />

> ## Présentation du projet

<br />

Pour ce projet nous allons développer une page de type SPA (Single Page Application) simulant la réservation de vélos dans la ville de Lyon.

<br />

> ## Mockup de la page

<br />


<br />

> ## Cahier des charges : 

<br />

### Diaporama
* Le diaporama devra expliquer à l'utilisateur comment réserver un vélo dans la ville de Lyon
* Le diaporama passe automatiquement à la diaporama suivante toutes les 5 secondes
* L’utilisateur peut toutefois choisir de mettre le diaporama en pause
* Il peut également reculer ou avancer manuellement à l’aide d’un clic de souris, ainsi qu’avec les touches gauche et droite de son clavier

<br />

### Carte des Vélos
* En-­dessous du diaporama se trouve une carte affichant en temps réel la liste des stations de location de vélos ainsi que leur disponibilité
* La localisation de toutes les stations de vélos est affichée à l’aide de marqueurs
* La localisation et l'état de chaque station est fourni via la station la plateforme OpenData de JC Decaux
* Un clic sur un marqueur affiche l’état de la station dans un panneau construit en HTML et CSS à côté de la carte
* La carte doit être générée dynamiquement via un service de cartographie

<br />

### Réservation d'un vélo
* Il doit être possible de réserver un vélo disponible à la station sélectionnée en :
    * indiquant son nom et son prénom,
    * signant dans un champ libre implémenté à l’aide de l’API HTML5 Canvas
* Une fois la réservation validée,  un vélo est marqué comme réservé à cette station
* Les données de réservation seront stockées dans le navigateur à l’aide de l’API Web Storage et affichées en dessous du panneau
*  L'état de la réservation (s’il y en a une) est ainsi affiché, avec un décompte dynamique du temps restant avant expiration de la réservation
* Une réservation expire automatiquement au bout de 20 minutes et également lorsque le navigateur web se referme
* Le nom et le prénom sont toutefois conservés par le navigateur pour préremplir le formulaire de réservation lors d'un prochain usage, même si le navigateur a été fermé
* Il ne peut y avoir qu'une réservation à la fois. Si une nouvelle réservation a lieu, elle remplace la précédente.

<br />

> ## Règles du projet

<br />

###  Créer des objets simples en JavaScript, contenant des méthodes et des propriétés

* Le code JavaScript est développé en Orienté Objet
* Le diaporama est conforme et fonctionnel
* Aucun plugin n’est utilisé pour la logique de l’application (Diaporama, Canvas, Carte)

<br />

### Récupérer des données de formulaires en utilisant le langage JavaScript
* Le canvas est fonctionnel
* Le nom et prénom utilisent l’API LocalStorage
* Les informations de réservations utilisent l’API SessionStorage
* Les données de réservation sont affichées en dessous de la carte, s'il y a une réservation en cours

<br />

### Faire des requêtes HTTP en langage JavaScript
* La carte est récupérée dynamiquement depuis un web service cartographique
* Les informations sur les stations utilisent l’API Live de JC Decaux

<br />

###  Écrire un code source lisible

* Le code est correctement indenté
* Les noms de classes, de méthode et de variables sont explicites (indifféremment en français ou en anglais)
* Il y a une seule classe par fichier

<br />

> ## Fabriqué avec

<br />

* [HTML5](https://developer.mozilla.org/fr/docs/Web/Guide/HTML/HTML5) - Langage front
* [CSS3](https://developer.mozilla.org/fr/docs/Web/CSS) - Langage front
* [JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript) - Langage front
* [Visual Studio Code](https://code.visualstudio.com/) - IDE
* [Font Awesome](https://fontawesome.com/) - Icônes pour sites web
* [Bootstrap 4.6](https://getbootstrap.com/docs/4.6/getting-started/introduction/) - Framework CSS
* [Leaflet](https://leafletjs.com/) - Librairie JavaScript de cartographie
* [JCDecaux](https://developer.jcdecaux.com/#/home) - API pour connaitre la position de chaque vélo libre de service dans la ville de votre choix.

<br />

> ## Auteur

<br />

* **Jérôme Le Bail** _alias_ [@JEROME0905](https://github.com/JEROME0905)