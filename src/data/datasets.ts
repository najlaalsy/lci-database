export type DatasetStatus =
  | 'Draft'
  | 'Submitted'
  | 'Under Review'
  | 'Revision Required'
  | 'Verified'
  | 'Rejected';

export interface Exchange {
  flowName: string;
  flowCategory: string;
  amount: number;
  unit: string;
  description?: string;
}

export interface ProcessInformation {
  baseName: string;
  treatment?: string;
  mixLocationTypes?: string | string[];
  quantitativeProperties?: string | string[];
  identifier?: string;
  synonyms?: string[];
  classificationSystem?: string;
  classification?: string;
  classificationUri?: string;
  description?: string;
}

export interface TimeLocation {
  referenceYear: number;
  validUntil?: number;
  timeDescription?: string;
  location: string;
  subLocations?: string[];
  geographicalDescription?: string;
}

export interface Technology {
  technologyDescription?: string;
  technicalPurpose?: string;
}

export interface DataQuality {
  dataSource: string;
  sourceReference?: string;
  dataCollectionMethod?: string;
  dataQualityDescription?: string;
  dataCompleteness?: string;
  dataLimitations?: string;
}

export interface DatasetDetails {
  processInformation: ProcessInformation;
  timeLocation: TimeLocation;
  technology: Technology;
  inputs: Exchange[];
  outputs: Exchange[];
  dataQuality: DataQuality;
}

export interface Dataset {
  id: number;
  name: string;
  location: string;
  reference: string;
  type: string;
  updatedAt: string;
  classCode: string;
  status: DatasetStatus;
  details?: DatasetDetails;
}

export const sampleDatasets: Dataset[] = [
  {
    id: 1,
    name: 'Rice cultivation, Indonesia',
    location: 'Indonesia',
    reference: 'Demo reference',
    type: 'Unit process',
    updatedAt: '2026-10-15',
    classCode: '0112',
    status: 'Verified',
  },
  {
    id: 2,
    name: 'Rice production, irrigated',
    location: 'Southeast Asia',
    reference: 'Demo reference',
    type: 'Unit process',
    updatedAt: '2026-10-20',
    classCode: '0112',
    status: 'Under Review',
  },
];
