export type Cat = 'length' | 'weight' | 'temp' | 'data' | 'speed'

export type UnitDef = {
  k: string
  nameKey: `apps.unit.names.${string}`
  toBase: (v: number) => number
  fromBase: (v: number) => number
}

export const CAT_META: Record<
  Cat,
  { key: Cat; labelKey: `apps.unit.cats.${Cat}` }
> = {
  length: { key: 'length', labelKey: 'apps.unit.cats.length' },
  weight: { key: 'weight', labelKey: 'apps.unit.cats.weight' },
  temp: { key: 'temp', labelKey: 'apps.unit.cats.temp' },
  data: { key: 'data', labelKey: 'apps.unit.cats.data' },
  speed: { key: 'speed', labelKey: 'apps.unit.cats.speed' }
}

export const UNITS: Record<Cat, UnitDef[]> = {
  length: [
    {
      k: 'm',
      nameKey: 'apps.unit.names.meter',
      toBase: (v) => v,
      fromBase: (v) => v
    },
    {
      k: 'km',
      nameKey: 'apps.unit.names.kilometer',
      toBase: (v) => v * 1000,
      fromBase: (v) => v / 1000
    },
    {
      k: 'cm',
      nameKey: 'apps.unit.names.centimeter',
      toBase: (v) => v / 100,
      fromBase: (v) => v * 100
    },
    {
      k: 'inch',
      nameKey: 'apps.unit.names.inch',
      toBase: (v) => v * 0.0254,
      fromBase: (v) => v / 0.0254
    },
    {
      k: 'ft',
      nameKey: 'apps.unit.names.feet',
      toBase: (v) => v * 0.3048,
      fromBase: (v) => v / 0.3048
    }
  ],
  weight: [
    {
      k: 'kg',
      nameKey: 'apps.unit.names.kilogram',
      toBase: (v) => v,
      fromBase: (v) => v
    },
    {
      k: 'g',
      nameKey: 'apps.unit.names.gram',
      toBase: (v) => v / 1000,
      fromBase: (v) => v * 1000
    },
    {
      k: 'lb',
      nameKey: 'apps.unit.names.pound',
      toBase: (v) => v * 0.45359237,
      fromBase: (v) => v / 0.45359237
    }
  ],
  temp: [
    {
      k: 'C',
      nameKey: 'apps.unit.names.celsius',
      toBase: (v) => v,
      fromBase: (v) => v
    },
    {
      k: 'F',
      nameKey: 'apps.unit.names.fahrenheit',
      toBase: (v) => (v - 32) / 1.8,
      fromBase: (v) => v * 1.8 + 32
    },
    {
      k: 'K',
      nameKey: 'apps.unit.names.kelvin',
      toBase: (v) => v - 273.15,
      fromBase: (v) => v + 273.15
    }
  ],
  data: [
    {
      k: 'B',
      nameKey: 'apps.unit.names.byte',
      toBase: (v) => v,
      fromBase: (v) => v
    },
    {
      k: 'KB',
      nameKey: 'apps.unit.names.kb',
      toBase: (v) => v * 1024,
      fromBase: (v) => v / 1024
    },
    {
      k: 'MB',
      nameKey: 'apps.unit.names.mb',
      toBase: (v) => v * 1024 ** 2,
      fromBase: (v) => v / 1024 ** 2
    },
    {
      k: 'GB',
      nameKey: 'apps.unit.names.gb',
      toBase: (v) => v * 1024 ** 3,
      fromBase: (v) => v / 1024 ** 3
    }
  ],
  speed: [
    {
      k: 'mps',
      nameKey: 'apps.unit.names.mps',
      toBase: (v) => v,
      fromBase: (v) => v
    },
    {
      k: 'kmh',
      nameKey: 'apps.unit.names.kmh',
      toBase: (v) => v / 3.6,
      fromBase: (v) => v * 3.6
    },
    {
      k: 'mph',
      nameKey: 'apps.unit.names.mph',
      toBase: (v) => v * 0.44704,
      fromBase: (v) => v / 0.44704
    }
  ]
}
