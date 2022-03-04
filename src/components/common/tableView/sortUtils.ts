import { ITableItem } from "./Table.types";

export const sortByItemAttributeText = (
  items: ITableItem[],
  sortByColumnKey: string,
  direction: "ASC" | "DESC" | undefined,
): ITableItem[] => {
  if (sortByColumnKey && items) {
    return [...items].sort((a, b) => {
      const aColumn = a.attributes[sortByColumnKey!];
      const bColumn = b.attributes[sortByColumnKey!];

      const aVal = aColumn.value ?? aColumn.text!;
      const bVal = bColumn.value ?? bColumn.text!;

      // JS sort function is mutable...
      const ta = typeof aVal === "string" ? aVal.toLowerCase() : aVal;
      const tb = typeof bVal === "string" ? bVal.toLowerCase() : bVal;
      if (ta < tb) return direction === "ASC" ? -1 : 1;
      if (ta > tb) return direction === "ASC" ? 1 : -1;
      return 0;
    });
  }
  return items;
};
