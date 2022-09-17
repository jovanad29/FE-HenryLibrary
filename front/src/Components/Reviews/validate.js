export default function validateReview(input) {
    let errores = {};
  
    if (!input.descrption) {
      errores.descrption = "Se requiere una descripcion";
    } else if (input.descrption.length > 100) {
      errores.descrption = "supero el maximo de 100 caracteres";
    }else if (!input.descrption.trim()){
      errores.descrption = "Debe empezar a escribir un mensaje sin espacios";
    }
  
    return errores;
  }
  