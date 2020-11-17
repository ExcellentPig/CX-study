module.exports = {
  devServer: {
    proxy: {
      '/ajax': {
        target: 'https://m.maoyan.com',
        ws: true,
        changOrigin: true
      }
    }
  }
}
