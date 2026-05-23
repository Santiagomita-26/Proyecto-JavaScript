




//Formulario de RUTAS

const nombreRuta = document.getElementById("nombreRuta");
const nombreConductor = document.getElementById("conductor");
const hora = document.getElementById("horaSalida");
const ciudad = document.getElementById("ciudad");
const crearRuta = document.getElementById("btnCrearRuta");
const contenedorRutas= document.getElementById("contenedorRutas");

//Formulario de ESTUDIANTES

const nombreEstudiante = document.getElementById("nombreEstudiante");
const grado = document.getElementById("grado");
const telefono=document.getElementById("telefono");
const selectRuta = document.getElementById("selectRuta");
const btnAgregarEstudiante = document.getElementById("btnAgregarEstudiante");


//Formulario EDITAR RUTAS

const modalEditarRuta=document.getElementById("modalEditarRuta");
const editarNombreRuta=document.getElementById("editarNombreRuta");
const editarConductorRuta=document.getElementById("editarConductorRuta");
const editarHoraRuta=document.getElementById("editarHoraRuta");
const editarCiudadRuta=document.getElementById("editarCiudadRuta");
const guardarCambiosRuta=document.getElementById("guardarCambiosRuta");
const cerrarModalRuta=document.getElementById("cerrarModalRuta");


//Formulario EDITAR ESTUDIANTES

const modalEditarEstudiante=document.getElementById("modalEditarEstudiante")
const editarNombreEstudiante=document.getElementById("editarNombreEstudiante")
const editarGradoEstudiante=document.getElementById("editarGradoEstudiante")
const editarTelefonoEstudiante=document.getElementById("editarTelefonoEstudiante")
const guardarCambiosEstudiante=document.getElementById("guardarCambiosEstudiante")
const cerrarModalEstudiante=document.getElementById("cerrarModalEstudiante")




//Api del clima

const temperatura = document.getElementById("temperatura");
const descripcionClima = document.getElementById("descripcionClima");
const iconoClima = document.getElementById("iconoClima");

    async function obtenerClima(){

    try{

        const apiKey = "8f2967ecb2ce500349b36fa0b1e78af7";

        const respuesta = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=Bucaramanga&appid=${apiKey}&units=metric&lang=es`
        );

        const datos = await respuesta.json();

        console.log(datos);

        if(datos.cod !== 200){

            temperatura.textContent = "No disponible";
            descripcionClima.textContent = datos.message;

            return;
        }

        temperatura.textContent = Math.round(datos.main.temp) + "°C";
        descripcionClima.textContent = datos.weather[0].description;
        const icono = datos.weather[0].icon;
        iconoClima.src =`https://openweathermap.org/img/wn/${icono}@2x.png`;

     

    }catch(error){

        temperatura.textContent = "Error";

        console.log(error);
    }
}

obtenerClima();