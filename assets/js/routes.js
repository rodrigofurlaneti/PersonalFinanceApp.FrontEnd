// Arquivo: assets/js/routes.js

const API_BASE_URL = "https://localhost:7124/api";

const API_ROUTES = {
    EXPENSES_ASYNC: `${API_BASE_URL}/expenses/async`,
    EXPENSES_SYNC: `${API_BASE_URL}/expenses/sync`,
    INCOME: `${API_BASE_URL}/incomes/async`,
    EXPENSE_CATEGORY_ASYNC: `${API_BASE_URL}/expense-categories/async`,
    EXPENSE_CATEGORY_SYNC: `${API_BASE_URL}/expense-categories/sync`,
    INCOME_CATEGORY: `${API_BASE_URL}/income-categories/async`,
    CONFIG: `${API_BASE_URL}/settings/async`,
};