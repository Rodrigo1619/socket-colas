//Referencias HTML
const lblNuevoTicket = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');


const socket = io();



socket.on('connect', () => {
    btnCrear.disabled = false //estara habilitado si el servidor esta arriba

});

socket.on('disconnect', () => {
    btnCrear.disabled = true //si se desconecta se deshabilitara y no se podra dar click
});
socket.on('ultimo-ticket', (ultimo)=>{
    lblNuevoTicket.innerText = 'Ticket ' + ultimo;
} )


btnCrear.addEventListener( 'click', () => {

    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });

}); 

