// The root URL for the RESTful services
var rootURL = "http://grupotnt.udea.edu.co/estatus-traductor-api/api/index.php";

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

$(document).ready(function(){

//Manejo de estilos y maquetación del form con jquery

//lista de opciones de busqueda
$('#lista').change(function() {
	//Escondemos todos los campos del form que no han sido seleccionados
	 $("#criterio, #anio, #mes, #section, #periodico").hide();

	//Mostramos los campos seleccionados para usarse
	 $("#" + $(this).find('option:selected').attr('value')).show();			
});


//Boton buscar				
$("#buscar").mouseover(function(evento){
				
	evento.preventDefault();
				
	$("#buscar").css("background-color", "#819FF7");		
	//$("#enter").css("font-weight", "bold");
		
});
			
$("#buscar").mouseout(function(envento){
				
		$("#buscar").css("background-color", "#D8D8D8");
		//$("#enter").css("font-weight", "");
			
});


//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

var opcion;

//Boton buscar general
$('#buscar').click(function(event){

	opcion = '';

	if( $('#Lcriterios').attr('selected') ){

		var opc = $('#listaCriterios').find(":selected").text();
		opcion = '/criterio/' + opc;
		event.preventDefault();

	}else if( $('#Lanio').attr('selected') ){

		var opc = $('#listaAnios').find(":selected").text();
        opcion = '/anio/' + opc;
        event.preventDefault();

	}else if( $('#Lmes').attr('selected') ){

		var opc = $('#listaMeses').find(":selected").text();
        opcion = '/mes/' + opc;
        event.preventDefault();

	}else if( $('#Lsection').attr('selected') ){

		var opc = $('#listaSections').find(":selected").text();
        opcion = '/section/' + opc;
        event.preventDefault();

	}else if( $('#Lperiodico').attr('selected') ){

		var opc = $('#listaPeriodicos').find(":selected").text();
        opcion = '/periodico/' + opc;
        event.preventDefault();

	}
	
	//se llama al método find() que el encargado de consumir el api rest.
	find();		
});

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//Funcion buscar asociada al botón buscar
function find() {
        console.log('Buscando...'); 
        $.ajax({
                type: 'GET',
                url: rootURL + opcion,
                dataType: "json", // data type of response
                success: renderList
        });
}

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//Funcion render list que es llamada por la funcion buscar. Esta funcion pinta en el cliente los datos devueltos por el api
//al ser consumido por el llamado en el método find().

function renderList(data) {
        // JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
      
		
        var list = data == null ? [] : (data.prensa instanceof Array ? data.prensa : [data.prensa]);

	
        $("#leyes li").remove();
		$("#leyes br").remove();
		//$('#leyes table').remove();
        $.each(list, function(index, doc) { 

		//$('#leyes').append("<table border=\"1\"><tr><td>");
		$('#leyes').append("<li><p align=\"justify\">" + "<b>Criterio de agrupaci&oacute;n:</b> " + doc.Criterio + "</p></li>");
		$('#leyes').append("<li>" + "<b>Fecha de publicaci&oacute;n:</b> " + doc.FechaP + "</li>");
		$('#leyes').append("<li>" + "<b>T&iacute;tulo:</b> " + doc.Titulo + "</li>");
		$('#leyes').append("<li>" + "<b>Autor:</b> " + doc.Autor + "</li>");
		$('#leyes').append("<li>" + "<b>Secci&oacute;n:</b> " + doc.Section + "</li>");
		$('#leyes').append("<li>" + "<b>Fecha de consulta:</b> " + doc.FechaC + "</li>");
		$('#leyes').append("<li>" + "<b>Peri&oacute;dico:</b> " + doc.Periodico + "</li>");
		$('#leyes').append("<li><p align=\"justify\">" +  "<b>Contenido:</b> " + doc.Contenido + "</p></li>");
		
		$('#leyes').append("<br><br>");

    	});
}

});
