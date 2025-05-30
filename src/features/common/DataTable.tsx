import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import Pagination from "./Pagination";

interface Column {
  key: string;
  label: string;
  width: string;
  type: string;
  render?: (item: any) => React.ReactNode;
}

interface Action {
  id: string;
  label: string;
  icon: string;
  type: string;
  onClick?: (data: any | any[]) => void;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  checkbox?: boolean;
  actions?: Action[];
  onSelectionChange?: (selectedItems: any[]) => void;
  onPageChange: (page: number) => void;
  totalPages?: number;
  onPageReset?: boolean;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  checkbox = false,
  actions = [],
  onSelectionChange,
  onPageChange,
  totalPages = 1,
  onPageReset = false,
}) => {
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  useEffect(() => {
    setSelectAll(data.length > 0 && selectedItems.length === data.length);
    onSelectionChange?.(selectedItems);
  }, [selectedItems, data]);

  useEffect(() => {
    if (onPageReset) {
      setSelectedItems([]);
      setSelectAll(false);
    }
  }, [onPageReset, currentPage]);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() }, { replace: true });
    onPageChange?.(page);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems([...data]);
    }
    setSelectAll(!selectAll);
  };

  const handleSelectItem = (item: any) => {
    const isSelected = selectedItems.some((i) => i._id === item._id);
    setSelectedItems((prev) =>
      isSelected ? prev.filter((i) => i._id !== item._id) : [...prev, item]
    );
  };

  return (
    <>
      <table className="table">
        <thead>
          {selectedItems.length <= 0 && (
            <tr>
              <th style={{ width: "5%" }}>
                <input
                  type="checkbox"
                  className="form-check-input"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              {columns.map((col) => (
                <th key={col.key} style={{ width: col.width }}>
                  {col.label}
                </th>
              ))}
            </tr>
          )}
          {checkbox && selectedItems.length > 0 && (
            <tr className="action-item">
              <th style={{ width: "5%" }}>
                <input
                  type="checkbox"
                  className="form-check-input select_all_action"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
              </th>
              <th colSpan={columns.length} className="text-start" style={{ width: "95%" }}>
                {actions.map((action) => {
                  const shouldHide = selectedItems.length > 1 && action.type === "single";
                  return !shouldHide ? (
                    <button
                      key={action.id}
                      type="button"
                      className="ps-2 action-element"
                      onClick={(e) => {
                        e.preventDefault();
                        action.onClick?.(selectedItems);
                      }}
                    >
                      <i className={action.icon}></i> {action.label}
                    </button>
                  ) : null;
                })}
              </th>
            </tr>
          )}
        </thead>
        <tbody>
          {data.length ? (
            data.map((item, index) => {
              const isChecked = selectedItems.some((i) => i._id === item._id);
              return (
                <tr key={item._id || index}>
                  {checkbox && (
                    <td style={{ width: "5%" }}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={isChecked}
                        onChange={() => handleSelectItem(item)}
                      />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} style={{ width: col.width }}>
                      {col.render ? col.render(item) : item[col.key] ?? "-"}
                    </td>
                  ))}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={columns.length + (checkbox ? 1 : 0)} className="text-center">
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {data.length > 0 && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};


export default DataTable;
