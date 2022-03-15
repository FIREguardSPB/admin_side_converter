module.exports = function timeInfo (startTime, qtyElapsed, qtyNotes){
  const timeElapsed = new Date() - startTime
  const qtyLeft = qtyNotes - qtyElapsed
  const timeLeft = qtyLeft/(qtyElapsed/timeElapsed)/1000
  if (timeLeft >= 1) {
    console.log(`Осталось ${Math.floor(timeLeft)} секунд`)
  }
}