import { subHours, formatISO, format } from 'date-fns';

export function setDateMinuta(fechaDeMinuta: Date, subHour: number = 4) {
  // Eliminamos 000.Z de la fecha
  const dateToString = fechaDeMinuta.toString().split('.');
  // Formateamos a un formato ISO 8601
  const setDateISO = formatISO(subHours(new Date(dateToString[0]), subHour)); //Example result  2021-07-20T18:00:00-04:00
  // Fomateamos Fecha
  const formatDate = format(new Date(setDateISO), "yyyy-MM-dd'T'HH:mm"); //Example result 2021-07-20T18:00;

  return formatDate;
}
