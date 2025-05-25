// Arquivo: assets/js/routes.js

const API_BASE_URL = "https://localhost:7124/api";

const API_ROUTES = {
    EXPENSES: `${API_BASE_URL}/expenses/async`,
    EXPENSES_SYNC: `${API_BASE_URL}/expenses/sync`,
    INCOME: `${API_BASE_URL}/incomes/async`,
    EXPENSE_CATEGORY: `${API_BASE_URL}/expensecategories/async`,
    INCOME_CATEGORY: `${API_BASE_URL}/incomecategories/async`,
    CONFIG: `${API_BASE_URL}/settings/async`,
};