import {
  FaDiceOne,
  FaDiceTwo,
  FaDiceThree,
  FaDiceFour,
  FaDiceFive,
  FaDiceSix
} from 'react-icons/fa6'

export const DICE_FACES = {
  1: FaDiceOne,
  2: FaDiceTwo,
  3: FaDiceThree,
  4: FaDiceFour,
  5: FaDiceFive,
  6: FaDiceSix
} as const

export const DICE_DEFAULTS = {
  startCount: 5,
  maxCount: 30,
  quickCounts: [1, 2, 3, 5, 10, 20],
  iconSize: {
    sm: 'size-6',
    md: 'size-8',
    lg: 'size-10'
  }
}

export const DICE_UI = {
  primaryBtn:
    'inline-flex items-center justify-center rounded-xl px-4 py-2 font-semibold text-white text-sm [background:linear-gradient(180deg,#68a4a0,#4f8f8b)] transition active:scale-[0.97]',

  softBtn:
    'inline-flex items-center justify-center rounded-xl px-3 py-1.5 text-sm font-semibold ring-1 ring-black/5 dark:ring-white/10 bg-white/5 hover:bg-white/10 transition',

  tabBtn:
    'inline-flex items-center justify-center min-w-[48px] px-3 py-1.5 text-sm font-semibold rounded-md text-center transition ' +
    'data-[active=true]:text-sky-700 dark:data-[active=true]:text-sky-300 ' +
    'data-[active=true]:bg-linear-to-r data-[active=true]:from-sky-500/25 data-[active=true]:to-cyan-500/25 ' +
    'hover:bg-white/10 active:scale-[0.96]'
}
