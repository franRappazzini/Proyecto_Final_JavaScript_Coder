/**
 * FUNCTIONS RELACIONADAS AL CARRITO
 */
// ---------para agregar los productos al acrrito en el html---------
function renderizarCarrito() {
  $(".header__carrito svg").click(() => {
    $("#productosEnCarrito").empty();

    $("#productosEnCarrito").append(`<h5 class="ms-3">Carrito:</h5>`);

    if (carrito.length == 0) {
      $("#productosEnCarrito").append(
        `<div class="container">
          <p class="m-0 text-center">Oh, su carrito se encuentra vacio.</p>
          <p class="text-center">Agregue algo al carrito y lo vera aqui.</p>
        </div>`
      );
    } else {
      for (let producto of carrito) {
        $("#productosEnCarrito").append(`
            <li id="producto${producto.id}" class="dropdown-item itemCarrito d-flex justify-content-between align-items-center">
              <div class="d-flex divItem">
                <img
                  src="${producto.articulo.img}"
                  alt="${producto.articulo.marca}-${producto.articulo.modelo}"
                  width="50"
                  height="50"
                  class="me-1"
                />

                <div>
                  <h6>${producto.articulo.marca} ${producto.articulo.modelo}</h6>
                  <p class="m-0">$${producto.articulo.precio}</p>
                </div>
              </div>

              <div>
                <button id="btnRemoveCarrito${producto.id}" class="btnRemoveCarrito btn btn-danger btn-sm" type="button">X</button>
              </div>  

            </li>`);

        // al presinar el btn de remover del carrito
        $(`#btnRemoveCarrito${producto.id}`).click(() => {
          $(`#producto${producto.id}`).remove();

          // busca el indice del producto
          let indice = carrito.indexOf(producto);

          console.log(indice);
          // elimina ese indice
          carrito.splice(indice, 1);
          console.log(carrito);

          agregarNumeroAlCarrito();

          guardarProductosLocalStorage();
        });
      }

      // btns para comprar y vaciar el carrito
      $("#productosEnCarrito").append(`
        <div>
          <p class="ps-3 my-1">Total: $${precioTotalCarrito()}</p>
        </div>

        <div class="dropdown-item d-flex justify-content-between">
          <!-- Button trigger modal para finalizar compra -->
          <button
            type="button"
            class="btn btn-success"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            id="btnCarritoComprar"
          >
            Comprar
          </button>
          
          <button id="btnVaciarCarrito" class="btn btn-outline-danger">
            Vaciar <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart3" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
          </svg>
          </button>
        </div>`);
    }

    vaciarCarrito();

    leerCheckboxDarkLightMode();
  });
}

// ---------para agregar el numero al carrito en el html---------
function agregarNumeroAlCarrito() {
  $("#numberProductosInCarrito").empty();
  $("#numberProductosInCarrito").append(`${carrito.length}`);
}

// ---------para hacer funcional el btn 'vaciar carrito'---------
function vaciarCarrito() {
  $("#btnVaciarCarrito").click(() => {
    let vaciar = confirm("¿Seguro que desea vaciar su carrito?");

    if (vaciar) {
      // vacia el array
      carrito = [];
      // vacia el html del carrito
      $("#productosEnCarrito").empty();
      // actualiza el numero que aparece arriba del carrito
      agregarNumeroAlCarrito();
      console.log(carrito);

      guardarProductosLocalStorage();
    }
  });
}

// ---------calcula el $ total del carrito---------
function precioTotalCarrito() {
  let n = 0;

  for (let producto of carrito) {
    n += producto.articulo.precio;
  }

  return n;
}

// ---------finalizar compra---------
function finalizarCompra() {
  validarCaducidadTarjeta();

  $("#formFinalizarCompra").submit(() => {
    let nombre = $("#nombre").val();
    let apellido = $("#apellido").val();
    let dni = $("#dni").val();
    let email = $("#email").val();
    let direccion = $("#direccion").val();
    let numeroDeTarjeta = $("#numeroDeTarjeta").val();
    let cvv = $("#cvv").val();
    let caducidadTarjeta = $("#caducidadTarjeta").val();

    let comprador = new Persona(
      nombre,
      apellido,
      dni,
      email,
      direccion,
      carrito,
      numeroDeTarjeta,
      cvv,
      caducidadTarjeta
    );
    console.log(comprador);

    carrito = [];
    guardarProductosLocalStorage();
    agregarNumeroAlCarrito();

    // guardar en el localStorage los productos comprados y los datos del comprador
    localStorage.setItem("Comprador", JSON.stringify(comprador));

    comprador.agradecimiento();
  });

  $("#btnCancelarCompra").click(() => {
    let cancelar = confirm("¿Seguro que desea cancelar la compra?");

    if (cancelar) {
      window.location.reload();
    }
  });
}

// ---------para validar el numero y cvv de la tarjeta---------
function validarNumerosTarjeta(e) {
  // para el numero y cvv de la tarjeta
  if (window.event) {
    keyNum = e.keyCode;
  } else {
    keyNum = e.which;
  }

  if ((keyNum > 47 && keyNum < 58) || keyNum == 8 || keyNum == 13) {
    return true;
  } else return false;
}

// ---------para que la tarjeta no este vencida---------
function validarCaducidadTarjeta() {
  let fecha = new Date();
  let anio = fecha.getFullYear();
  let dia = fecha.getDate();
  let mes = fecha.getMonth() + 1;

  if (mes < 10) {
    // para agregarle el 0 (asi lo toma el formato Date)
    mes = "0" + mes;
  } else {
    mes = mes.toString;
  }

  let hoy = `${anio}-${mes}-${dia}`;

  $("#caducidadTarjeta").attr("min", hoy);
}
