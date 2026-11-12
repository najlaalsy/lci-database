export interface FlowProperty {
  id: number;
  name: string;
  description: string;
  unitGroupId: number;
}

export const sampleFlowProperties: FlowProperty[] = [
  {
    id: 1,
    name: 'Mass',
    description: 'Property describing the mass of a flow.',
    unitGroupId: 1,
  },
  {
    id: 2,
    name: 'Volume',
    description: 'Property describing the volume of a flow.',
    unitGroupId: 2,
  },
  {
    id: 3,
    name: 'Energy',
    description: 'Property describing the energy content of a flow.',
    unitGroupId: 3,
  },
  {
    id: 4,
    name: 'Length',
    description: 'Property describing the length of a flow.',
    unitGroupId: 4,
  },
  {
    id: 5,
    name: 'Area',
    description: 'Property describing the area of a flow.',
    unitGroupId: 5,
  },
  {
    id: 6,
    name: 'Time',
    description: 'Property describing the duration of a flow.',
    unitGroupId: 6,
  },
];
