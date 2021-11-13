let deck = [];
const tipos = ['C', 'D', 'S', 'H'];
const especiales = ['J', 'Q', 'K', 'A'];

let puntosJugador = 0,
    puntosComputadora = 0;

//Referencias al HTML
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const smallPuntos = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

//Esta funcion crea un nuevo deck o una nueva baraja
const crearDeck = () => {
    for(let i = 2; i <= 10; i++){
        for(let tipo of tipos){
            deck.push(i + tipo);
        }
    }

    for(let tipo of tipos){
        for(let especial of especiales){
            deck.push(especial + tipo);
        }
    }

    deck = _.shuffle(deck);
    console.log(deck);

    return deck;
}

crearDeck();

//Esta funcion me permite tomar una carta
const pedirCarta = () => {
    
    if(deck.length === 0){
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();

    return carta;
}

const valorCarta = ( carta ) => {
    
    const valor = carta.substring(0, carta.length - 1);
    
    return (isNaN(valor)) ? ((valor === 'A') ? 11 : 10) : (valor * 1);
}

//Turno de la computadora
const turnoComputadora = ( puntosMinimos ) => {

    do {
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta( carta );
        smallPuntos[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if(puntosMinimos > 21){
            break;
        }

    } while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {
        if(puntosMinimos === puntosComputadora){
            alert('Nadie gana :(');
        }else if(puntosMinimos > 21){
            alert('Computadora gana');
        }else if(puntosComputadora > 21){
            alert('Jugador gana');
        }else{
            alert('Computadora gana')
        }
    }, 10);
};

//Eventos
btnPedir.addEventListener('click', () => {
    
    const carta = pedirCarta();
    const valor = valorCarta( carta );

    puntosJugador = puntosJugador + valor;
    smallPuntos[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if(puntosJugador > 21){
        console.warn('Lo siento mucho, perdiste...');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }else if(puntosJugador === 21){
        console.warn('21, genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
});

btnDetener.addEventListener('click', () => {
    btnDetener.disabled = true;
    btnPedir.disabled   = true;

    turnoComputadora(puntosJugador);
});

btnNuevo.addEventListener('click', () => {
    console.clear();
    deck = [];
    crearDeck();
    
    puntosJugador = 0;
    puntosComputadora = 0;

    smallPuntos[0].innerText = 0;
    smallPuntos[1].innerText = 0;

    divCartasJugador.innerHTML = '';
    divCartasComputadora.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
})