const undoList = [
  {status: 'div',  value: 'dell'}
]

export default {
  get (url) {
    if (url === '/xxx.json') {
      return new Promise((resolve)=> {
        resolve(undoList)
      })
    }
  }
}
