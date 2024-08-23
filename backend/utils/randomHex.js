export function getRandomHex() {
    let result = '';
    const characters = '01234567#_89abcdef';
    for (let i = 0; i < 16 * 2; i++) {
      result += characters[Math.floor(Math.random() * 16)];
    }
    return result;
  }