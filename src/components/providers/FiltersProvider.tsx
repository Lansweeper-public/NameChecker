import React, { createContext, useContext, useState } from "react";
import { FormFieldMap } from "../reports";

interface IFiltersState {
  filterValues: FormFieldMap;
  regExps: RegExp[];
  noRegExps: RegExp[];
  setFilterValues: (filters: FormFieldMap) => void;
  setRegExps: (filters: RegExp[]) => void;
  setNoRegExps: (filters: RegExp[]) => void;
}

const INITIAL_STATE = {
  filterValues: {},
  regExps: [],
  noRegExps: [],
  setFilterValues: () => undefined,
  setRegExps: () => undefined,
  setNoRegExps: () => undefined,
};

export const FiltersContext = createContext<IFiltersState>(INITIAL_STATE);

export const FiltersProvider: React.FC = ({ children }) => {
  const [filterValues, setFilterValues] = useState({});
  const [regExps, setRegExps] = useState<RegExp[]>([]);
  const [noRegExps, setNoRegExps] = useState<RegExp[]>([]);

  const onFilterValues = (filters: FormFieldMap) => {
    setFilterValues(filters);
  };

  const onRegExps = (rExps: RegExp[]) => {
    setRegExps(rExps);
  };

  const onNoRegExps = (rExps: RegExp[]) => {
    setNoRegExps(rExps);
  };

  return (
    <FiltersContext.Provider
      value={{
        filterValues,
        regExps,
        noRegExps,
        setFilterValues: onFilterValues,
        setRegExps: onRegExps,
        setNoRegExps: onNoRegExps,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => useContext(FiltersContext);
