// metodo ready
$(() => {
  crearNotebooks();
  functionalRadioBtn();

  crearOtrosProductos();
  functionalRadioBtnOtrosProductos();

  animacionCargar();

  buscadorArticulos();

  btnDarkLightMode();
  respuestaFormContacto();
  girarFiltrosProductos();

  // del carrito
  renderizarCarrito();
  finalizarCompra();
});

/**
 * ARRAYS
 */
let listaNotebooks = [];
let listaOtrosProductos = [];
let carrito = [];

/**
 * CLASS
 */
// ---------productos para agregar al carrito---------
class Producto {
  constructor(articulo, id, cantidad) {
    this.articulo = articulo;
    this.id = id;
    this.cantidad = cantidad;
  }
}
// ---------notebooks---------
class Notebook {
  constructor(
    id,
    marca,
    modelo,
    precio,
    procesador,
    pulgadas,
    ram,
    rom,
    video,
    img
  ) {
    this.id = id;
    this.marca = marca;
    this.modelo = modelo;
    this.precio = precio;
    this.procesador = procesador;
    this.pulgadas = pulgadas;
    this.ram = ram;
    this.rom = rom;
    this.video = video;
    this.img = img;
  }
}
// ---------otros productos---------
class OtrosProductos {
  constructor(id, tipoDeProducto, marca, modelo, precio, img) {
    this.id = id;
    this.tipoDeProducto = tipoDeProducto;
    this.marca = marca;
    this.modelo = modelo;
    this.precio = precio;
    this.img = img;
  }
}
// ---------comprador---------
class Persona {
  constructor(
    nombre,
    apellido,
    dni,
    email,
    direccion,
    compra,
    tarjeta,
    cvv,
    vencimiento
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;
    this.email = email;
    this.direccion = direccion;
    this.compra = compra;
    this.tarjeta = tarjeta;
    this.cvv = cvv;
    this.vencimiento = vencimiento;
  }

  agradecimiento() {
    $("main").empty().append(`
      <h4 class="text-center mt-3">Muchas gracias por su compra ${this.nombre}!</h4>
      <p class="text-center">Le enviamos un email a ${this.email} para que pueda seguir el envio.</p>
      <div class="d-flex justify-content-center">
        <a href="index.html" class="btn btn-primary">Volver al Home</a>
      </div>`);

    $(".modal-backdrop").remove();

    $("footer").remove();
  }
}

/**
 * FUNCTIONS para Notebooks
 */
// ---------get de una pagina que contiene json, instacio objetos 'Notebook' y los pusheo a 'listaNotebooks'---------
function crearNotebooks() {
  const URLNOTEBOOKS =
    "https://script.googleusercontent.com/macros/echo?user_content_key=rDsO-CaTV1_vX_rZjO7CYJbZESUjR1bRTd2tBfGxE5KohKdQgZMCdKQ6FhY-L5amd56inpxgFHDtMNJ1jyVDMfiDhnCmXQPfm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCycj8xmTXq3Gi006_lgmVqe8hZGA_eBpjkQbv32Iy6K1M8KCOPjGeOYlqCriqpTy-IqWsDnSrEd&lib=MxrntC6n6AN1KohuiyhTz7BKSiheyHQNG";

  $.get(URLNOTEBOOKS, (respuesta, estado) => {
    if (estado === "success") {
      let listado = respuesta;

      for (let notebook of listado) {
        listaNotebooks.push(
          new Notebook(
            notebook.id,
            notebook.marca,
            notebook.modelo,
            notebook.precio,
            notebook.procesador,
            notebook.pulgadas,
            notebook.ram,
            notebook.rom,
            notebook.video,
            notebook.img
          )
        );
      }
    }

    // para que una vez termine de obtener los datos de la pagina se ejecute la function e imprima en pantalla
    renderizarLista(listaNotebooks, "Todas");
  });

  return listaNotebooks;
}

// ---------pusheo los productos segun su marca a la lista secundarias---------
function pushListaSecundaria(listaNotebooks, listaSecundaria, marca) {
  for (let notebook of listaNotebooks) {
    if (notebook.marca === marca || marca == "Todas") {
      listaSecundaria.push(notebook);
    }
  }

  return listaSecundaria;
}

// ---------para mostrar notebooks dependiendo la marca---------
function renderizarLista(listaNotebooks, marca) {
  // creo lista secundaria para mostrar productos por marca
  let listaSecundaria = [];

  $(".main__articles").empty();

  listaSecundaria = pushListaSecundaria(listaNotebooks, listaSecundaria, marca);

  for (let notebook of listaSecundaria) {
    $(".main__articles").append(`
      <article id="producto${notebook.id}" class="col-md-3 col-6 text-center">
              <div class="card__notebook card" style="width: auto">
                <img
                  src="${notebook.img}"
                  class="img__notebook card-img-top"
                  alt=""
                  height="160"
                />
                <div class="card-body">
                  <h5 class="card-title m-0">${notebook.marca}</h5>
                  <h6 class="card-text">${notebook.modelo} </h6>
                  <p class="card-text">$${notebook.precio}</p>

                  <!-- Button trigger modal -->
                  <button
                    id="btnMas${notebook.id}"
                    type="button"
                    class="btn btn-outline-primary mb-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal${notebook.id}"
                  >
                    Ver mas
                  </button>

                  <button id="btnCarrito${notebook.id}" class="btn btn-outline-primary mb-1">
                    Carrito
                  </button>
                </div>
              </div>

              <!-- Modal de caracteristicas del producto -->
              <div
                class="modal fade"
                id="exampleModal${notebook.id}"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">
                        Caracteristicas:
                      </h5>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>

                    <div class="modal-body row text-start">
                      <div class="col-md-6 col-12">
                        <ul>
                        <li>Marca: ${notebook.marca}</li>
                        <li>Modelo: ${notebook.modelo}</li>
                        <li>Procesador: ${notebook.procesador}</li>
                        <li>Pantalla: ${notebook.pulgadas}"</li>
                        <li>RAM: ${notebook.ram}GB</li>
                        <li>SSD: ${notebook.rom}GB</li>
                        <li>Placa de video: ${notebook.video}</li>
                        <li>Precio: $${notebook.precio}</li>
                        </ul>
                      </div>

                      <div class="col-md-6 col-12">
                        <div
                          id="carouselExampleIndicators${notebook.id}"
                          class="carousel slide"
                          data-bs-ride="carousel"
                        >
                          <div class="carousel-indicators">
                            <button
                              type="button"
                              data-bs-target="#carouselExampleIndicators${notebook.id}"
                              data-bs-slide-to="0"
                              class="active"
                              aria-current="true"
                              aria-label="Slide 1"
                            ></button>
                            <button
                              type="button"
                              data-bs-target="#carouselExampleIndicators${notebook.id}"
                              data-bs-slide-to="1"
                              aria-label="Slide 2"
                            ></button>
                            <button
                              type="button"
                              data-bs-target="#carouselExampleIndicators${notebook.id}"
                              data-bs-slide-to="2"
                              aria-label="Slide 3"
                            ></button>
                          </div>
                          <div class="carousel-inner">
                            <div class="carousel-item active">
                              <img
                                src="${notebook.img}"
                                class="d-block w-100"
                                alt=""
                              />
                            </div>
                            <div class="carousel-item">
                              <img
                                src="${notebook.img}"
                                class="d-block w-100"
                                alt=""
                              />
                            </div>
                            <div class="carousel-item">
                              <img
                                src="${notebook.img}"
                                class="d-block w-100"
                                alt=""
                              />
                            </div>
                          </div>
                          <button
                            class="carousel-control-prev"
                            type="button"
                            data-bs-target="#carouselExampleIndicators${notebook.id}"
                            data-bs-slide="prev"
                          >
                            <span
                              class="carousel-control-prev-icon"
                              aria-hidden="true"
                            ></span>
                            <span class="visually-hidden">Previous</span>
                          </button>
                          <button
                            class="carousel-control-next"
                            type="button"
                            data-bs-target="#carouselExampleIndicators${notebook.id}"
                            data-bs-slide="next"
                          >
                            <span
                              class="carousel-control-next-icon"
                              aria-hidden="true"
                            ></span>
                            <span class="visually-hidden">Next</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    </article>`);

    // para enviar notebooks al carrito
    let cantidad = 1;
    $(`#btnCarrito${notebook.id}`).click(() => {
      let producto = new Producto(notebook, crearNumeroAleatorio(), cantidad);

      carrito.push(producto);

      // si vuelvo a tocar el boton le suma
      cantidad++;

      console.log(carrito);

      agregarNumeroAlCarrito();
    });

    leerCheckboxDarkLightMode();
  }
}

// ---------para que anden los radio buttons---------
function functionalRadioBtn() {
  $(`.radioTodas`).click(() => {
    renderizarLista(listaNotebooks, "Todas");
    console.log("Todas cheked");

    ordenarPorPrecio("Todas");
  });

  $(`.radioAcer`).click(() => {
    renderizarLista(listaNotebooks, "Acer");
    console.log("Acer cheked");

    ordenarPorPrecio("Acer");
    // ordenarPorProcesador("Acer");
  });

  $(`.radioApple`).click(() => {
    renderizarLista(listaNotebooks, "Apple");
    console.log("Apple cheked");

    ordenarPorPrecio("Apple");
    // ordenarPorProcesador("Apple");
  });

  $(`.radioHP`).click(() => {
    renderizarLista(listaNotebooks, "HP");
    console.log("HP cheked");

    ordenarPorPrecio("HP");
    // ordenarPorProcesador("HP");
  });

  $(`.radioLenovo`).click(() => {
    renderizarLista(listaNotebooks, "Lenovo");
    console.log("Lenovo cheked");

    ordenarPorPrecio("Lenovo");
    // ordenarPorProcesador("Lenovo");
  });

  // para que al iniciar la pagina funcione la function ordenarPorPrecio() con los productos en pantalla
  if ($(`.radioTodas`).prop("cheked", true)) {
    ordenarPorPrecio("Todas");
  }
}

// ---------para ordenar los productos en pantalla por precio---------
function ordenarPorPrecio(marca) {
  $("#inputGroupSelect01").click(() => {
    if ($(".optionMayor").is(":selected")) {
      // mostrar la lista por precio de mayor a menor
      renderizarLista(
        listaNotebooks.sort((a, b) => b.precio - a.precio),
        marca
      );
    } else if ($(".optionMenor").is(":selected")) {
      // mostrar la lista por precio de menor a mayor
      renderizarLista(
        listaNotebooks.sort((a, b) => a.precio - b.precio),
        marca
      );
      console.log("Menor a mayor");
    }
  });
}

/**
 * FUNCTIONS SECUNDARIAS
 */
// ---------para mostrar animacion mientras cargan los productos---------
function animacionCargar() {
  $(".main__articles").append(`
    <div class="text-center mt-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>`);
}

// ---------para hacer funcional el buscador del header---------
function buscadorArticulos() {
  $("#formBusqueda").submit((e) => {
    e.preventDefault();

    let resultadoBusqueda = $("#buscadorHeader").val().toLowerCase();

    switch (resultadoBusqueda) {
      case "notebook":
      case "notebooks":
      case "laptop":
      case "laptops":
        renderizarLista(listaNotebooks, "Todas");
        $(`.radioTodas`).attr("checked", "checked");
        break;
      case "acer":
        renderizarLista(listaNotebooks, "Acer");
        $(`.radioAcer`).attr("checked", "checked");
        break;
      case "apple":
        renderizarLista(listaNotebooks, "Apple");
        $(`.radioApple`).attr("checked", "checked");
        break;
      case "hp":
        renderizarLista(listaNotebooks, "HP");
        $(`.radioHP`).attr("checked", "checked");
        break;
      case "lenovo":
        renderizarLista(listaNotebooks, "Lenovo");
        $(`.radioLenovo`).attr("checked", "checked");
        break;
      // para otrosProductos
      case "mouse":
      case "mice":
        renderizarListaOtrosProductos(listaOtrosProductos, "Mouse");
        $(`.radioMouse`).attr("checked", "checked");
        break;
      case "teclado":
      case "teclados":
        renderizarListaOtrosProductos(listaOtrosProductos, "Teclado");
        $(`.radioTeclado`).attr("checked", "checked");
        break;
      case "auricular":
      case "auriculares":
        renderizarListaOtrosProductos(listaOtrosProductos, "Auriculares");
        $(`.radioAuriculares`).attr("checked", "checked");
        break;

      default:
        alert(
          `Oh, tu busqueda no ha arrojado ningun resultado.\nIntente buscar nuevamente por marca de notebook, tipo de producto o utilice los filtros.`
        );

        leerCheckboxDarkLightMode();
        break;
    }

    $("#buscadorHeader").val("");
  });
}

// ---------al tocar el checkbox de dark mode---------
function btnDarkLightMode() {
  $(".darkLightMode").change(() => leerCheckboxDarkLightMode());
}

// ---------para saber si el checkbox esta cheked o no---------
function leerCheckboxDarkLightMode() {
  if ($(".darkLightMode").is(":checked")) {
    // acomoda los colores para dark mode
    $("body").css("background-color", "#010409");
    $(".header__navbar, header, footer").css("background-color", "#161b22");
    $(".card__notebook, .card__otrosProductos").css(
      "background-color",
      "#161b22"
    );
    $("label, h5, h6, h4, h3, h1, p, a, li").css("color", "white");
    $("input, textarea").css("background-color", "#010409");
    $(".main__contacto").css("background-color", "#161b22");
    // para el modal de la compra final
    $(".modal-content")
      .css("background-color", "#161b22")
      .css("border-color", "rgb(40, 40, 40)");
    // para el carrito
    $(".dropdown-menu").css("background-color", "#161b22");
    $(".dropdown-item").css("background-color", "#161b22");
    $("#productosEnCarrito").css("border-color", "rgb(60, 60, 60)");
    // para los label del formulario final de compra
    $(".labelFormCompra, input").css("color", "black");
    // para iconos del dark/light mode
    $("path").css("fill", "white");
    // para las card de los productos
    $(".card__notebook, .modal").css("border-color", "rgb(40, 40, 40)");

    // para los filtros en version mobile
    $(".filtersForMobile").css("background-color", "#161b22");
    $(".form-select, option")
      .css("background-color", "#161b22")
      .css("color", "white");
  } else {
    // acomoda los colores para light mode
    $("body").css("background-color", "#f8fafc");
    $(".header__navbar, header, footer").css("background-color", "white");
    $(".card__notebook, .card__otrosProductos").css(
      "background-color",
      "white"
    );
    $("label, h5, h6, h4, h3, h1, p, a, li").css("color", "black");
    $("input, textarea").css("background-color", "white");
    $(".main__contacto").css("background-color", "white");

    // para el modal de la compra final
    $(".modal-content")
      .css("background-color", "white")
      .css("border-color", "rgb(100, 100, 100)");
    // para el carrito
    $(".dropdown-menu").css("background-color", "white");
    $(".dropdown-item").css("background-color", "white");
    $("#productosEnCarrito").css("border-color", "rgb(218, 218, 218)");
    // para iconos del dark/light mode
    $("path").css("fill", "black");
    // para las card de los productos
    $(".card__notebook").css("border-color", "rgb(218, 218, 218)");

    // para los filtros en version mobile
    $(".filtersForMobile").css("background-color", "white");
    $(".form-select, option")
      .css("background-color", "white")
      .css("color", "black");
  }
}

// ---------da una respuesta al enviar en formulario de contacto---------
function respuestaFormContacto() {
  $("#formContacto").submit(() => {
    let nombre = $("#name").val();
    let apellido = $("#lastName").val();

    alert(
      `Gracias ${nombre} ${apellido}.\nEn las proximas 24 horas recibira una respuesta!`
    );

    window.location.reload();
  });
}

// ---------dependiendo del ancho de la pantalla como va a mostrar los filtros (para version mobile)---------
function girarFiltrosProductos() {
  if (window.matchMedia("(max-width: 776px)").matches) {
    // para los filtros de las notebooks
    $(".main__filters .btn-group-vertical")
      .removeClass("btn-group-vertical")
      .addClass("btn-group");

    // para los filtros de otrosProductos
    $(".main__otros-filters .btn-group-vertical")
      .removeClass("btn-group-vertical")
      .addClass("btn-group");
  } else if (window.matchMedia("(min-width: 777px)").matches) {
    // para los filtros de las notebooks
    $(".main__filters .btn-group")
      .addClass("btn-group-vertical")
      .removeClass("btn-group");

    // para los filtros de otrosProductos
    $(".main__otros-filters .btn-group")
      .addClass("btn-group-vertical")
      .removeClass("btn-group");
  }
}

// ---------crea un numero aleatorio para agregar al id del carrito---------
function crearNumeroAleatorio() {
  let number = Math.round(Math.random() * 10000);

  return number;
}
