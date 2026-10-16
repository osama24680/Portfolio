/**
 * Splits images into justified rows that each fill the full width — the last
 * row included — while keeping every row as close as possible to `target`
 * height. Solved as an optimal partition (dynamic programming over where each
 * row ends), so no row is left half-empty.
 *
 * @param {number[]} ratios  width / height of each image, in display order
 * @param {number} width     available row width in px
 * @param {number} target    ideal row height in px
 * @param {number} gap       gap between images in px
 * @returns {{start: number, end: number, height: number}[]}  rows as [start, end) slices
 */
export function justifyRows(ratios, width, target, gap) {
  const n = ratios.length;
  if (!n || width <= 0) return [];

  const MAX_PER_ROW = 7;
  const cost = new Array(n + 1).fill(Infinity);
  const from = new Array(n + 1).fill(0);
  cost[0] = 0;

  for (let end = 1; end <= n; end++) {
    let ratioSum = 0;
    for (let start = end - 1; start >= Math.max(0, end - MAX_PER_ROW); start--) {
      ratioSum += ratios[start];
      const count = end - start;
      const height = (width - gap * (count - 1)) / ratioSum;
      if (height <= 0) break;

      // squared relative deviation from the ideal height; rows that would be
      // far too tall (one wide image stretched) or too short are penalised hard
      const deviation = (height - target) / target;
      let rowCost = deviation * deviation;
      if (height > target * 1.7 || height < target * 0.55) rowCost += 10;

      if (cost[start] + rowCost < cost[end]) {
        cost[end] = cost[start] + rowCost;
        from[end] = start;
      }
    }
  }

  const rows = [];
  for (let end = n; end > 0; end = from[end]) {
    const start = from[end];
    const ratioSum = ratios.slice(start, end).reduce((a, b) => a + b, 0);
    rows.unshift({ start, end, height: (width - gap * (end - start - 1)) / ratioSum });
  }
  return rows;
}
