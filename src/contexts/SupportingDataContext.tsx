import React, {
  createContext,
  type ReactNode,
  useContext,
  useState,
} from 'react';
import { type FlowProperty, sampleFlowProperties } from '@/data/flowProperties';
import { sampleUnitGroups, type UnitGroup } from '@/data/unitGroups';

interface SupportingDataContextType {
  unitGroups: UnitGroup[];
  flowProperties: FlowProperty[];

  addUnitGroup: (unitGroup: UnitGroup) => void;
  updateUnitGroup: (unitGroup: UnitGroup) => void;
  deleteUnitGroup: (id: number) => boolean;

  addFlowProperty: (flowProperty: FlowProperty) => void;
  updateFlowProperty: (flowProperty: FlowProperty) => void;
  deleteFlowProperty: (id: number) => void;
}

const SupportingDataContext = createContext<
  SupportingDataContextType | undefined
>(undefined);

interface SupportingDataProviderProps {
  children: ReactNode;
}

export const SupportingDataProvider: React.FC<SupportingDataProviderProps> = ({
  children,
}) => {
  const [unitGroups, setUnitGroups] = useState<UnitGroup[]>(sampleUnitGroups);

  const [flowProperties, setFlowProperties] =
    useState<FlowProperty[]>(sampleFlowProperties);

  const addUnitGroup = (unitGroup: UnitGroup) => {
    setUnitGroups((current) => [...current, unitGroup]);
  };

  const updateUnitGroup = (updatedUnitGroup: UnitGroup) => {
    setUnitGroups((current) =>
      current.map((group) =>
        group.id === updatedUnitGroup.id ? updatedUnitGroup : group,
      ),
    );
  };

  const deleteUnitGroup = (id: number): boolean => {
    const isUsed = flowProperties.some(
      (property) => property.unitGroupId === id,
    );

    if (isUsed) {
      return false;
    }

    setUnitGroups((current) => current.filter((group) => group.id !== id));

    return true;
  };

  const addFlowProperty = (flowProperty: FlowProperty) => {
    setFlowProperties((current) => [...current, flowProperty]);
  };

  const updateFlowProperty = (updatedFlowProperty: FlowProperty) => {
    setFlowProperties((current) =>
      current.map((property) =>
        property.id === updatedFlowProperty.id ? updatedFlowProperty : property,
      ),
    );
  };

  const deleteFlowProperty = (id: number) => {
    setFlowProperties((current) =>
      current.filter((property) => property.id !== id),
    );
  };

  return (
    <SupportingDataContext.Provider
      value={{
        unitGroups,
        flowProperties,
        addUnitGroup,
        updateUnitGroup,
        deleteUnitGroup,
        addFlowProperty,
        updateFlowProperty,
        deleteFlowProperty,
      }}
    >
      {children}
    </SupportingDataContext.Provider>
  );
};

export const useSupportingData = () => {
  const context = useContext(SupportingDataContext);

  if (!context) {
    throw new Error(
      'useSupportingData must be used within SupportingDataProvider.',
    );
  }

  return context;
};
