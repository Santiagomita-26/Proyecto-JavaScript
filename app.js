




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



crearRuta.addEventListener("click",()=>{

    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

    if(!soloLetras.test(nombreRuta.value)){
        alert("El nombre de la ruta solo puede tener letras");
        return;
    }

    if(!soloLetras.test(nombreConductor.value)){
        alert("El conductor solo puede tener letras");
        return;
    }

    if(!soloLetras.test(ciudad.value)){
        alert("La ciudad solo puede tener letras");
        return;
    }
    
    if(
        nombreRuta.value.trim()==="" ||
        nombreConductor.value.trim()==="" ||
        hora.value.trim()==="" ||
        ciudad.value.trim()===""
    ){
        alert("Completa todos los campos");
        return;
    };

    const ruta = {
        id:Date.now(),
        nombre: nombreRuta.value,
        nombreConductor: nombreConductor.value,
        hora: hora.value,
        ciudad: ciudad.value
    };

    rutas.push(ruta);
    guardarDatos();
    
    renderRutas();

    nombreRuta.value = "";
    nombreConductor.value = "";
    hora.value = "";
    ciudad.value = "";
});

function renderRutas(){
    
    contenedorRutas.innerHTML="";
    selectRuta.innerHTML="";

    rutas.forEach(ruta =>{

        const card= document.createElement("div");

        card.classList.add("route-card");

        card.innerHTML= `
        <h2><strong>Ruta:</strong> ${ruta.nombre}</h2>
        <p><strong>Conductor:</strong> ${ruta.nombreConductor}</p>
        <p><strong>Hora de salida:</strong> ${ruta.hora}</p>
        <p><strong>Ciudad:</strong> ${ruta.ciudad}</p>
        <h3>Estudiantes:</h3>

        <div class="contenedor-estudiantes"></div>

        <div class="card-buttons">
            <button class="eliminar" data-id="${ruta.id}">Eliminar ruta</button>
            <button class="editar" data-id="${ruta.id}">Editar ruta</button>
        </div>
        
        
        

        ` ;

        const contenedorEstudiantes =
        card.querySelector(".contenedor-estudiantes");
        const estudiantesRuta =
        estudiantes.filter(
            estudiante => estudiante.rutaId === ruta.id
        );

        estudiantesRuta.forEach(estudiante => {

            const cardEstudiante =
            document.createElement("card-estudiante");

            cardEstudiante.setAttribute("nombre",estudiante.nombre);
            cardEstudiante.setAttribute("grado",estudiante.grado);
            cardEstudiante.setAttribute("telefono", estudiante.telefono)
            cardEstudiante.setAttribute("id-estudiante",estudiante.id)

            contenedorEstudiantes.appendChild(cardEstudiante);
                
        });




        const btnEliminar = card.querySelector(".eliminar");
        btnEliminar.addEventListener("click", () => {
            const id = Number(btnEliminar.dataset.id);
            rutas = rutas.filter(ruta => ruta.id !== id);

            estudiantes = estudiantes.filter(
            estudiante => estudiante.rutaId !== id
            );
            renderRutas();
            guardarDatos();

        });

        const btnEditar = card.querySelector(".editar");

        btnEditar.addEventListener("click", () => {

            // GUARDAMOS LA ID
            rutaEditandoId = ruta.id;
            // LLENAMOS EL FORMULARIO
            editarNombreRuta.value = ruta.nombre; 
            editarConductorRuta.value =ruta.nombreConductor;
            editarHoraRuta.value = ruta.hora;
            editarCiudadRuta.value = ruta.ciudad;
            // MOSTRAMOS EL MODAL
            modalEditarRuta.classList.add("show");

        });



        contenedorRutas.appendChild(card);


        const option = document.createElement("option");
        option.value = ruta.id; // GUARDAS LA ID
        option.textContent = ruta.nombre; // MUESTRAS EL NOMBRE
        selectRuta.appendChild(option);

        console.log(rutas);
    });
};