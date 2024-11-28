import moment from 'moment';

/**
 * Convierte una cadena de tiempo en formato ISO8601 a una hora y una fecha separadas.
 *
 * @param {string} timeToParse - Tiempo en formato ISO8601 (`YYYY-MM-ddThh:mm:ss`) a convertir.
 * @returns {string[]} - Un arreglo con dos elementos:
 *   - El primer elemento es la hora en formato de 24 horas (`HH:MM`).
 *   - El segundo elemento es la fecha en formato `YYYY-MM-DD`.
 *
 * @description
 * Esta función utiliza la biblioteca `moment` para analizar un tiempo en formato ISO8601
 * y formatearlo en dos valores separados: la hora (HH:MM) y la fecha (YYYY-MM-DD).
 */
export const parseTime = (timeToParse) => {
  // amadeus regresa los tiempos en formato ISO8601
  // YYYY-MM-ddThh:mm:ss
  const momentTime = moment(timeToParse, 'YYYY-MM-DDTHH:mm:ss');

  const time = momentTime.format('HH:mm');
  const day = momentTime.format('YYYY-MM-DD');

  return [time, day];
};

/**
 * Convierte una duración en un formato legible con días, horas y minutos.
 *
 * @param {string|number|Object} durationToParse - La duración a analizar, que puede estar en un formato válido
 * para `moment.duration`, como:
 *   - Una cadena en formato ISO 8601 (`PT8H35M`, `PT48H10M`).
 *   - Un número que representa milisegundos.
 *   - Un objeto con propiedades como `{ hours: 26, minutes: 15 }`.
 *
 * @returns {string} - Una cadena que representa la duración en el formato `Xd Xh Xm`,
 * donde `X` son días, horas y minutos. Si no hay días, se omiten de la salida.
 *
 * @description
 * La función desglosa duraciones superiores a 24 horas en días, horas y minutos, y formatea
 * el resultado en un formato legible para humanos. También maneja correctamente duraciones menores
 * a 24 horas.
 *
 * @example
 * parseDuration('PT8H35M'); // Devuelve "8h 35m"
 * parseDuration('PT26H15M'); // Devuelve "1d 2h 15m"
 * parseDuration(30900000);  // Devuelve "8h 35m" (duración en milisegundos)
 */
export const parseDuration = (durationToParse) => {
  const momentDuration = moment.duration(durationToParse);

  const days = Math.floor(momentDuration.asHours() / 24);
  const hours = momentDuration.hours();
  const minutes = momentDuration.minutes();

  const parsedDuration = `${days > 0 ? `${days}d ` : ''}${hours}h ${minutes}m`;

  return parsedDuration;
};
