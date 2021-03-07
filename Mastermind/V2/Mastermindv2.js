let colonne=0;
let tour=0;
let tab_adv_alt=[]
let tab_adv = [getRandomInt(4),getRandomInt(4),getRandomInt(4),getRandomInt(4)];
let tab_joueur = [];
let tab_joueur_alt = [];
let ctx;

function drawBoard(){
    let hauteur = 960;
    let canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');

        ctx.fillStyle='#dcdde1';
        ctx.fillRect(0, 0,360, 960);
        ctx.strokeRect(0, 0,360, 960);
        for(let i = 0; i<13;i++){
            hauteur = hauteur-80;
            ctx.beginPath();
            ctx.moveTo(0, hauteur);
            ctx.lineTo(360, hauteur);
            ctx.closePath();
            ctx.stroke();
            ctx.font ='15px arial';

        }
    }
}

function placerPion(couleur){
    let hauteurP;
    let colonneP;
    hauteurP= 900-80*tour;
    colonneP= 30+90*colonne
    if(colonne<4){
        switch(couleur){
            case 0:
                ctx.drawImage(document.getElementById('rougeP'), 0, 0,700,700,colonneP,hauteurP,40,40);
                break;
           case 1:
                ctx.drawImage(document.getElementById('bleuP'), 0, 0,700,700,colonneP,hauteurP,40,40);
                break;
           case 2:
                ctx.drawImage(document.getElementById('vertP'), 0, 0,700,700,colonneP,hauteurP,40,40);
                break;
           case 3:
                ctx.drawImage(document.getElementById('jauneP'), 0, 0,700,700,colonneP,hauteurP,40,40);
                break;
            case 50 :
                ctx.fillStyle='#dcdde1';
                ctx.fillRect(30+90*0,hauteurP,40,40);
                ctx.fillRect(30+90*1,hauteurP,40,40);
                ctx.fillRect(30+90*2,hauteurP,40,40);
                ctx.fillRect(30+90*3,hauteurP,40,40);
                break;
            default:
                break;
        }

    }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function ajouterCouleur(couleur){$
    if(tour==12){
        perdu();
    }
    let newLength = tab_joueur.push(couleur);
    placerPion(couleur);
    colonne++;
    if(colonne>4){
        var removedItem = tab_joueur.splice(4);
        colonne = 4;
    }
}   

function modifier(){
    tab_joueur = [];
    colonne = 0;
    placerPion(50);
}


function verification(){
    if (colonne<4) {return}
    for(i = 0; i<4; i++){
        tab_adv_alt[i]=tab_adv[i];
        tab_joueur_alt[i]=tab_joueur[i];
    }
    let bon=0;
    let mal_place=0;
    let mal_place_tot=0;
    let j=0;
    for(let i = 0; i<4; i++){
        if (tab_joueur[i]==tab_adv_alt[i]){
            bon++;
            tab_adv_alt[i]=-1;
            tab_joueur_alt[i]=-2;
        }
    }
    if (bon==4){
        victoire();
    }
    else{
        for(i = 0; i<4; i++){
            for (j=0; j<4; j++) {
                if (tab_joueur_alt[i]==tab_adv_alt[j]){
                    mal_place=1;
                    tab_adv_alt[j]=-1;
                    break;
                }
            }
            mal_place_tot=mal_place_tot+mal_place;
            mal_place = 0;
        }
    }
    verif_graphique(mal_place_tot, bon);
    tour++;
    colonne=0;
    tab_joueur = [];
    tab_adv_alt = [];
    tab_joueur_alt = [];
}

function victoire(){
    window.alert("Bravo vous avez gagné !");
    location.reload();
}

function perdu(){
    window.alert("Dommage, vous avez perdu...");
    location.reload();
}

function verif_graphique(mal_place, bon){
    tot=mal_place+bon;
    let i =0;
    for(i;i<bon;i++){
        ctx.drawImage(document.getElementById('rougeP'), 0, 0,700,700,390+25*(i-1),920-80*tour,20,20);
    }
    for(i;i<tot;i++){
        ctx.drawImage(document.getElementById('malPlace'), 0, 0,700,700,390+25*(i-1),920-80*tour,20,20);
    }
}