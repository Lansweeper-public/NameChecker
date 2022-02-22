import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";
import { v4 } from "uuid";
import { ConfirmationModal } from "../common/ConfirmationModal";
import { HelpModal } from "../modals/HelpModal";
import { FilterTable } from "./FilterTable";
import { EQUAL_TO } from "./FilterTable.columns";
import { buildRegExp } from "./RegExp";
import {
  StyledCancelLECButton,
  StyledExpressionTag,
  StyledFilterContainer,
  StyledForm,
  StyledFormFooter,
  StyledHeader,
  StyledLECButton,
  StyledLECEditButton,
  StyledLECIcon,
  StyledTagList,
  StyledTagListContainer,
} from "./FiltersForm.styles";
import { FormApi } from "final-form";

export const generateNewRow = (): string => v4();

interface IFormField {
  enterText: string;
  selectOption: string;
  selectOperator: string;
}

export type FormFieldMap = Record<string, IFormField>;

const determineDisable = (pristine, touched, values) =>
  touched
    ? pristine && Object.keys(touched).length === Object.keys(values).length
    : pristine;

const generateInitialValues = (
  filterValues: FormFieldMap,
  initialRowsIds?: string[],
) =>
  Object.keys(filterValues).reduce((acc, id) => {
    initialRowsIds?.push(id);
    acc[`enterText#${id}`] = filterValues[id].enterText;
    acc[`selectOption#${id}`] = filterValues[id].selectOption;
    acc[`selectOperator#${id}`] = filterValues[id].selectOperator;
    return acc;
  }, {});

interface IFilterFormProps {
  loading: boolean;
  onChangeSite: () => void;
  onChangeFilters: (regExps: RegExp[], noRegExps: RegExp[]) => void;
  onFiltersApplied: (columns) => void;
  onDeleteAllTags: () => void;
  initialValue: Record<string, IFormField>;
}

export const FiltersForm: React.FC<IFilterFormProps> = ({
  loading,
  onChangeSite,
  onChangeFilters,
  onFiltersApplied,
  onDeleteAllTags,
  initialValue,
}) => {
  const [isReadMode, setIsReadMode] = useState<boolean>(false);
  const [areFiltersApplied, setAreFiltersApplied] = useState<boolean>(false);
  const [filterValues, setFilterValues] = useState({});
  const [rowIds, setRowIds] = useState<string[]>([]);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [initialValues, setInitialValues] = useState({});

  const handleRemoveRow = (id: string) => {
    setRowIds((prev) => {
      if (prev.length > 1) {
        const idIndex = prev.findIndex((item) => item === id);
        if (idIndex >= 0) {
          prev.splice(idIndex, 1);
          return [...prev];
        }
      }
      return prev;
    });
  };

  const handleAddRow = (id: string) => {
    setRowIds((prev) => {
      const index = prev.findIndex((rowId) => rowId === id);
      const item = generateNewRow();
      prev.splice(index + 1, 0, item);
      return [...prev];
    });
  };

  useEffect(() => {
    if (!rowIds.length) {
      const firstRow = generateNewRow();
      rowIds.splice(0, 0, firstRow);
      setRowIds([...rowIds]);
    }
  }, [rowIds]);

  const onSubmit = (values) => {
    const keys = Object.keys(values);
    const emptyTextItems = rowIds.filter(
      (item) => !keys.find((key) => key === `enterText#${item}`),
    );
    emptyTextItems.forEach((emptyItem) => {
      const indexItemWithExpression = rowIds.findIndex(
        (item) => item === emptyItem,
      );
      rowIds.splice(indexItemWithExpression, 1);
    });
    const columns = keys.reduce((acc, cur, index) => {
      const [column, id] = cur.split("#");
      const value = values[keys[index]];
      if (!rowIds.includes(id)) {
        return acc;
      }
      acc[id] = {
        ...acc[id],
        [column]: value,
      };
      return acc;
    }, {});
    setRowIds(() => [...rowIds]);
    setFilterValues(columns);
    setIsReadMode(true);
    setAreFiltersApplied(true);
    onFiltersApplied(columns);
  };

  const handleExpressionTagClick = (item: string) => {
    setIsReadMode(false);
    setSelectedRows([item]);
  };

  useEffect(() => {
    if (isReadMode) {
      const regexps = buildRegExp(filterValues);
      onChangeFilters(regexps.matchers, regexps.nomatchers);
    }
  }, [isReadMode, rowIds, filterValues]);

  const handleCancelClick = (form: FormApi) => {
    form.reset();
    setRowIds((prev) => [...Object.keys(filterValues)]);
    setIsReadMode(true);
  };

  const getTagLabel = (id: string) =>
    filterValues[id]
      ? `${filterValues[id].selectOption}${
          filterValues[id].selectOperator === EQUAL_TO ? "= " : "!= "
        }${filterValues[id].enterText}`
      : undefined;

  useEffect(() => {
    setInitialValues(() => generateInitialValues(filterValues));
  }, [filterValues]);

  useEffect(() => {
    if (Object.keys(initialValue).length) {
      const initialRowsIds: string[] = [];
      setFilterValues(initialValue);
      setAreFiltersApplied(true);
      setIsReadMode(true);
      const initValue = generateInitialValues(initialValue, initialRowsIds);
      setInitialValues(() => initValue);
      setRowIds(() => [...initialRowsIds]);
    }
  }, []);

  return (
    <>
      <StyledHeader>
        <Form
          initialValues={initialValues}
          onSubmit={onSubmit}
          render={({ handleSubmit, pristine, touched, values, form }) => {
            return (
              <StyledForm onSubmit={handleSubmit}>
                <StyledLECIcon
                  icon="help"
                  onClick={() => setShowHelpModal(true)}
                  size={24}
                />
                <StyledFilterContainer>
                  {isReadMode ? (
                    <StyledTagListContainer>
                      <StyledTagList>
                        {rowIds &&
                          rowIds.map((item) => (
                            <StyledExpressionTag
                              key={item}
                              label={getTagLabel(item)}
                              value={item}
                              onClick={() => handleExpressionTagClick(item)}
                              onClose={(key) => {
                                const newItems = rowIds.filter(
                                  (rowId) => rowId !== key,
                                );
                                setRowIds([...newItems]);
                                setFilterValues((prev) => {
                                  delete prev[item];
                                  return prev;
                                });
                                if (newItems.length === 0) {
                                  setRowIds([generateNewRow()]);
                                  setIsReadMode(false);
                                  setAreFiltersApplied(false);
                                  onDeleteAllTags();
                                }
                              }}
                            />
                          ))}
                      </StyledTagList>
                    </StyledTagListContainer>
                  ) : (
                    <FilterTable
                      items={rowIds}
                      selectedRows={selectedRows}
                      handleAddRow={handleAddRow}
                      handleRemoveRow={handleRemoveRow}
                    />
                  )}
                  <StyledFormFooter isReadMode={isReadMode}>
                    {!isReadMode && areFiltersApplied && (
                      <StyledCancelLECButton
                        type="button"
                        secondary
                        onClick={() => handleCancelClick(form)}
                      >
                        Cancel
                      </StyledCancelLECButton>
                    )}
                    {!isReadMode && (
                      <StyledLECButton
                        data-test-id="filter-table__apply-button"
                        type="submit"
                        disabled={determineDisable(pristine, touched, values)}
                        loading={false}
                      >
                        Apply
                      </StyledLECButton>
                    )}
                    {isReadMode && (
                      <>
                        <StyledLECEditButton
                          type="button"
                          onClick={() => {
                            setSelectedRows([]);
                            setIsReadMode(false);
                          }}
                        >
                          Edit
                        </StyledLECEditButton>
                        <StyledLECButton
                          type="button"
                          secondary
                          onClick={() => onChangeSite()}
                        >
                          Change Site
                        </StyledLECButton>
                        <StyledLECButton
                          type="button"
                          secondary
                          onClick={() => setDeleteModalOpen(true)}
                        >
                          Delete All
                        </StyledLECButton>
                      </>
                    )}
                  </StyledFormFooter>
                </StyledFilterContainer>
              </StyledForm>
            );
          }}
        />
      </StyledHeader>
      <ConfirmationModal
        loading={loading}
        dataTestId="delete-filters__confirmation-modal"
        title="Delete all filters"
        message="Are you sure you want to remove all filters?"
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          const item = generateNewRow();
          setRowIds([item]);
          setIsReadMode(false);
          setAreFiltersApplied(false);
          setFilterValues({});
          onDeleteAllTags();
          setDeleteModalOpen(false);
        }}
      />
      <HelpModal open={showHelpModal} onClose={() => setShowHelpModal(false)} />
    </>
  );
};
