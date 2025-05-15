const especiales = ['!', '#', '$', '%', '&', '='];

const reglas = [
  {
    regla: "Longitud mínima de 8 caracteres",
    fn: (pass) => pass.length >= 8
  },
  {
    regla: "Longitud máxima de 12 caracteres",
    fn: (pass) => pass.length <= 12
  },
  {
    regla: "No puede contener espacios en blanco",
    fn: (pass) => !pass.includes(' ')
  },
  {
    regla: "Debe contener al menos un carácter especial (!#$%&=)",
    fn: (pass) => especiales.some(e => pass.includes(e))
  },
  {
    regla: "Debe contener al menos un dígito numérico",
    fn: (pass) => ['0','1','2','3','4','5','6','7','8','9'].some(n => pass.includes(n))
  },
  {
    regla: "El último carácter no puede ser especial",
    fn: (pass) => !especiales.includes(pass[pass.length - 1])
  }
];

module.exports = reglas;
