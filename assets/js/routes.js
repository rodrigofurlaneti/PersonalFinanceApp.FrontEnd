// Arquivo: assets/js/routes.js

const API_BASE_URL = "https://localhost:7124/api";

const API_ROUTES = {
    EXPENSES_ASYNC: `${API_BASE_URL}/expenses/async`,
    EXPENSES_ORDERED_ASYNC: (orderBy, direction = 'asc') => `${API_BASE_URL}/expenses/async/ordered?orderBy=${orderBy}&direction=${direction}`,
    EXPENSES_ORDERED_SYNC: (orderBy, direction = 'asc') => `${API_BASE_URL}/expenses/sync/ordered?orderBy=${orderBy}&direction=${direction}`,
    EXPENSES_FILTERED_ASYNC: (filterBy, value) => `${API_BASE_URL}/expenses/async/filtered?filterBy=${filterBy}&value=${encodeURIComponent(value)}`,
    EXPENSES_GETALL_ORDERBY_EXPENSECATEGORYID_ASC_ASYNC: `${API_BASE_URL}/expenses/async/GetAllOrderByExpenseCategoryIdAsc`,
    EXPENSES_GETALL_ORDERBY_EXPENSECATEGORYID_DESC_ASYNC: `${API_BASE_URL}/expenses/async/GetAllOrderByExpenseCategoryIdDesc`,
    EXPENSES_SYNC: `${API_BASE_URL}/expenses/sync`,
    EXPENSES_GETBYID_ASYNC: `${API_BASE_URL}/expenses/async/{id}`,
    EXPENSES_GETBYID_SYNC: `${API_BASE_URL}/expenses/sync/{id}`,
    EXPENSES_UPDATE_ASYNC: `${API_BASE_URL}/expenses/async/{id}`,
    EXPENSES_UPDATE_SYNC: `${API_BASE_URL}/expenses/sync/{id}`,
    INCOME: `${API_BASE_URL}/incomes/async`,
    EXPENSE_CATEGORY_ASYNC: `${API_BASE_URL}/expense-categories/async`,
    EXPENSE_CATEGORY_SYNC: `${API_BASE_URL}/expense-categories/sync`,
    INCOME_CATEGORY: `${API_BASE_URL}/income-categories/async`,
    CONFIG: `${API_BASE_URL}/settings/async`,
};