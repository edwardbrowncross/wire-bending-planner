export type RibbonElement = {
  type: 'straight'
  length: number
} | {
  type: 'bend'
  angle: number
  radius: number
}

export function encodeElements(elements: RibbonElement[]) {
  return elements.map(element => {
    if (element.type === 'straight') {
      return `s${element.length}`
    } else {
      return `b${element.angle}/${element.radius}`
    }
  }).join(',')
}
export function decodeElements(encoded: string): RibbonElement[] {
  return encoded.split(',').map(part => {
    if (part.startsWith('s')) {
      return {
        type: 'straight',
        length: parseInt(part.slice(1))
      }
    } else {
      const [angle, radius] = part.slice(1).split('/').map(parseFloat)
      return {
        type: 'bend',
        angle,
        radius
      }
    }
  })
}