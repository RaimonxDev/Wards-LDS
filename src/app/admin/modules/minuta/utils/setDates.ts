import { addDays, formatDistance } from 'date-fns';

export function addOneDay(fecha: Date) {
  const oneDayMore = addDays(new Date(fecha), 1);
  return oneDayMore;
}

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export function formatTime(hora: Date) {
  const formatTime = `${hora}:00`;
  return formatTime;
}

export function minutaIsUpdated(updated_at: Date | undefined): string {
  const diffDate = formatDistance(new Date(updated_at as Date), new Date(), {
    includeSeconds: true,
  });
  return diffDate;
}
