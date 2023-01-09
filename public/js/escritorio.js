//Referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender    = document.querySelector('button');

const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html'; //sino contiene el escritorio mandarlo de regreso al index.html
    throw new Error('El escritorio es obligatorio')
}
const escritorio = searchParams.get('escritorio'); //obteniendo el escritorio que ingrese el usuario
lblEscritorio.innerText = escritorio //mostrandolo en la lbl

const socket = io();

socket.on('connect', () => {
    btnAtender.disabled = false //estara habilitado si el servidor esta arriba

});

socket.on('disconnect', () => {
    btnAtender.disabled = true //si se desconecta se deshabilitara y no se podra dar click
});
socket.on('ultimo-ticket', (ultimo)=>{
    //lblNuevoTicket.innerText = 'Ticket ' + ultimo;
} )


btnAtender.addEventListener( 'click', () => {

/*     socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    }); */

}); 
