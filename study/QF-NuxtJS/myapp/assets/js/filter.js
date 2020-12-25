export function filerzero(n) {
  return n < 10 ? '0'+n : ''+n
}

export const date = time => {
  let d = new Date()
  d.setTime(time)
  let year = d.getFullYear()
  let month = d.getMonth()+1
  let date = d.getDate()
  let hour = d.getHours()
  let min = d.getMinutes()
  let sec = d.getSeconds()
  return `${year}年${filerzero(month)}月${filerzero(date)}日 ${filerzero(hour)}:${min}:${sec}`
}
