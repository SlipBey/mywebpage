'use client'

import dynamic from 'next/dynamic'
import type { IconType } from 'react-icons'
import {
  FiAperture,
  FiCodesandbox,
  FiCpu,
  FiGrid,
  FiHash,
  FiImage,
  FiRotateCw,
  FiShuffle,
  FiTarget,
  FiType
} from 'react-icons/fi'
import { BsQrCode } from 'react-icons/bs'
import { TbBinaryTree2 } from 'react-icons/tb'
import { APPS_BARE } from './registry.base'

export type AppCategory = 'tool' | 'game' | 'fun' | 'utility'
export type AppSlug = (typeof APPS_BARE)[number]['slug']

export type AppMeta = {
  slug: AppSlug
  i18nKey: `apps.items.${string}`
  category: AppCategory
  icon: IconType
  badge: 'Tool' | 'Game' | 'Fun' | 'Utility'
  Component: React.ComponentType<any>
}

const dy = (m: string) => dynamic(() => import(`../impl/${m}`), { ssr: false })

const iconOf = (slug: AppSlug): IconType => {
  switch (slug) {
    case 'random-picker':
      return FiShuffle
    case 'dice':
      return FiAperture
    case 'tetris':
      return FiCpu
    case 'qr':
      return BsQrCode
    case 'spin-bottle':
      return FiRotateCw
    case 'password':
      return FiHash
    case 'uuid':
      return FiAperture
    case 'color-utils':
      return FiAperture

    case 'minesweeper':
      return FiGrid
    case 'tictactoe':
      return FiTarget
    case 'snake':
      return TbBinaryTree2 as any
    case 'memory-match':
      return FiCodesandbox

    case 'image-compress':
      return FiImage
    case 'unit-convert':
      return FiAperture

    case 'meme-maker':
      return FiType
    case 'name-wheel':
      return FiShuffle
    default:
      return FiAperture
  }
}

const badgeOf = (cat: AppCategory): 'Tool' | 'Game' | 'Fun' | 'Utility' => {
  switch (cat) {
    case 'tool':
      return 'Tool'
    case 'game':
      return 'Game'
    case 'fun':
      return 'Fun'
    case 'utility':
      return 'Utility'
  }
}

const componentOf = (slug: AppSlug): React.ComponentType<any> => {
  switch (slug) {
    case 'random-picker':
      return dy('RandomPicker')
    case 'dice':
      return dy('DiceRoller')
    case 'tetris':
      return dy('TetrisGame')
    case 'qr':
      return dy('QrMaker')
    case 'spin-bottle':
      return dy('SpinBottle')
    case 'password':
      return dy('Pass')
    case 'uuid':
      return dy('UUIDMaker')
    case 'color-utils':
      return dy('ColorPicker')

    case 'minesweeper':
      return dy('Minesweeper')
    case 'tictactoe':
      return dy('TicTacToe')
    case 'snake':
      return dy('Snake')
    case 'memory-match':
      return dy('MemoryMatch')

    case 'image-compress':
      return dy('ImageCompress')
    case 'unit-convert':
      return dy('UnitConvert')

    case 'meme-maker':
      return dy('MemeMaker')
    case 'name-wheel':
      return dy('NameWheel')
  }
}

export const APPS = APPS_BARE.map<AppMeta>((a) => ({
  slug: a.slug,
  i18nKey: a.i18nKey,
  category: a.category,
  icon: iconOf(a.slug),
  badge: badgeOf(a.category),
  Component: componentOf(a.slug)
})) satisfies readonly AppMeta[]

export const getApp = (slug: string) => APPS.find((a) => a.slug === slug)
