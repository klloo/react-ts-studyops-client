export function costFormatter(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function timeStringFormatter(times: number): string {
  if (times === 0) {
    return '0분';
  }
  const hour = Math.floor(times / 60);
  const minute = Math.floor(times % 60);
  return `${hour !== 0 ? `${hour}시간` : ''}${
    minute !== 0 ? `${minute}분` : ''
  } `;
}
