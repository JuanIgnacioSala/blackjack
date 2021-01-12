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
let puntosComputadora = 0;
const puntosHTML = document.querySelectorAll('small');

//referencias
const cartasJugador = document.querySelector('#jugador-cartas')
const cartasComputadora = document.querySelector('#computadora-cartas')
const pedir = document.querySelector('#pedir');
const detener = document.querySelector('#detener');
const nuevo = document.querySelector('#nuevo');

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
    // -------------------------------------------------

//Turno de la computadora

const turnoComputadora = (puntosMin) => {

    do {

        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        cartasComputadora.append(imgCarta);

        if (puntosMin > 21) {
            break;
        }

    } while (puntosComputadora < puntosMin && (puntosMin <= 21));

    setTimeout(() => {
        if (puntosMin > puntosComputadora && puntosMin <= 21) {
            alert('Ganaste Genio !!');
        } else if (puntosMin === puntosComputadora) {
            alert('Nadie Gana');
        } else if (puntosComputadora > 21) {
            alert('Ganaste Genio !!');
        } else {
            alert('Compu Wins');
        }
    }, 10);
}

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
        detener.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn('21, puntaje perfecto.');
        pedir.disabled = true;
        detener.disabled = true;
        turnoComputadora(puntosJugador);
    }
});

detener.addEventListener('click', () => {
    pedir.disabled = true;
    detener.disabled = true;
    turnoComputadora(puntosJugador);

});



nuevo.addEventListener('click', () => {
    console.clear();
    deck = [];
    crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    cartasJugador.innerHTML = '';
    cartasComputadora.innerHTML = '';

    pedir.disabled = false;
    detener.disabled = false;

});