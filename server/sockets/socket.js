const { io } = require('../server');
const { TicketControl } = require('./../classes/ticket-control');


const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        const siguiente = ticketControl.siguiente();
        console.log(`SIGUIENTE TICKET Nro: ${siguiente}`)
        callback(siguiente);
    });

    client.on('atenderTicket', (data, callback) => {
        if(!data.escritorio){
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }
        const atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);
        
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        })
        
    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

});