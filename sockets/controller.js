const TicketControl = require('../models/ticket-control.model');


const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.emit('ultimo-ticket', ticketControl.ultimo);
    
    socket.on('siguiente-ticket', ( payload, callback ) => {

        const siguiente = ticketControl.siguiente();
        callback(siguiente);

        //TODO: notificar que hay un nuevo ticket pendiente

    })
    socket.on('atender-ticket', ({escritorio}, callback)=>{//{escritorio} es lo que devuelve el payload, podemos desestructurar sin problema

        if(!escritorio){
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            }); 
        }
        const ticket = ticketControl.atenderTicket(escritorio);
        if(!ticket){
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes'
            });
        }else{
            callback({
                ok: true,
                ticket
            });
        }
    });

}



module.exports = {
    socketController
}

