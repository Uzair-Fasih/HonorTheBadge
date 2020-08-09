const { createCanvas, registerFont } = require('canvas')

module.exports = (key, value, keyBackgroundColor="#00c7ff", valueBackgroundColor="#009fef", keyForegroundColor="#FFF", valueForegroundColor="#FFF") => {
  
  // Add letter spacing
  key = key.trim().toUpperCase().split(' ').map(word => word.split('').join(' ')).join(' ‎ ‎ ‎')
  value = value.trim().toUpperCase().split(' ').map(word => word.split('').join(' ')).join(' ‎ ‎ ')

  return new Promise(function (resolve, reject) {
    
    const keyStyle = '11.5px Roboto';
    const valueStyle = '11.25px Montserrat';
    
    
    setTimeout(function () {
      
      registerFont('./fonts/Roboto-Regular.ttf', { family: 'Roboto' })
      registerFont('./fonts/Montserrat-ExtraBold.ttf', { family: 'Montserrat' })
      
      const helperCanvas = createCanvas(800, 35)
      const helperCtx = helperCanvas.getContext('2d', { pixelFormat: 'A1' })

      
      // Get Widths
      helperCtx.fillStyle = '#FFF'
      helperCtx.font =keyStyle
      let keyWidth = helperCtx.measureText(key).width
      
      helperCtx.fillStyle = '#FFF'
      helperCtx.font = valueStyle
      let valueWidth = helperCtx.measureText(value).width

      const canvas = createCanvas(keyWidth + valueWidth + (13 * 4), 35)
      const ctx = canvas.getContext('2d')
      // ctx.quality = 'best'
      // ctx.textDrawingMode = 'glyph'

      // Set key background
      ctx.fillStyle = keyBackgroundColor
      ctx.fillRect(0, 0, keyWidth + (13 * 2), 38)

      // Set key foreground
      ctx.fillStyle = keyForegroundColor
      ctx.font = keyStyle
      ctx.fillText(key, 13, 22);
      
      // Set value background
      ctx.fillStyle = valueBackgroundColor
      ctx.fillRect(keyWidth + (13 * 2), 0, valueWidth + (13 * 2), 38)
    
      // Set value foreground
      ctx.fillStyle = valueForegroundColor
      ctx.font = valueStyle
      ctx.fillText(value, keyWidth + (13 * 3), 22);
    
      var url = canvas.toDataURL('image/png', 1);
      resolve(url)
    }, 50)
  })
}