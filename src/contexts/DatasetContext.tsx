import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  type Dataset,
  type ReviewHistoryEntry,
  sampleDatasets,
} from '@/data/datasets';

const STORAGE_KEY = 'sim-lci-datasets';

interface DatasetContextType {
  datasets: Dataset[];
  addDataset: (dataset: Dataset) => void;
  updateDataset: (
    id: number,
    updates: Pick<
      Dataset,
      'name' | 'location' | 'reference' | 'updatedAt' | 'details' | 'classCode'
    >,
  ) => void;
  getDatasetById: (id: number) => Dataset | undefined;
  updateDatasetStatus: (
    id: number,
    status: Dataset['status'],
    reviewComment?: string,
    reviewedBy?: string,
  ) => void;
}

const DatasetContext = createContext<DatasetContextType | undefined>(undefined);

const getInitialDatasets = (): Dataset[] => {
  try {
    const storedDatasets = localStorage.getItem(STORAGE_KEY);

    if (storedDatasets) {
      const parsedDatasets = JSON.parse(storedDatasets);

      if (Array.isArray(parsedDatasets)) {
        return parsedDatasets;
      }
    }
  } catch (error) {
    console.error('Failed to load datasets from LocalStorage:', error);
  }

  return sampleDatasets;
};

export const DatasetProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [datasets, setDatasets] = useState<Dataset[]>(getInitialDatasets);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(datasets));
    } catch (error) {
      console.error('Failed to save datasets to LocalStorage:', error);
    }
  }, [datasets]);

  const addDataset = useCallback((dataset: Dataset) => {
    setDatasets((currentDatasets) => [...currentDatasets, dataset]);
  }, []);

  const updateDataset = useCallback(
    (
      id: number,
      updates: Pick<
        Dataset,
        | 'name'
        | 'location'
        | 'reference'
        | 'updatedAt'
        | 'details'
        | 'classCode'
      >,
    ) => {
      setDatasets((currentDatasets) =>
        currentDatasets.map((dataset) =>
          dataset.id === id ? { ...dataset, ...updates } : dataset,
        ),
      );
    },
    [],
  );

  const getDatasetById = useCallback(
    (id: number) => datasets.find((dataset) => dataset.id === id),
    [datasets],
  );

  const updateDatasetStatus = useCallback(
    (
      id: number,
      status: Dataset['status'],
      reviewComment?: string,
      reviewedBy?: string,
    ) => {
      setDatasets((currentDatasets) =>
        currentDatasets.map((dataset) => {
          if (dataset.id !== id) return dataset;

          const isReviewDecision =
            status === 'Verified' ||
            status === 'Rejected' ||
            status === 'Revision Required';

          const reviewHistory: ReviewHistoryEntry[] = isReviewDecision
            ? [
                ...(dataset.reviewHistory || []),
                {
                  id: `${id}-${Date.now()}`,
                  reviewedBy: reviewedBy || 'Unknown',
                  reviewedAt: new Date().toISOString(),
                  decision: status,
                  comment: reviewComment || '',
                },
              ]
            : dataset.reviewHistory || [];

          return {
            ...dataset,
            status,
            reviewComment: reviewComment ?? dataset.reviewComment,
            updatedAt: new Date().toISOString().slice(0, 10),
            reviewHistory,
          };
        }),
      );
    },
    [],
  );

  return (
    <DatasetContext.Provider
      value={{
        datasets,
        addDataset,
        updateDataset,
        getDatasetById,
        updateDatasetStatus,
      }}
    >
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
