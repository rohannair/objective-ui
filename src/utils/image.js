
export const resizeImageToFitAsJPEG = (MAX_WIDTH, MAX_HEIGHT, src) => {
  const img = new Image()
  img.src = src

  let canvas = document.createElement('canvas')
  let canvasCtx = canvas.getContext('2d')
  canvasCtx.drawImage(img, 0, 0)

  let width = img.width
  let height = img.height

  if (width > height) {
    if (width > MAX_WIDTH) {
      height *= MAX_WIDTH / width
      width = MAX_WIDTH
    }
  } else {
    if (height > MAX_HEIGHT) {
      width *= MAX_HEIGHT / height
      height = MAX_HEIGHT
    }
  }

  canvas.width = width
  canvas.height = height

  canvasCtx = canvas.getContext('2d')
  canvasCtx.drawImage(img, 0, 0, width, height)

  return canvas.toDataURL('image/jpeg', 0.7)
}

export const cropImageToMaxSizeAsJPEG = (MAX_WIDTH, MAX_HEIGHT, src) => {
  const img = new Image()
  img.src = src

  let canvas = document.createElement('canvas')
  let canvasCtx = canvas.getContext('2d')

  let width = img.width
  let height = img.height

  let sourceX = 0
  let sourceY = 0
  let sourceWidth = 0
  let sourceHeight = 0

  if (width > height) {
    // wider than tall
    // figure out sourceX
    sourceX = (width / 2) - (height / 2)
    sourceWidth = height
    sourceHeight = height
  } else {
    // taller than wide
    // figure out sourceY
    sourceY = (height / 2) - (width / 2)
    sourceHeight = width
    sourceWidth = width
  }

  let destWidth = MAX_WIDTH
  let destHeight = MAX_HEIGHT
  let destX = 0
  let destY = 0

  canvas.width = destWidth
  canvas.height = destHeight

  canvasCtx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight)

  return canvas.toDataURL('image/jpeg', 0.7)
}
