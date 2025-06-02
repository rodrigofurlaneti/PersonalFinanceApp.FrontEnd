function loadContent(page) {
    const content = document.getElementById('main-content');

    fetch(`pages/${page}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Página não encontrada');
            }
            return response.text();
        })
        .then(html => {
            content.innerHTML = html;
            window.location.hash = page;

            // Verifica se é a página de despesa e carrega os dados
            if (page === 'expense-list') {
                loadExpenses();
            }

            // Verifica se é a página de cadastro de despesa e ativa o formulário
            if (page === 'expense-insert') {
                setupExpenseForm();
            }

            // Verifica se é a página da categoria de despesa e carrega os dados
            if (page === 'expensecategory-list') {
                loadExpensesCategories();
            }

            // Verifica se é a página de cadastro de categoria de despesa e ativa o formulário
            if (page === 'expensecategory-insert') {
                setupExpenseCategoryForm();
            }
        })
        .catch(error => {
            content.innerHTML = `<h2>Erro</h2><p>${error.message}</p>`;
        });
}

async function loadExpenses() {
    const tbody = document.getElementById('expense-table-body');

    if (!tbody) {
        console.error('Tabela não encontrada no HTML');
        return;
    }

    tbody.innerHTML = `<tr><td colspan="4">Carregando...</td></tr>`;

    try {
        const response = await fetch(API_ROUTES.EXPENSES_ASYNC);
        if (!response.ok) throw new Error('Erro ao buscar dados da API');

        const expenses = await response.json();

        if (expenses.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4">Nenhuma despesa encontrada.</td></tr>';
            return;
        }

        tbody.innerHTML = '';

        let total = 0;

        expenses.forEach(expense => {
            total += expense.amount;

            tbody.innerHTML += `
                <tr>
                    <td>${expense.description}</td>
                    <td>R$ ${expense.amount.toFixed(2)}</td>
                    <td>${new Date(expense.dueDate).toLocaleDateString()}</td>
                    <td>
                        <button class="btn btn-sm btn-warning">Editar</button>
                        <button class="btn btn-sm btn-danger">Excluir</button>
                    </td>
                </tr>
            `;
        });

        tbody.innerHTML += `
            <tr style="font-weight: bold; background-color: #f8f9fa;">
                <td>Total</td>
                <td>R$ ${total.toFixed(2)}</td>
                <td></td>
                <td></td>
            </tr>
        `;

    } catch (error) {
        tbody.innerHTML = `<tr><td colspan="4">Erro ao carregar despesas: ${error.message}</td></tr>`;
        console.error('Erro ao buscar despesas:', error);
    }
}

async function loadExpensesCategories() {
    const tbody = document.getElementById('expensecategory-table-body');

    if (!tbody) {
        console.error('Tabela não encontrada no HTML');
        return;
    }

    tbody.innerHTML = `<tr><td colspan="4">Carregando...</td></tr>`;

    try {
        const response = await fetch(API_ROUTES.EXPENSE_CATEGORY_ASYNC);
        if (!response.ok) throw new Error('Erro ao buscar dados da API');

        const expensescategories = await response.json();

        if (expensescategories.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4">Nenhuma despesa encontrada.</td></tr>';
            return;
        }

        tbody.innerHTML = '';

        expensescategories.forEach(expensecategory => {

            tbody.innerHTML += `
                <tr>
                    <td>${expensecategory.name}</td>
                    <td>
                        <button class="btn btn-sm btn-warning">Editar</button>
                        <button class="btn btn-sm btn-danger">Excluir</button>
                    </td>
                </tr>
            `;
        });

    } catch (error) {
        tbody.innerHTML = `<tr><td colspan="4">Erro ao carregar a categoria da despesas: ${error.message}</td></tr>`;
        console.error('Erro ao buscar a categoria da despesas:', error);
    }
}