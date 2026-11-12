import React, { createContext, useCallback, useContext, useState } from 'react';
import { type Dataset, sampleDatasets } from '@/data/datasets';

interface DatasetContextType {
  datasets: Dataset[];
  addDataset: (dataset: Dataset) => void;
  getDatasetById: (id: number) => Dataset | undefined;
}

const DatasetContext = createContext<DatasetContextType | undefined>(undefined);

export const DatasetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [datasets, setDatasets] = useState<Dataset[]>(sampleDatasets);

  const addDataset = useCallback((dataset: Dataset) => {
    setDatasets((currentDatasets) => [...currentDatasets, dataset]);
  }, []);

  const getDatasetById = useCallback(
    (id: number) => datasets.find((dataset) => dataset.id === id),
    [datasets],
  );

  return (
    <DatasetContext.Provider value={{ datasets, addDataset, getDatasetById }}>
      {children}
    </DatasetContext.Provider>
  );
};

export const useDatasets = () => {
  const context = useContext(DatasetContext);

  if (!context) {
    throw new Error('useDatasets must be used within a DatasetProvider');
  }

  return context;
};
