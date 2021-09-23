/**
 * FUNCTIONS para OtrosProductos
 */

// ---------get de una pagina que contiene json, instacio objetos 'OtrosProductos' y los pusheo a 'listaOtrosProductos'---------
function crearOtrosProductos() {
  const URLOTROSPRODUCTOS =
    "https://script.google.com/macros/s/AKfycbxUPp4O8ao51WgG_jrpoK8i1ix52ekaZkUDSJEQjOImXd8lkXk/exec";

  $.get(URLOTROSPRODUCTOS, (respuesta, estado) => {
    if (estado === "success") {
      let listado = respuesta;

      for (let producto of listado) {
        listaOtrosProductos.push(
          new OtrosProductos(
            producto.id,
            producto.tipoDeProducto,
            producto.marca,
            producto.modelo,
            producto.precio,
            producto.img
          )
        );
      }
    }

    // para que una vez termine de obtener los datos de la pagina se ejecute la function e imprima en pantalla
    renderizarListaOtrosProductos(listaOtrosProductos, "Todos");
  });

  return listaOtrosProductos;
}

// ---------pusheo los productos segun su tipo a la lista secundaria---------
function pushListaSecundariaOtrosProductos(
  listaOtrosProductos,
  listaSecundariaOtrosProductos,
  tipoDeProducto
) {
  for (let producto of listaOtrosProductos) {
    if (
      producto.tipoDeProducto === tipoDeProducto ||
      tipoDeProducto == "Todos"
    ) {
      listaSecundariaOtrosProductos.push(producto);
    }
  }

  return listaSecundariaOtrosProductos;
}

// ---------para mostrar notebooks dependiendo la marca---------
function renderizarListaOtrosProductos(listaOtrosProductos, tipoDeProducto) {
  // creo lista secundaria para mostrar productos por marca
  let listaSecundariaOtrosProductos = [];

  $(".main__otros-articles").empty();

  listaSecundariaOtrosProductos = pushListaSecundariaOtrosProductos(
    listaOtrosProductos,
    listaSecundariaOtrosProductos,
    tipoDeProducto
  );

  for (let producto of listaSecundariaOtrosProductos) {
    $(".main__otros-articles").append(`
        <article id="producto${producto.id}" class="col-md-3 col-6 text-center">
                <div class="card__otrosProductos card" style="width: auto">
                  <img
                    src="${producto.img}"
                    class="img__otrosProductos card-img-top"
                    alt=""
                    height="160"
                  />
                  <div class="card-body">
                    <h5 class="card-title m-0">${producto.marca}</h5>
                    <h6 class="card-text">${producto.modelo} </h6>
                    <p class="card-text">$${producto.precio}</p>
  
                    <!-- Button trigger modal -->
                    <button
                      id="btnMas${producto.id}"
                      type="button"
                      class="btn btn-outline-primary mb-1"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal${producto.id}"
                    >
                      Ver mas
                    </button>
  
                    <button id="btnCarrito${producto.id}" class="btn btn-outline-primary mb-1">
                     Carrito
                    </button>
                  </div>
                </div>
  
                <!-- Modal  AGREGAR CLASS, NO ID PORQUE NO ANDA -->
                <div
                  class="modal fade"
                  id="exampleModal${producto.id}"
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
                          <h6>${producto.tipoDeProducto}</h6>
                          <ul>
                          <li>Marca: ${producto.marca}</li>
                          <li>Modelo: ${producto.modelo}</li>
                          <li>Precio: $${producto.precio}</li>
                          </ul>
                        </div>
  
                        <div class="col-md-6 col-12">
                          <div
                            id="carouselExampleIndicators${producto.id}"
                            class="carousel slide"
                            data-bs-ride="carousel"
                          >
                            <div class="carousel-indicators">
                              <button
                                type="button"
                                data-bs-target="#carouselExampleIndicators${producto.id}"
                                data-bs-slide-to="0"
                                class="active"
                                aria-current="true"
                                aria-label="Slide 1"
                              ></button>
                              <button
                                type="button"
                                data-bs-target="#carouselExampleIndicators${producto.id}"
                                data-bs-slide-to="1"
                                aria-label="Slide 2"
                              ></button>
                              <button
                                type="button"
                                data-bs-target="#carouselExampleIndicators${producto.id}"
                                data-bs-slide-to="2"
                                aria-label="Slide 3"
                              ></button>
                            </div>
                            <div class="carousel-inner">
                              <div class="carousel-item active">
                                <img
                                  src="${producto.img}"
                                  class="d-block w-100"
                                  alt=""
                                />
                              </div>
                              <div class="carousel-item">
                                <img
                                  src="${producto.img}"
                                  class="d-block w-100"
                                  alt=""
                                />
                              </div>
                              <div class="carousel-item">
                                <img
                                  src="${producto.img}"
                                  class="d-block w-100"
                                  alt=""
                                />
                              </div>
                            </div>
                            <button
                              class="carousel-control-prev"
                              type="button"
                              data-bs-target="#carouselExampleIndicators${producto.id}"
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
                              data-bs-target="#carouselExampleIndicators${producto.id}"
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
    $(`#btnCarrito${producto.id}`).click(() => {
      carrito.push(new Producto(producto, crearNumeroAleatorio()));
      console.log(carrito);

      agregarNumeroAlCarrito();
    });

    leerCheckboxDarkLightMode();
  }
}

// ---------para que anden los radio buttons---------
function functionalRadioBtnOtrosProductos() {
  $(`.radioTodos`).click(() => {
    renderizarListaOtrosProductos(listaOtrosProductos, "Todos");
    console.log("Todos cheked");

    ordenarPorPrecioOtrosProductos("Todos");
  });

  $(`.radioMouse`).click(() => {
    renderizarListaOtrosProductos(listaOtrosProductos, "Mouse");
    console.log("Mouse cheked");

    ordenarPorPrecioOtrosProductos("Mouse");
  });

  $(`.radioTeclado`).click(() => {
    renderizarListaOtrosProductos(listaOtrosProductos, "Teclado");
    console.log("Teclado cheked");

    ordenarPorPrecioOtrosProductos("Teclado");
  });

  $(`.radioAuriculares`).click(() => {
    renderizarListaOtrosProductos(listaOtrosProductos, "Auriculares");
    console.log("Auriculares cheked");

    ordenarPorPrecioOtrosProductos("Auriculares");
  });

  // para que al iniciar la pagina funcione la function ordenarPorPrecioOtrosProductos() con los productos en pantalla
  if ($(`.radioTodos`).prop("cheked", true)) {
    ordenarPorPrecioOtrosProductos("Todos");
  }
}

// ---------para ordenar los productos en pantalla por precio---------
function ordenarPorPrecioOtrosProductos(tipoDeProducto) {
  $("#inputGroupSelect1000").click(() => {
    if ($(".optionMayor1000").is(":selected")) {
      // mostrar la lista por precio de mayor a menor
      renderizarListaOtrosProductos(
        listaOtrosProductos.sort((a, b) => b.precio - a.precio),
        tipoDeProducto
      );
    } else if ($(".optionMenor1000").is(":selected")) {
      // mostrar la lista por precio de menor a mayor
      renderizarListaOtrosProductos(
        listaOtrosProductos.sort((a, b) => a.precio - b.precio),
        tipoDeProducto
      );
      console.log("Menor a mayor");
    }
  });
}
