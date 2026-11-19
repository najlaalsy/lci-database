import React, {
  createContext,
  type ReactNode,
  useContext,
  useState,
} from 'react';

import { type FlowProperty, sampleFlowProperties } from '@/data/flowProperties';
import { type Flow, sampleFlows } from '@/data/flows';
import { type Source, sampleSources } from '@/data/sources';
import { sampleUnitGroups, type UnitGroup } from '@/data/unitGroups';

interface SupportingDataContextType {
  unitGroups: UnitGroup[];
  flowProperties: FlowProperty[];
  flows: Flow[];
  sources: Source[];

  addUnitGroup: (unitGroup: UnitGroup) => void;
  updateUnitGroup: (unitGroup: UnitGroup) => void;
  deleteUnitGroup: (id: number) => boolean;

  addFlowProperty: (flowProperty: FlowProperty) => void;
  updateFlowProperty: (flowProperty: FlowProperty) => void;
  deleteFlowProperty: (id: number) => boolean;

  addFlow: (flow: Flow) => boolean;
  updateFlow: (flow: Flow) => boolean;
  deleteFlow: (id: number) => void;

  addSource: (source: Source) => boolean;
  updateSource: (source: Source) => boolean;
  deleteSource: (id: number) => void;
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

  const [flows, setFlows] = useState<Flow[]>(sampleFlows);

  const [sources, setSources] = useState<Source[]>(sampleSources);

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

  const deleteFlowProperty = (id: number): boolean => {
    const isUsed = flows.some((flow) =>
      flow.flowPropertyFactors.some((factor) => factor.flowPropertyId === id),
    );

    if (isUsed) {
      return false;
    }

    setFlowProperties((current) =>
      current.filter((property) => property.id !== id),
    );

    return true;
  };

  const isValidFlow = (flow: Flow): boolean => {
    const factors = flow.flowPropertyFactors;

    if (factors.length === 0) {
      return false;
    }

    const referenceProperties = factors.filter(
      (factor) => factor.isReferenceProperty,
    );

    if (referenceProperties.length !== 1) {
      return false;
    }

    if (referenceProperties[0].conversionFactor !== 1) {
      return false;
    }

    const propertyIds = factors.map((factor) => factor.flowPropertyId);

    if (new Set(propertyIds).size !== propertyIds.length) {
      return false;
    }

    return factors.every(
      (factor) =>
        flowProperties.some(
          (property) => property.id === factor.flowPropertyId,
        ) &&
        Number.isFinite(factor.conversionFactor) &&
        factor.conversionFactor > 0,
    );
  };

  const addFlow = (flow: Flow): boolean => {
    if (!isValidFlow(flow)) {
      return false;
    }

    setFlows((current) => [...current, flow]);

    return true;
  };

  const updateFlow = (updatedFlow: Flow): boolean => {
    if (!isValidFlow(updatedFlow)) {
      return false;
    }

    setFlows((current) =>
      current.map((flow) => (flow.id === updatedFlow.id ? updatedFlow : flow)),
    );

    return true;
  };

  const deleteFlow = (id: number) => {
    setFlows((current) => current.filter((flow) => flow.id !== id));
  };

  const addSource = (source: Source): boolean => {
    const duplicate = sources.some(
      (item) =>
        item.name.trim().toLowerCase() === source.name.trim().toLowerCase(),
    );

    if (duplicate) {
      return false;
    }

    setSources((current) => [...current, source]);
    return true;
  };

  const updateSource = (updatedSource: Source): boolean => {
    const duplicate = sources.some(
      (item) =>
        item.id !== updatedSource.id &&
        item.name.trim().toLowerCase() ===
          updatedSource.name.trim().toLowerCase(),
    );

    if (duplicate) {
      return false;
    }

    setSources((current) =>
      current.map((source) =>
        source.id === updatedSource.id ? updatedSource : source,
      ),
    );

    return true;
  };

  const deleteSource = (id: number) => {
    setSources((current) => current.filter((source) => source.id !== id));
  };

  return (
    <SupportingDataContext.Provider
      value={{
        unitGroups,
        flowProperties,
        flows,
        sources,
        addUnitGroup,
        updateUnitGroup,
        deleteUnitGroup,
        addFlowProperty,
        updateFlowProperty,
        deleteFlowProperty,
        addFlow,
        updateFlow,
        deleteFlow,
        addSource,
        updateSource,
        deleteSource,
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
