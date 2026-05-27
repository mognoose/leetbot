export function isLeetTime(): boolean {
  const now = new Date();
  return now.getHours() === 13 && now.getMinutes() === 37;
}

export function containsLeet(message: string): boolean {
  return message.toLowerCase().includes('leet');
}
