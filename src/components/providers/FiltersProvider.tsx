import React, { createContext, useContext, useState } from "react";
import { FormFieldMap } from "../reports";

interface IFiltersState {
  filterValues: FormFieldMap;
  regExps: RegExp[];
  esRegExps: string[];
  noEsRegExps: string[];
  setFilterValues: (filters: FormFieldMap) => void;
  setRegExps: (filters: RegExp[]) => void;
  setEsRegExps: (filters: string[]) => void;
  setNoEsRegExps: (filters: string[]) => void;
}

const INITIAL_STATE = {
  filterValues: {},
  regExps: [],
  esRegExps: [],
  noEsRegExps: [],
  setFilterValues: () => undefined,
  setRegExps: () => undefined,
  setEsRegExps: () => undefined,
  setNoEsRegExps: () => undefined,
};

export const FiltersContext = createContext<IFiltersState>(INITIAL_STATE);

export const FiltersProvider: React.FC = ({ children }) => {
  const [filterValues, setFilterValues] = useState({});
  const [regExps, setRegExps] = useState<RegExp[]>([]);
  const [esRegExps, setEsRegExps] = useState<string[]>([]);
  const [noEsRegExps, setNoEsRegExps] = useState<string[]>([]);

  const onFilterValues = (filters: FormFieldMap) => {
    setFilterValues(filters);
  };

  const onRegExps = (rExps: RegExp[]) => {
    setRegExps(rExps);
  };

  const onEsRegExps = (rExps: string[]) => {
    setEsRegExps(rExps);
  };

  const onNoEsRegExps = (rExps: string[]) => {
    setNoEsRegExps(rExps);
  };

  return (
    <FiltersContext.Provider
      value={{
        filterValues,
        regExps,
        esRegExps,
        noEsRegExps,
        setFilterValues: onFilterValues,
        setRegExps: onRegExps,
        setEsRegExps: onEsRegExps,
        setNoEsRegExps: onNoEsRegExps,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => useContext(FiltersContext);
