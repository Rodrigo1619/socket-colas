//Referencias HTML
const lblEscritorio = document.querySelector('h1');
const btnAtender    = document.querySelector('button');
const lblTicket     = document.querySelector('small');
const divAlerta     = document.querySelector('.alert');

const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html'; //sino contiene el escritorio mandarlo de regreso al index.html
    throw new Error('El escritorio es obligatorio')
}
const escritorio = searchParams.get('escritorio'); //obteniendo el escritorio que ingrese el usuario
lblEscritorio.innerText = escritorio //mostrandolo en la lbl

divAlerta.style.display = 'none'; //que la alerta no aparezca de entrada a menos que ya no hayan tickets

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
    //escritorio es lo que vamos a regresar,  lo mandamos como un objeto
    socket.emit('atender-ticket', {escritorio}, ({ok, ticket, msg })=>{//esperamos a que el backend nos mande el payload
        if(!ok){
            lblTicket.innerText = `Naiden`
            return divAlerta.style.display = ''; //mostrando la alerta de que no hay mas tickets 
        }

        //mostrando en el lbl que ticket se esta atendiendo
        lblTicket.innerText = `Ticket ${ticket.numero}`
    })

/*     socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    }); */

}); 
