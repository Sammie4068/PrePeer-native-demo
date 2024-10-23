export function formatDate(dateString: string | undefined) {
  if (!dateString) return;
  const date = new Date(dateString);

  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });

  const day = date.getDate();
  const ordinal = getOrdinalSuffix(day);

  const month = date.toLocaleDateString('en-US', { month: 'short' });

  const year = date.getFullYear();

  return `${weekday}, ${day}${ordinal} ${month} ${year}`;
}

function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export function reformattedParams(params: string | string[]) {
  return typeof params === 'string' ? params : params[0];
}
