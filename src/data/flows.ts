export type FlowType = 'PRODUCT_FLOW' | 'WASTE_FLOW' | 'ELEMENTARY_FLOW';

export interface FlowPropertyFactor {
  flowPropertyId: number;
  conversionFactor: number;
  isReferenceProperty: boolean;
}

export interface Flow {
  id: number;
  name: string;
  flowType: FlowType;
  description: string;
  casNumber?: string;
  chemicalFormula?: string;
  synonyms: string[];
  classificationSystem?: string;
  classification?: string;
  location: string;
  flowPropertyFactors: FlowPropertyFactor[];
}

export const sampleFlows: Flow[] = [
  {
    id: 1,
    name: 'Diesel',
    flowType: 'PRODUCT_FLOW',
    description: 'Diesel fuel used as an energy source.',
    synonyms: ['Diesel fuel', 'Automotive diesel'],
    location: 'Global',
    flowPropertyFactors: [
      {
        flowPropertyId: 1,
        conversionFactor: 1,
        isReferenceProperty: true,
      },
    ],
  },
  {
    id: 2,
    name: 'Electricity',
    flowType: 'PRODUCT_FLOW',
    description: 'Electrical energy supplied to a process.',
    synonyms: ['Electric power'],
    location: 'Indonesia',
    flowPropertyFactors: [
      {
        flowPropertyId: 3,
        conversionFactor: 1,
        isReferenceProperty: true,
      },
    ],
  },
  {
    id: 3,
    name: 'Carbon dioxide',
    flowType: 'ELEMENTARY_FLOW',
    description: 'Carbon dioxide released into the atmosphere.',
    casNumber: '124-38-9',
    chemicalFormula: 'CO2',
    synonyms: ['CO2'],
    location: 'Global',
    flowPropertyFactors: [
      {
        flowPropertyId: 1,
        conversionFactor: 1,
        isReferenceProperty: true,
      },
    ],
  },
  {
    id: 4,
    name: 'Wastewater',
    flowType: 'WASTE_FLOW',
    description: 'Wastewater generated from industrial activities.',
    synonyms: ['Industrial wastewater'],
    location: 'Indonesia',
    flowPropertyFactors: [
      {
        flowPropertyId: 2,
        conversionFactor: 1,
        isReferenceProperty: true,
      },
    ],
  },
];
