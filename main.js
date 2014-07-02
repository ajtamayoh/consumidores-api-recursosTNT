// The root URL for the RESTful services
var rootURL = "http://grupotnt.udea.edu.co/leyes-traductor-api/api/index.php";

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

$(document).ready(function(){

//Manejo de estilos y maquetación del form con jquery

//lista de opciones de busqueda
$('#lista').change(function() {
	//Escondemos todos los campos del form que no han sido seleccionados
	 $("#tipo, #fuente, #anio, #keyword").hide();

	//Ponemos en blanco el campo de texto de palabra clave, para que
	//no interfiera en las demás busquedas.
	$('#pclave').val("");

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
var pclave;

//Boton buscar general
$('#buscar').click(function(event){

	//se implementó este condicional para habilitarla busqueda por palabra
	//clave. Pensamos que se puede implementar de otra forma, al verificar
	//fuera de este evento si el campo de texto ha sido seteado. Por ahora
	//es funcional.
	//Luego se opto por implementar todas las busquedas aqui dentro.

	if($('#pclave').val() != ""){

        	opcion = '/keyWord/' + $('#pclave').val();
	
	}else if( $('#todas').attr('selected') ){

                opcion = '/leyes';
                event.preventDefault();

	}else if( $('#stipo').attr('selected') ){

		//var type = $('input:radio[name=rad1]:checked').val();
		var type = $('#listaTipo').find(":selected").text();
		opcion = '/tipo/' + type;
		event.preventDefault();

		/*
		if($('#Concept').attr('checked',true)){

		//$('#Ley').attr('checked', false);
                //$('#Resol').attr('checked', false);
		opcion = '/tipo/Concepto';
		event.preventDefault();

		}
        	else if($('#Resol').attr('checked',true)){
      		
			//$('#Concept').attr('checked', false);
                	//$('#Ley').attr('checked', false);
			opcion = '/tipo/Resoluci\u00f3n';    
			event.preventDefault();
 
		}
		
		else if( $('#Ley').attr('checked',true)  ){

                		//$('#Concept').attr('checked', false);
                		//$('#Resol').attr('checked', false);
                		opcion = '/tipo/Ley';
               			event.preventDefault();
		}	
		*/

		
		
	}else if( $('#sanio').attr('selected') ){

		var type = $('#listaAnios').find(":selected").text();
                opcion = '/anio/' + type;
                event.preventDefault();

	}
	
	//se llama al método find() que el encargado de consumir el api rest.
	find();		
});


//Tomando el criterio establecido en el form por el usuario, para consumir el api-rest

//TODO tomar la opcion seleccionada y usar solo un método, por ahora eso está por hacerce

/*
$('#todas').click(function(event){
				
	if( $('#todas').attr('selected') ){
					
		opcion = '/leyes';
		event.preventDefault();
	}
});

	

$('#Ley').click(function(event){

		if( $('#Ley').attr('checked',true)  ){
			opcion = '/tipo/Ley';
			event.preventDefault();

		}

});

$('#Concept').click(function(event){

	if($('#Concept').attr('checked',true)){
                        opcion = '/tipo/Concepto';
                        event.preventDefault();

	}

});

$('#Resol').click(function(event){

	if($('#Resol').attr('checked',true)){
                        opcion = '/tipo/Resoluci\u00f3n';
		    	event.preventDefault();
        }	
				
});		

*/

/*
Esta prueba me sirvio mucho para implementar la busqueda por palabra clave
$('#prueba').click(function(event){
	pclave = $('#pclave').val();
	if(pclave == ""){
		pclave = "era vacio";
	}
	document.write(pclave);
});
*/

/*
if($('#todas').attr("selected")){

	var opcion = $('#todas').attr('value');


}else{

	var opcion = '/tipo/'+ $('#SearchByTypeLey').attr('value');

}

*/


//Funciones previas a la implementación actual, eran poco interactivas y con muchas lineas de código por error en el diseño.
/*
$('#SearchByTypeLey').click(function(){
                findLeyByTypeLey();              
});


$('#SearchByTypeConcept').click(function(){
                findLeyByTypeConcept();
});


$('#SearchByTypeResol').click(function(){
                findLeyByTypeResol();
});


$('#SearchByFuenteLeyex').click(function(){
                findLeyByFuenteLeyex();
});


$('#SearchByFuenteLeyexInfo').click(function(){
                findLeyByFuenteLeyexInfo();
});


$('#SearchByAnio').click(function(){
                findLeyByAnio();
});


*/

//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//Funcion buscar asociada al botón buscar
function find() {
        console.log('Buscando...');
        $.ajax({
                type: 'GET',
                url: rootURL + opcion,
                dataType: "json", // data type of response
                success: renderList
                /*success: function(result) {
                            var data = jQuery.parseJSON(result);
                            $.each(data, function(index, value) {
                            $("#leyes").append("<li>" + value + "</li>");
                        }
                */
        });
}




function findAll() {
        console.log('Buscando todas las leyes');
        $.ajax({
                type: 'GET',
                url: rootURL + '/leyes',
                dataType: "json", // data type of response
                success: renderList
		/*success: function(result) {
       		            var data = jQuery.parseJSON(result);
		            $.each(data, function(index, value) {
                	    $("#leyes").append("<li>" + value + "</li>");
      			}
		*/
        });
}

function findLeyByTypeLey() {
        console.log('Buscando Leyes de tipo ley');
        $.ajax({
                type: 'GET',
                url: rootURL + '/tipo/'+'Ley',
                dataType: "json", // data type of response
                success: renderList
        });
}


function findLeyByTypeConcept() {
        console.log('Buscando Leyes de tipo Concepto');
        $.ajax({
                type: 'GET',
                url: rootURL + '/tipo/'+'Concepto',
                dataType: "json", // data type of response
                success: renderList
        });
}


function findLeyByTypeResol() {
        console.log('Buscando Leyes de tipo Resolucion');
        $.ajax({
                type: 'GET',
                url: rootURL + '/tipo/'+'Resolucion',
                dataType: "json", // data type of response
                success: renderList
        });
}


function findLeyByFuenteLeyex() {
        console.log('Buscando Leyes de la fuente Leyex');
        $.ajax({
                type: 'GET',
                url: rootURL + '/fuente/'+'Leyex',
                dataType: "json", // data type of response
                success: renderList
        });
}


function findLeyByFuenteLeyexInfo() {
        console.log('Buscando Leyes de la fuente leyex.info');
        $.ajax({
                type: 'GET',
                url: rootURL + '/fuente/leyex.info',
                dataType: "json", // data type of response
                success: renderList
        });
}


function findLeyByAnio() {
        console.log('Buscando Leyes por anio');
        $.ajax({
                type: 'GET',
                url: rootURL + '/anio/2012',
                dataType: "json", // data type of response
                success: renderList
        });
}



//$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

//Funcion render list que es llamada por la funcion buscar. Esta funcion pinta en el cliente los datos devueltos por el api
//al ser consumido por el llamado en el método find().

function renderList(data) {
        // JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
      
		
        var list = data == null ? [] : (data.leyes instanceof Array ? data.leyes : [data.leyes]);

	
        $("#leyes li").remove();
	$("#leyes br").remove();
	//$('#leyes table').remove();
        $.each(list, function(index, ley) { 

		//$('#leyes').append("<table border=\"1\"><tr><td>");
		$('#leyes').append("<li><p align=\"justify\">" + "<b>Nombre:</b> " + ley.Nombre + "</p></li>");
		$('#leyes').append("<li>" + "<b>N&uacute;mero:</b> " + ley.numero + "</li>");
		//$('#leyes').append("<li>" + "<b>Editorial:</b> " + ley.Editorial + "</li>");
		$('#leyes').append("<li>" + "<b>Fecha de la norma:</b> " + ley.fecha_norma + "</li>");
		$('#leyes').append("<li>" + "<b>Tipo de norma:</b> " + ley.tipo + "</li>");
		//$('#leyes').append("<li>" + "<b>Fuente:</b> " + ley.fuente + "</li>");
		//$('#leyes').append("<li>" + "<b>Fecha de recolecci&oacute;n:</b> " + ley.fecha + "</li>");
		$('#leyes').append("<li>" + "<b>Palabra clave:</b> " + ley.keyword + "</li>");
		$('#leyes').append("<li>" + "<b>&Aacute;rea:</b> " + ley.area + "</li>");
		$('#leyes').append("<li><p align=\"justify\">" + "<b>Contexto:</b> " + ley.Contexto + "</p></li>");
		$('#leyes').append("<br><br>");
		//$('#leyes').append("</td></tr></table>");

    	});
}

});
