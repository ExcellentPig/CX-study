const undoList = {
  success: true,
  data: [{
      status: 'div',
      value: 'khan'
    },
    {
      status: 'div',
      value: 'rose'
    },
  ]
}

export default {
  get(url) {
    if (url === '/getUndoList.json') {
      return new Promise((resolve,reject) => {
        if(this.success) {
          resolve(undoList)
        }else {
          reject(new Error())
        }
      })
    }
  }
}
