export const WHEEL_COLORS = [
  ['#68a4a0', '#4f8f8b'],
  ['#7aa7ff', '#4c74d9'],
  ['#f6b26b', '#e69138'],
  ['#ff7fa3', '#d94c74'],
  ['#9ad0f5', '#5aa9e6'],
  ['#b8e986', '#82c341'],
  ['#ffd966', '#f1c232'],
  ['#cfa0ff', '#9b6ef3']
]

export const WHEEL_STYLE = {
  ringStroke: 'rgba(255,255,255,.28)',
  ringWidth: 10,
  sliceAltFill: 'rgba(255,255,255,.10)',
  woodGradA: '#caa574',
  woodGradB: '#b68750',
  textColor: '#fff',
  textFont: '15px system-ui, -apple-system, Segoe UI, Roboto, Arial',
  separatorStroke: 'rgba(0,0,0,.25)',
  pegOuterOffset: 10,
  pegInnerOffset: -6,
  pegWidthDeg: Math.PI / 140,
  pegShadow: 'rgba(0,0,0,.25)'
}

export const SPIN_PHYSICS = {
  powerMin: 0.9,
  powerMax: 1.0,
  minExtra: Math.PI * 4,
  maxExtra: Math.PI * 6,
  friction: 0.985,
  minVelocity: 0.0025,
  tickWobble: 0.32,
  tickDecayMs: 140,
  tickShakePx: 2
}

export const WHEEL_GEOM = {
  base: 480,
  radius: 180,
  pointerColor: '#e74c3c'
}
