const path = require('path');
const fs = require('fs');

class Ticket {
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl{
    constructor(){
        this.ultimo = 0; //ultimo ticket atendiendo, se ira incrementando
        this.hoy = new Date().getDate(); 
        this.tickets = []; //tickets pendientes
        this.ultimos4 = [];

        this.init();
    }

    get toJson(){
        return{
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        }
    }
    init(){
        const {hoy, tickets, ultimo, ultimos4} = require('../db/data.json');//sabemos que tenemos esto en el json
        if(hoy===this.hoy){
            this.tickets = tickets;
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;
        }else{
            //Es otro dia, entonces se debe de reiniciar el server y guardar la info en la db
            this.guardarDB();
        }
    }
    guardarDB(){
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));//nuestro toJson devuelve un objeto, se debe hacer el stringify
    }
    siguiente(){
        this.ultimo += 1; //para ir incrementando
        const ticket = new Ticket(this.ultimo, null); //dejar en null porque de momento nadie esta atendiendo
        this.tickets.push(ticket); //insertamos un nuevo ticket al array de los tickets

        this.guardarDB();
        return 'Ticket ' + ticket.numero;
    }

    atenderTicket(escritorio){ //atendemos el ticket con el escritorio
        //Si no tenemos tickets 
        if(this.tickets.length === 0){
            return null
        }
        //agregar ticket al arreglo al principio [0]
        const ticket = this.tickets.shift();
        ticket.escritorio = escritorio;

        //quitar ticket del arreglo de los ultimos 4
        this.ultimos4.unshift(ticket);

        //validar que solo sean 4 tickets
        if(this.ultimos4.length  > 4){
            this.ultimos4.splice(-1, 1);
        }
        this.guardarDB();

        return ticket;
    }

}
module.exports = TicketControl;