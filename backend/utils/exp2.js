let arr = [1, 3, 6, 7, 2, 4, 9, 11, 22, 55, 132, 95, 6, 3, 2, 7, 0, "dfdf", 999, 3, 1, 2]
function unflat(src, count) {
  const result = [];
  for (let s = 0, e = count; s < src.length; s += count, e += count)
    result.push(src.slice(s, e));
  return result;
}

console.log(console.time('1'), unflat(arr,3), console.timeEnd('1'))