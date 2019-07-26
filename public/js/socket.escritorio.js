const socket = io();
const label = $('small');

const searchParams = new URLSearchParams( window.location.search );

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El numero de escritorio es obligatorio');
}

const escritorio = searchParams.get('escritorio');
$('h1').text('Escritorio: ' + escritorio);

$('button').on('click', function(){

    socket.emit('atenderTicket',{
        escritorio: escritorio
    }, function (resp){
        if(resp === 'No hay tickets para atender'){
            label.text(resp);
            alert(resp);
            return
        }
        label.text('Ticket ' + resp.numero);
    })
});