class ImagePaysageVersPortrait {



    constructor(imageSliders, tabImagesPaysage, tabImagesPortrait ) {
        this.imageSlidersElt = imageSliders;
        this.tabImagesPaysage = tabImagesPaysage;
        this.tabImagesPortrait = tabImagesPortrait;
    }



    initialisationImagePaysageVersPortrait() {
        // Changement du type d'image au lancement du site web
        this.changementDuTypeImage();

        // Changement du type d'image s'il y a une variation de la largeur d'écran 
       window.onresize = function() {
            this.changementDuTypeImage();
        }.bind(this);
    }



    changementDuTypeImage() {        
        let largeurEcran = window.innerWidth;

        for(let i =0; i < this.imageSlidersElt.length; i++) {
            if (largeurEcran <= 770)
                this.imageSlidersElt[i].src = this.tabImagesPortrait[i];
        
            if (largeurEcran > 770)
                this.imageSlidersElt[i].src = this.tabImagesPaysage[i];
        }
    }

}