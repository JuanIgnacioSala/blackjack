/**
 * C = Trebol
 * D = Diamantes
 * H = Corazones
 * S = Picas
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['J', 'Q', 'K', 'A']

let puntosJugador = 0;
let puntosComputador = 0;
const puntosHTML = document.querySelectorAll('small');

//referencias
const cartasJugador = document.querySelector('#jugador-cartas')
const cartasComputadoras = document.querySelector('#computadora-cartas')
const pedir = document.querySelector('#pedir');

//creamos un nuevo Deck
const crearDeck = () => {

    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    for (let tipo of tipos) {
        for (let esp of especiales) {
            deck.push(esp + tipo);
        }
    }

    // console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);

    return deck;
}
crearDeck();

//Tomar una carta
const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'NO HAY MAS CARTAS';
    }
    const card = deck.pop();
    return card;

};
//pedirCarta();

//Valores de las Cartas
const valorCarta = (card) => {

        const valor = card.substring(0, card.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10 :
            valor * 1;

    }
    // let puntos = 0;
    // if (isNaN(valor)) {
    //     puntos = (valor === 'A') ? 11 : 10;
    // } else {
    //     console.log('es un numero');
    //     puntos = valor * 1;

// }
// console.log(puntos);


//eventos
pedir.addEventListener('click', () => {

    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    cartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        console.warn('Perdiste');
        pedir.disabled = true;
    } else if (puntosJugador === 21) {
        console.warn('21, Joya');
        pedir.disabled = true;
    }


})