const info = document.querySelector('.info');
const cellules = document.querySelectorAll('.cell');

let verouillage = true;
let joueurEnCours = 'X'

info.innerHTML = `Au tour de ${joueurEnCours}`;

const alignementsGagnants = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

let partieEnCours = ["", "", "", "", "", "", "", "", ""]

cellules.forEach(cell => {
    cell.addEventListener('click', clickSurCase);
})

function clickSurCase(e) {
    const caseClique = e.target;
    const caseIndex = caseClique.getAttribute('data-index');

    if(partieEnCours[caseIndex] !== "" || !verouillage) {
        return;
    }

    partieEnCours[caseIndex] = joueurEnCours;
    caseClique.innerHTML = joueurEnCours;
    // console.log(partieEnCours);

    validationResultats()
}

function validationResultats() {

    let finDePartie = false;

    for(let i = 0; i < alignementsGagnants.length; i++) {

        const checkWin = alignementsGagnants[i];
        let a = partieEnCours[checkWin[0]];
        let b = partieEnCours[checkWin[1]];
        let c = partieEnCours[checkWin[2]];

        if(a === '' || b === '' || c === '') {
            continue;
        }
        if( a === b && b === c ) {
            finDePartie = true;
            break; //sortir de la condition et continuer ce qui suit
        }

    }

    if(finDePartie) {
        info.innerText = `Le joueur ${joueurEnCours} a gagné !`
        verouillage = false;
        return; //sortir complètement de la fonction
    }

    let matchNul = !partieEnCours.includes('');
    if(matchNul) {
        info.innerText = 'Match nul !'
        verouillage = false;
        return;
    }

    changementDeJoueur()

}




function changementDeJoueur() {
    joueurEnCours = joueurEnCours === "X" ? "O" : "X";
    info.innerText = `Au tour de ${joueurEnCours}`;
}