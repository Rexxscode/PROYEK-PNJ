const blueBg = "\x1b[44m";
const blueFg = "\x1b[94m";
const whiteFg = "\x1b[1m\x1b[97m";
const reset = "\x1b[0m";

const lines = [
  "  ____  _ _    _ _ _       __  __       _     _     ",
  " / ___|| (_)_ | (_) | __ _|  \\/  | __ _| |__ | |_  ",
  " \\___ \\| |_| | | | |/ _` | |\\/| |/ _` | '_ \\| __| ",
  "  ___) | | | | | | (_| | |  | | (_| | | | | |_  ",
  " |____/|_|_|_|_|_|\\__,_|_|  |_|\\__,_|_| |_|\\__| ",
  "",
  "Career Readiness Platform for Indonesian Vocational Students",
];

const width = Math.max(...lines.map((l) => l.length));

console.log();
console.log(`${blueBg}${blueFg} ${" ".repeat(width + 1)}${reset}`);
for (const line of lines) {
  const pad = " ".repeat(width - line.length);
  console.log(`${blueBg}${whiteFg} ${line}${pad} ${reset}`);
}
console.log(`${blueBg}${blueFg} ${" ".repeat(width + 1)}${reset}`);
console.log(`${blueFg}${"=".repeat(width + 4)}${reset}`);
console.log();