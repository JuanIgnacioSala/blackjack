    /**
     * C = Trebol
     * D = Diamantes
     * H = Corazones
     * S = Picas
     */

    const modulo = (() => {
        'use strict';
        'esversion: 6';

        let deck = [];
        const tipos = ['C', 'D', 'H', 'S'],
            especiales = ['J', 'Q', 'K', 'A'];

        // let puntosJugador = 0,
        //     puntosComputadora = 0;
        let puntosJugadores = [];

        //referencias
        const pedir = document.querySelector('#pedir'),
            detener = document.querySelector('#detener'),
            nuevo = document.querySelector('#nuevo');

        const divCartasJugadores = document.querySelectorAll('.divCartas'),
            puntosHTML = document.querySelectorAll('small');


        //Aca inicializamos el juego
        const iniciarJuego = (jugadores = 2) => {

            deck = crearDeck();
            puntosJugadores = [];

            for (let i = 0; i < jugadores; i++) {
                puntosJugadores.push(0);
            }


            puntosHTML.forEach(elem => elem.innerText = 0);
            divCartasJugadores.forEach(elem => elem.innerHTML = '');


            pedir.disabled = false;
            detener.disabled = false;
        };

        //creamos un nuevo Deck
        const crearDeck = () => {

            deck = [];

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
            return _.shuffle(deck);
        };

        //Tomar una carta
        const pedirCarta = () => {

            if (deck.length === 0) {
                throw 'NO HAY MAS CARTAS';
            }
            return deck.pop();

        };


        //Valores de las Cartas
        const valorCarta = (carta) => {

            const valor = carta.substring(0, carta.length - 1);
            return (isNaN(valor)) ?
                (valor === 'A') ? 11 : 10 :
                valor * 1;
        };

        //Turno: 0 = primer jugador // ultimo jugador es siempre la cpu
        const acumularPuntos = (carta, turno) => {
            puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
            puntosHTML[turno].innerText = puntosJugadores[turno];
            return puntosJugadores[turno];
        }

        const crearCarta = (carta, turno) => {

            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('carta');
            divCartasJugadores[turno].append(imgCarta);

        };

        const determinarGanador = () => {

            const [puntosMin, puntosComputadora] = puntosJugadores;

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
            }, 20);
        }


        //Turno de la computadora
        const turnoComputadora = (puntosMin) => {

            let puntosComputadora = 0;

            do {
                const carta = pedirCarta();
                puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
                crearCarta(carta, puntosJugadores.length - 1);

                if (puntosMin > 21) {
                    break;
                }
            } while (puntosComputadora < puntosMin && (puntosMin <= 21));
            determinarGanador();
        }


        //eventos
        pedir.addEventListener('click', () => {

            const carta = pedirCarta();
            const puntosJugador = acumularPuntos(carta, 0);
            crearCarta(carta, 0);


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
            turnoComputadora(puntosJugadores[0]);

        });



        nuevo.addEventListener('click', () => {
            console.clear();
            iniciarJuego();

        });

        return {
            nuevoJuego: iniciarJuego
        }
    })();