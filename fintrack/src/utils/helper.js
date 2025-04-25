function formatDateISO(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function range(start, end, step = 1) {
  let output = [];
  if (typeof end === "undefined") {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
}

function getCategoryTagBgClass(number) {
  let color;
  //Tailwind cant take dyanmic classes
  if (number === 1) {
    color = "bg-[var(--color1)]";
  }
  if (number === 2) {
    color = "bg-[var(--color1)]";
  }
  if (number === 3) {
    color = "bg-[var(--color3)]";
  }
  if (number === 4) {
    color = "bg-[var(--color4)]";
  }
  if (number === 5) {
    color = "bg-[var(--color5)]";
  }
  if (number === 6) {
    color = "bg-[var(--color6)]";
  }
  if (number === 7) {
    color = "bg-[var(--color7)]";
  }
  if (number === 8) {
    color = "bg-[var(--color8)]";
  }
  if (number === 9) {
    color = "bg-[var(--color9)]";
  }
  if (number === 10) {
    color = "bg-[var(--color10)]";
  }
  return color;
}
export { formatDateISO, range, getCategoryTagBgClass };
