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

export function distanceDate(
  create_at: Date | undefined,
  update_at: Date | undefined
): string | boolean {
  if (create_at === undefined && update_at === undefined) {
    return false;
  }

  if (create_at === update_at) {
    return false;
  }

  const diffDate = formatDistance(
    new Date(create_at as Date),
    new Date(update_at as Date),
    {
      includeSeconds: true,
    }
  );
  console.log(diffDate);

  return diffDate;
}
