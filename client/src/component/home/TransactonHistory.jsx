import React, { useState } from "react";
import {
  Table,
  Badge,
  Button,
  Select,
  Spinner,
  TableHead,
  TableHeadCell,
  TableRow,
  TableBody,
  TableCell,
  ButtonGroup,
} from "flowbite-react";

import toast from "react-hot-toast";
import { dateFormatter } from "../../utils/helperfunc";
import Filter from "../Filter";
import { useExpenses, useRemoveTxn } from "../../hooks/useExpense";

export default function TransactionHistory() {
  const [toggleId, setToggleId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(15);
  const [value, setValue] = useState("all");

  const { mutateAsync: removeExpense, isPending: rmPending } = useRemoveTxn();
  const { data: expense, isPending } = useExpenses(currentPage, count, value);

  const txns = expense?.allTransactions || [];
  const totalPages = expense?.totalPages || 1;

  const handleRemove = async (e, id, type) => {
    e.stopPropagation();
    if (!window.confirm("Delete this transaction?")) return;
    try {
      await removeExpense({ id, type });
      toast.success("Transaction removed");
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Failed to remove");
    }
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-gray-900 text-gray-400 rounded-lg border border-gray-800 text-sm overflow-hidden">
      {" "}
      {/* Header */}
      <div className="p-3 shrink-0 flex flex-wrap justify-between items-center gap-3 border-b border-gray-800">
        <div>
          <h3 className="text-base font-semibold text-white">
            Transaction History
          </h3>
          <p className="text-xs text-gray-500">Recent expenses and income</p>
        </div>
        <Filter
          setValue={setValue}
          setCurrentPage={setCurrentPage}
          value={value}
        />
      </div>
      {/* Flowbite Scrollable Table */}
      <div className="overflow-y-auto scrollbar-hidden">
        <Table hoverable className="text-left w-full">
          <TableHead className="sticky top-0 z-10 bg-gray-800 text-gray-400">
            <TableRow>
              <TableHeadCell className="p-3 w-10 bg-gray-800">#</TableHeadCell>
              <TableHeadCell className="p-3 bg-gray-800">
                Description
              </TableHeadCell>
              <TableHeadCell className="p-3 bg-gray-800">Type</TableHeadCell>
              <TableHeadCell className="p-3 text-right bg-gray-800">
                Amount
              </TableHeadCell>
              <TableHeadCell className="p-3 text-right bg-gray-800">
                Action
              </TableHeadCell>
            </TableRow>
          </TableHead>

          <TableBody className="divide-y divide-gray-800 ">
            {isPending ? (
              <TableRow>
                <TableCell colSpan={5} className="py-8 text-center bg-gray-900">
                  <Spinner size="md" />
                </TableCell>
              </TableRow>
            ) : txns.length ? (
              txns.map((ex, i) => {
                const open = toggleId === ex._id;
                const isExpense = ex.type === "expense";

                return (
                  <React.Fragment key={ex._id || i}>
                    <TableRow
                      onClick={() => setToggleId(open ? null : ex._id)}
                      className={`cursor-pointer border-b border-gray-800 transition-colors ${
                        open
                          ? "bg-gray-800 text-white hover:bg-gray-900"
                          : "bg-gray-900 hover:bg-gray-800"
                      }`}
                    >
                      <TableCell className="p-3 text-gray-500">
                        {(currentPage - 1) * count + i + 1}
                      </TableCell>
                      <TableCell className="p-3 font-medium text-white truncate">
                        {ex.name}
                      </TableCell>
                      <TableCell className="p-3">
                        <Badge
                          color={isExpense ? "failure" : "success"}
                          size="xs"
                          className="w-fit"
                        >
                          {ex.type}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className={`p-3 text-right font-semibold ${
                          isExpense ? "text-red-400" : "text-green-400"
                        }`}
                      >
                        {isExpense ? "-" : "+"}₹
                        {Number(ex.amount).toLocaleString()}
                      </TableCell>
                      <TableCell className="p-3 text-right">
                        <button
                          type="button"
                          disabled={rmPending}
                          onClick={(e) => handleRemove(e, ex._id, ex.type)}
                          className="text-xs text-red-400 hover:underline disabled:opacity-50"
                        >
                          {rmPending && open ? "..." : "Remove"}
                        </button>
                      </TableCell>
                    </TableRow>

                    {/* Expandable Details Row */}
                    {open && (
                      <TableRow className="bg-gray-950 border-b border-gray-800">
                        <TableCell colSpan={5} className="p-0">
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 text-xs bg-gray-950 text-gray-400"
                          >
                            <p>
                              Category:{" "}
                              <b className="text-gray-200 capitalize font-medium">
                                {ex.category || "Other"}
                              </b>
                            </p>
                            <p>
                              Mode:{" "}
                              <b className="text-gray-200 capitalize font-medium">
                                {ex.paymentMethod || ex.mode || "Online"}
                              </b>
                            </p>
                            <p>
                              Date:{" "}
                              <b className="text-gray-200 font-medium">
                                {dateFormatter(ex.createdAt).date}
                              </b>
                            </p>
                            <p>
                              Time:{" "}
                              <b className="text-gray-200 font-medium">
                                {dateFormatter(ex.createdAt).time}
                              </b>
                            </p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="p-8 text-center text-gray-500 bg-gray-900"
                >
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* Pinned Pagination Footer */}
      <div className="p-3 shrink-0 flex justify-between items-center gap-2 border-t border-gray-800 bg-gray-900 text-xs">
        <div className="flex items-center gap-2">
          <span>Show:</span>
          <Select
            sizing="sm"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-20"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </Select>
        </div>

        <span>
          Page <strong className="text-white">{currentPage}</strong> of{" "}
          <strong className="text-white">{totalPages}</strong>
        </span>

        <ButtonGroup>
          <Button
            size="xs"
            color="gray"
            disabled={currentPage === 1 || rmPending}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          >
            Prev
          </Button>
          <Button
            size="xs"
            color="gray"
            disabled={currentPage === totalPages || rmPending}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          >
            Next
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
}
