interface IFiltersCondition {
  operator: string;
  path: string;
  value: string;
}

interface IFiltersInput {
  conjunction?: string;
  conditions: IFiltersCondition[];
}

export interface IFiltersGroupedInput {
  conjunction?: string;
  conditions?: IFiltersCondition[];
  groups?: IFiltersInput[];
}
