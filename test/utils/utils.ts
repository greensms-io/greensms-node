function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

function randomPhone(minRange?: number, maxRange?: number): string {
  const min = minRange ? minRange : 70000000000;
  const max = maxRange ? maxRange : 70009999999;

  return String(randomNumber(min, max));
}

function timeout(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export { randomNumber, randomPhone, timeout };
