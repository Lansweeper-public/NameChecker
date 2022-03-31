import React, { useEffect, useState } from "react";
import { Form } from "react-final-form";
import { v4 } from "uuid";
import { FilterTable } from "./FilterTable";
import { EQUAL_TO } from "./FilterTable.columns";
import { buildRegExp } from "./RegExp";
import {
  StyledCancelButton,
  StyledExpressionTag,
  StyledFilterContainer,
  StyledForm,
  StyledFormFooter,
  StyledHeader,
  StyledButton,
  StyledEditButton,
  StyledIcon,
  StyledTagList,
  StyledTagListContainer,
} from "./FiltersForm.styles";
import { FormApi } from "final-form";
import { ConfirmationModal, HelpModal } from "../../modals";

export const generateNewRow = (): string => v4();

interface IFormField {
  enterText: string;
  selectOption: string;
  selectOperator: string;
}

export type FormFieldMap = Record<string, IFormField>;

const getTagLabel = (id: string, filterValues) =>
  filterValues[id]
    ? `${filterValues[id].selectOption}${
        filterValues[id].selectOperator === EQUAL_TO ? "= " : "!= "
      }${filterValues[id].enterText}`
    : undefined;

const valuesToFilteredValues = (values, cleanedRowIds, form) => {
  const keysInValues = Object.keys(values);
  return keysInValues.reduce((acc, cur, index) => {
    const [column, id] = cur.split("#");
    const value = values[keysInValues[index]];
    if (!cleanedRowIds.includes(id)) {
      removeRowFromValues(id, form);
      return acc;
    }
    acc[id] = {
      ...acc[id],
      [column]: value,
    };
    return acc;
  }, {});
};

const removeRowsWithoutInputText = (rowIds, values) => {
  const keysInValues = Object.keys(values);
  const emptyTextItems = rowIds.filter(
    (item) => !keysInValues.find((key) => key === `enterText#${item}`),
  );
  emptyTextItems.forEach((emptyItem) => {
    const indexItemWithExpression = rowIds.findIndex(
      (item) => item === emptyItem,
    );
    rowIds.splice(indexItemWithExpression, 1);
  });

  return rowIds;
};

const sameValuesThanInitial = (values, initialValues) =>
  Object.keys(values).length === Object.keys(initialValues).length &&
  Object.entries(values).every(([key, value]) => initialValues[key] === value);

const allInputTextValuesEmpty = (values) =>
  Object.entries(values)
    .filter(([key]) => {
      return key.includes("enterText");
    })
    .every(([, value]) => !value);

const determineDisable = (values, initialValues) => {
  return (
    sameValuesThanInitial(values, initialValues) ||
    allInputTextValuesEmpty(values)
  );
};

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

const removeRowFromValues = (id, form) => {
  form.change(`enterText#${id}`, undefined);
  form.change(`selectOption#${id}`, undefined);
  form.change(`selectOperator#${id}`, undefined);
};

const resetNewRowsAfterCancel = (form, filterValues) => {
  Object.keys(form.getState().values)
    .map((value) => {
      const [, rowId] = value.split("#");
      return rowId;
    })
    .filter((rowId) => !Object.keys(filterValues).includes(rowId))
    .forEach((removedRowId) => removeRowFromValues(removedRowId, form));
};

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

  const onSubmit = (values, form) => {
    const cleanedRowIds = removeRowsWithoutInputText(rowIds, values);

    const newFilteredValues = valuesToFilteredValues(
      values,
      cleanedRowIds,
      form,
    );

    setRowIds(cleanedRowIds);
    setFilterValues(newFilteredValues);
    setIsReadMode(true);
    setAreFiltersApplied(true);
    onFiltersApplied(newFilteredValues);
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

    resetNewRowsAfterCancel(form, filterValues);

    setRowIds(Object.keys(filterValues));
    setIsReadMode(true);
  };

  const deleteAllFilters = (rowIds, form) => {
    rowIds.forEach((rowId) => removeRowFromValues(rowId, form));
    const item = generateNewRow();
    setRowIds([item]);
    setIsReadMode(false);
    setAreFiltersApplied(false);
    setFilterValues({});
    onDeleteAllTags();
  };

  useEffect(() => {
    if (Object.keys(filterValues).length) {
      setInitialValues(generateInitialValues(filterValues));
    }
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
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ handleSubmit, values, form }) => {
          return (
            <>
              <StyledHeader>
                <StyledForm onSubmit={handleSubmit}>
                  <StyledIcon
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
                                label={getTagLabel(item, filterValues)}
                                value={item}
                                onClick={() => handleExpressionTagClick(item)}
                                onClose={(key) => {
                                  const newItems = rowIds.filter(
                                    (rowId) => rowId !== key,
                                  );

                                  if (newItems.length === 0) {
                                    deleteAllFilters(rowIds, form);
                                  } else {
                                    removeRowFromValues(key, form);
                                    setRowIds([...newItems]);

                                    delete filterValues[item];
                                    setFilterValues(filterValues);
                                    setInitialValues(
                                      generateInitialValues(filterValues),
                                    );
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
                        handleRemoveRow={(id) => {
                          handleRemoveRow(id);
                          removeRowFromValues(id, form);
                        }}
                      />
                    )}
                    <StyledFormFooter isReadMode={isReadMode}>
                      {!isReadMode && areFiltersApplied && (
                        <StyledCancelButton
                          type="button"
                          secondary
                          onClick={() => handleCancelClick(form)}
                        >
                          Cancel
                        </StyledCancelButton>
                      )}
                      {!isReadMode && (
                        <StyledButton
                          data-test-id="filter-table__apply-button"
                          type="submit"
                          disabled={determineDisable(values, initialValues)}
                          loading={false}
                        >
                          Apply
                        </StyledButton>
                      )}
                      {isReadMode && (
                        <>
                          <StyledEditButton
                            type="button"
                            onClick={() => {
                              setSelectedRows([]);
                              setIsReadMode(false);
                            }}
                          >
                            Edit
                          </StyledEditButton>
                          <StyledButton
                            type="button"
                            secondary
                            onClick={() => onChangeSite()}
                          >
                            Change Site
                          </StyledButton>
                          <StyledButton
                            type="button"
                            secondary
                            onClick={() => setDeleteModalOpen(true)}
                          >
                            Delete All
                          </StyledButton>
                        </>
                      )}
                    </StyledFormFooter>
                  </StyledFilterContainer>
                </StyledForm>
              </StyledHeader>

              <ConfirmationModal
                loading={loading}
                dataTestId="delete-filters__confirmation-modal"
                title="Delete all filters"
                message="Are you sure you want to remove all filters?"
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={() => {
                  deleteAllFilters(rowIds, form);
                  setDeleteModalOpen(false);
                }}
              />
            </>
          );
        }}
      />
      <HelpModal open={showHelpModal} onClose={() => setShowHelpModal(false)} />
    </>
  );
};
