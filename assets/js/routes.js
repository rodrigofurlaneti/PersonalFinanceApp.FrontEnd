// Arquivo: assets/js/routes.js

const API_BASE_URL = "https://localhost:7124/api";

const API_ROUTES = {
    EXPENSES_ASYNC: `${API_BASE_URL}/expenses/async`,
    EXPENSES_GETALL_ORDERBY_NAME_ASC_ASYNC: `${API_BASE_URL}/expenses/async/GetAllOrderByNameAsc`,
    EXPENSES_GETALL_ORDERBY_NAME_DESC_ASYNC: `${API_BASE_URL}/expenses/async/GetAllOrderByNameDesc`,
    EXPENSES_GETALL_ORDERBY_DESCRIPTION_ASC_ASYNC: `${API_BASE_URL}/expenses/async/GetAllOrderByDescriptionAsc`,
    EXPENSES_GETALL_ORDERBY_DESCRIPTION_DESC_ASYNC: `${API_BASE_URL}/expenses/async/GetAllOrderByDescriptionDesc`,
    EXPENSES_GETALL_ORDERBY_DUEDATE_ASC_ASYNC: `${API_BASE_URL}/expenses/async/GetAllOrderByDueDateAsc`,
    EXPENSES_GETALL_ORDERBY_DUEDATE_DESC_ASYNC: `${API_BASE_URL}/expenses/async/GetAllOrderByDueDateDesc`,
    EXPENSES_GETALL_ORDERBY_PAIDAT_ASC_ASYNC: `${API_BASE_URL}/expenses/async/GetAllOrderByPaidAtAsc`,
    EXPENSES_GETALL_ORDERBY_PAIDAT_DESC_ASYNC: `${API_BASE_URL}/expenses/async/GetAllOrderByPaidAtDesc`,
    EXPENSES_SYNC: `${API_BASE_URL}/expenses/sync`,
    INCOME: `${API_BASE_URL}/incomes/async`,
    EXPENSE_CATEGORY_ASYNC: `${API_BASE_URL}/expense-categories/async`,
    EXPENSE_CATEGORY_SYNC: `${API_BASE_URL}/expense-categories/sync`,
    INCOME_CATEGORY: `${API_BASE_URL}/income-categories/async`,
    CONFIG: `${API_BASE_URL}/settings/async`,
};