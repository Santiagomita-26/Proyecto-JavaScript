




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




btnAgregarEstudiante.addEventListener("click",()=>{

    const soloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    const telefonoValido = /^\d{10}$/;
    
    if(
        nombreEstudiante.value.trim()==="" ||
        grado.value.trim()==="" ||
        telefono.value.trim()==="" ||
        selectRuta.value.trim()==="" 
    ){
        alert("Completa todos los campos");
        return;
    };

    if(!soloLetras.test(nombreEstudiante.value)){
        alert("El nombre solo puede tener letras");
        return;
    }

    const gradoNumero = Number(grado.value);

    if(gradoNumero < 1 || gradoNumero > 11){
        alert("El grado debe estar entre 1 y 11");
        return;
    }

    if(!telefonoValido.test(telefono.value)){
        alert("El teléfono debe tener 10 dígitos");
        return;
    }

    const estudiante = {
        id: Date.now(),
        nombre: nombreEstudiante.value,
        grado: grado.value,
        telefono: telefono.value,
        rutaId: Number(selectRuta.value)
    };

    estudiantes.push(estudiante);
    guardarDatos();
    renderRutas();


    nombreEstudiante.value = "";
    grado.value = "";
    telefono.value="";
    selectRuta.value = "";
    
    console.log(estudiante);
});

// CARD ESTUDIANTE


const template = document.getElementById("templateEstudiante")

template.innerHTML = `
<style>

.card-estudiante{

    background:
    linear-gradient(
        145deg,
        rgba(255,255,255,0.08),
        rgba(255,255,255,0.03)
    );

    border: 1px solid rgba(255,255,255,0.08);

    border-left: 4px solid #d8b4ff;

    border-radius: 18px;

    padding: 16px 18px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 14px;

    backdrop-filter: blur(10px);

    box-shadow:
    0px 8px 18px rgba(0,0,0,0.22);

    transition: 0.3s ease;

    position: relative;
    overflow: hidden;
}

/* EFECTO */

.card-estudiante::before{

    content: "";

    position: absolute;

    width: 70px;
    height: 70px;

    background: rgba(255,192,203,0.08);

    border-radius: 50%;

    top: -20px;
    right: -10px;
}

/* HOVER */

.card-estudiante:hover{

    transform: translateY(-2px);

    box-shadow:
    0px 14px 24px rgba(0,0,0,0.3);
}

/* DATOS */

.datos-estudiante{

    display: flex;
    flex-direction: column;
    gap: 10px;

    position: relative;
    z-index: 2;
}

/* NOMBRE */

.nombre-estudiante{

    font-size: 18px;
    font-weight: bold;

    color: #ffffff;

    margin-bottom: 6px;
}

/* DETALLES */

.detalle-estudiante{

    font-size: 14px;

    color: #d9d9d9;

    background-color: rgba(255,255,255,0.05);

    padding: 6px 10px;

    border-radius: 10px;

    width: fit-content;
}

/* BOTONES */

.botones-estudiante{

    display: flex;
    align-items: center;
    gap: 10px;

    position: relative;
    z-index: 2;
}

/* EDITAR */

.editar-estudiante{

    background:
    linear-gradient(
        135deg,
        #b8f2d3,
        #8fd3c1
    );

    color: #1d1d1d;

    border: none;

    padding: 10px 14px;

    border-radius: 12px;

    cursor: pointer;

    font-size: 13px;
    font-weight: bold;

    transition: 0.3s;

    box-shadow:
    0px 5px 10px rgba(0,0,0,0.18);
}

.editar-estudiante:hover{

    transform: translateY(-2px);
}

/* ELIMINAR */

.eliminar-estudiante{

    background:
    linear-gradient(
        135deg,
        #ffb3c6,
        #ff8fab
    );

    color: #1d1d1d;

    border: none;

    width: 42px;
    height: 42px;

    border-radius: 50%;

    font-size: 17px;
    font-weight: bold;

    cursor: pointer;

    transition: 0.3s;

    display: flex;
    justify-content: center;
    align-items: center;
}

.eliminar-estudiante:hover{

    transform: scale(1.05);
}

</style>

<div class="card-estudiante">

    <div class="datos-estudiante">

        <h2 class="nombre-estudiante"></h2>

        <p class="detalle-estudiante grado"></p>

        <p class="detalle-estudiante telefono"></p>

    </div>

    <div class="botones-estudiante">

        <button class="editar-estudiante">
            ✎
        </button>
        <button class="eliminar-estudiante">
            ✕
        </button>
    </div>

</div>
`;


//CREAMOS EL COMPONENTE 


    class CardEstudiante extends HTMLElement {

    constructor(){
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.appendChild(
            template.content.cloneNode(true)
        );

    };
    connectedCallback(){

        const nombre=this.getAttribute("nombre");
        const grado=this.getAttribute("grado");
        const telefono=this.getAttribute("telefono")

        this.shadowRoot.querySelector(".nombre-estudiante").textContent="Estudiante: " +  nombre;
        this.shadowRoot.querySelector(".grado").textContent="Grado: " + grado;
        this.shadowRoot.querySelector(".telefono").textContent="Telefono: " + telefono ;

            const id=Number(this.getAttribute("id-estudiante"))
            const btnEliminar =this.shadowRoot.querySelector(".eliminar-estudiante")
            
            btnEliminar.addEventListener("click" , ()=> {
            estudiantes=estudiantes.filter(estudiante=>estudiante.id !==id)

            renderRutas();
            guardarDatos();
        })
        
        const btnEditar=this.shadowRoot.querySelector(".editar-estudiante");
        btnEditar.addEventListener("click", ()=>{
        const estudianteEditar=estudiantes.find(estudiante=>estudiante.id===id);

            if(!estudianteEditar) return;
            
            estudianteEditandoId = id;

            editarNombreEstudiante.value=estudianteEditar.nombre;
            editarGradoEstudiante.value=estudianteEditar.grado;
            editarTelefonoEstudiante.value=estudianteEditar.telefono;

             modalEditarEstudiante.classList.add("show");


        })

    };
};

    customElements.define(
        "card-estudiante",
        CardEstudiante
);