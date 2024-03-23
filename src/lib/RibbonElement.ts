type RibbonElement = {
  type: 'straight'
  length: number
} | {
  type: 'bend'
  angle: number
  radius: number
}