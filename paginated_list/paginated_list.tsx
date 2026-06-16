/*
 * Paginated List Component
 * Start time:: 09:39 PM
 * End time: 10:14 PM (after adding prev/next buttons following 30 min timed block)
 *
 * Build a paginated transaction list in React.
 * - Display a list of transactions in a table
 * - Show 5 transactions per page by default
 * - Allow the user to change page size via a dropdown: 5, 10, 20
 * - Show Previous and Next buttons to navigate pages
 * - Disable Previous on the first page, disable Next on the last page
 * - Show "Page X of Y" somewhere on the component
 */
 
import "./styles.css";
import { useState, useMemo, useCallback } from "react";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "credit" | "debit";
  date: string;
}

interface PaginatedTransactionListProps {
  transactions: Transaction[];
}

export default function PaginatedTransactionList({
  transactions,
}: PaginatedTransactionListProps) {
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const numPages: number = useMemo(() => {
    return Math.ceil(transactions.length / rowsPerPage);
  }, [rowsPerPage]);

  const visibleTransactions = useMemo(() => {
    // First transaction shown
    const endIndex = currentPage * rowsPerPage;
    const startIndex = endIndex - rowsPerPage;
    return transactions.slice(startIndex, endIndex);
  }, [transactions, rowsPerPage, currentPage]);

  const toPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

  const toNextPage = useCallback(() => {
    // Check that the next page exists.
    if (currentPage < numPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, numPages]);

  const canGoToPreviousPage = useMemo(() => {
    return currentPage !== 1;
  }, [currentPage]);

  const canGoToNextPage = useMemo(() => {
    return currentPage !== numPages;
  }, [currentPage]);

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {visibleTransactions.map((transaction) => {
            return (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.description}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.type}</td>
                <td>{transaction.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="page-footer">
        <span>
          Page {currentPage} of {numPages}
        </span>
        <select onChange={(e) => setRowsPerPage(parseInt(e.target.value))}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
      <div className="page-buttons">
        <button
          disabled={!canGoToPreviousPage}
          aria-label="Go to previous page"
          onClick={toPreviousPage}
        >
          <span> {`<`} </span>
        </button>
        <button
          disabled={!canGoToNextPage}
          aria-label="Go to next page"
          onClick={toNextPage}
        >
          <span> {`>`} </span>
        </button>
      </div>
    </div>
  );
}
