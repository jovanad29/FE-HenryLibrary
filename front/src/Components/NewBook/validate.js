//VALIDACION DEL FORMULARIO
export default function validate(input) {
  let errores = {};

  if (!input.publisherId) {
    errores.publisherId = "Se requiere la editorial ";
  }

  if (!input.title) {
    errores.title = " Se requiere el titulo ";
  } else if (!typeof input.title.length > 300) {
    errores.title = "El titulo solo puede tener hasta 300 caracteres ";
  }

  if (!input.description) {
    errores.description = " Se requiere la descripcion";
  } else if (!typeof input.description.length > 5200) {
    errores.description =
      "La descripcion solo puede tener hasta 5200 caracteres ";
  }

  if (!input.price) {
    errores.price = " Se requiere el precio ";
  } else if (!typeof input.price === "number") {
    errores.price = " El precio debe ser un numero";
  } else if (input.price < 1) {
    errores.price = " El precio debe ser mayor a 0";
  }

  if (!input.image) {
    errores.image = " La imagen se requiere  ";
  } else if (
    !/[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/.test(
      input.image
    )
  ) {
    errores.image = "Formato incorrecto de iamgen";
  }

  if (!input.pageCount) {
    errores.pageCount = " Se requiere el numero de pagina";
  } else if (input.pageCount < 1) {
    errores.pageCount = " El numero de paginas debe ser mayor a 0";
  } 

  if (!input.language) {
    errores.language = " Se requiere un idioma";
  }

  if (!input.currentStock) {
    errores.currentStock = "Se requiere una cantidad en Stock";
  } else if (input.currentStock < 1) {
    errores.currentStock = "El valor minimo requerido es 1";
  }

  return errores;
}

export function validateReview(input) {
  let errores = {};

  if (!input.descrption) {
    errores.descrption = "Se requiere una descripcion";
  } else if (input.descrption.length > 100) {
    errores.descrption = "supero el maximo de 100 caracteres";
  }else if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(input.descrption)){
    errores.descrption = "Debe escribir un mensaje";
  }

  return errores;
}
