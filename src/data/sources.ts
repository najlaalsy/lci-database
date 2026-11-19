export type SourceType =
  | 'Journal Article'
  | 'Book'
  | 'Report'
  | 'Standard'
  | 'Website'
  | 'Other';

export interface Source {
  id: number;
  name: string;
  sourceType: SourceType;
  author: string;
  publicationYear: number;
  doi?: string;
  url?: string;
  description: string;
}

export const sampleSources: Source[] = [
  {
    id: 1,
    name: 'ISO 14040: Environmental Management Life Cycle Assessment',
    sourceType: 'Standard',
    author: 'International Organization for Standardization',
    publicationYear: 2006,
    description:
      'International standard providing principles and framework for life cycle assessment.',
  },
  {
    id: 2,
    name: 'ISO 14044: Environmental Management Life Cycle Assessment',
    sourceType: 'Standard',
    author: 'International Organization for Standardization',
    publicationYear: 2006,
    description:
      'International standard specifying requirements and guidelines for life cycle assessment.',
  },
];
