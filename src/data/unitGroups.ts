export interface Unit {
  name: string;
  symbol: string;
  conversionFactor: number;
  isReferenceUnit: boolean;
}

export interface UnitGroup {
  id: number;
  name: string;
  description: string;
  referenceUnit: string;
  units: Unit[];
}

export const sampleUnitGroups: UnitGroup[] = [
  {
    id: 1,
    name: 'Units of mass',
    description: 'Units used to measure mass.',
    referenceUnit: 'kg',
    units: [
      {
        name: 'Kilogram',
        symbol: 'kg',
        conversionFactor: 1,
        isReferenceUnit: true,
      },
      {
        name: 'Gram',
        symbol: 'g',
        conversionFactor: 0.001,
        isReferenceUnit: false,
      },
      {
        name: 'Milligram',
        symbol: 'mg',
        conversionFactor: 0.000001,
        isReferenceUnit: false,
      },
      {
        name: 'Metric ton',
        symbol: 't',
        conversionFactor: 1000,
        isReferenceUnit: false,
      },
    ],
  },
  {
    id: 2,
    name: 'Units of volume',
    description: 'Units used to measure volume.',
    referenceUnit: 'm³',
    units: [
      {
        name: 'Cubic metre',
        symbol: 'm³',
        conversionFactor: 1,
        isReferenceUnit: true,
      },
      {
        name: 'Litre',
        symbol: 'L',
        conversionFactor: 0.001,
        isReferenceUnit: false,
      },
      {
        name: 'Millilitre',
        symbol: 'mL',
        conversionFactor: 0.000001,
        isReferenceUnit: false,
      },
    ],
  },
  {
    id: 3,
    name: 'Units of energy',
    description: 'Units used to measure energy.',
    referenceUnit: 'MJ',
    units: [
      {
        name: 'Megajoule',
        symbol: 'MJ',
        conversionFactor: 1,
        isReferenceUnit: true,
      },
      {
        name: 'Kilojoule',
        symbol: 'kJ',
        conversionFactor: 0.001,
        isReferenceUnit: false,
      },
      {
        name: 'Joule',
        symbol: 'J',
        conversionFactor: 0.000001,
        isReferenceUnit: false,
      },
      {
        name: 'Kilowatt hour',
        symbol: 'kWh',
        conversionFactor: 3.6,
        isReferenceUnit: false,
      },
    ],
  },
  {
    id: 4,
    name: 'Units of length',
    description: 'Units used to measure length.',
    referenceUnit: 'm',
    units: [
      {
        name: 'Metre',
        symbol: 'm',
        conversionFactor: 1,
        isReferenceUnit: true,
      },
      {
        name: 'Centimetre',
        symbol: 'cm',
        conversionFactor: 0.01,
        isReferenceUnit: false,
      },
      {
        name: 'Millimetre',
        symbol: 'mm',
        conversionFactor: 0.001,
        isReferenceUnit: false,
      },
      {
        name: 'Kilometre',
        symbol: 'km',
        conversionFactor: 1000,
        isReferenceUnit: false,
      },
    ],
  },
  {
    id: 5,
    name: 'Units of area',
    description: 'Units used to measure area.',
    referenceUnit: 'm²',
    units: [
      {
        name: 'Square metre',
        symbol: 'm²',
        conversionFactor: 1,
        isReferenceUnit: true,
      },
      {
        name: 'Hectare',
        symbol: 'ha',
        conversionFactor: 10000,
        isReferenceUnit: false,
      },
      {
        name: 'Square centimetre',
        symbol: 'cm²',
        conversionFactor: 0.0001,
        isReferenceUnit: false,
      },
    ],
  },
  {
    id: 6,
    name: 'Units of time',
    description: 'Units used to measure time.',
    referenceUnit: 's',
    units: [
      {
        name: 'Second',
        symbol: 's',
        conversionFactor: 1,
        isReferenceUnit: true,
      },
      {
        name: 'Minute',
        symbol: 'min',
        conversionFactor: 60,
        isReferenceUnit: false,
      },
      {
        name: 'Hour',
        symbol: 'h',
        conversionFactor: 3600,
        isReferenceUnit: false,
      },
      {
        name: 'Day',
        symbol: 'd',
        conversionFactor: 86400,
        isReferenceUnit: false,
      },
    ],
  },
];
