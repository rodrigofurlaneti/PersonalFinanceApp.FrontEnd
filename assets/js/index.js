function loadContent(model, page) {

    const content = document.getElementById('main-content');

    const route = `pages/${model}/${page}.html`;

    fetch(route)
        .then(response => {
            if (!response.ok) throw new Error('Página não encontrada');
            return response.text();
        })
        .then(html => {
            content.innerHTML = html;

            // Carrega o JS específico da página
            const scriptPath = `assets/js/${model}/${page}.js`;
            const script = document.createElement('script');
            script.src = scriptPath;
            script.onload = () => handlePageLoad(model, page);
            script.onerror = () => {
                content.innerHTML = `<h2>Erro</h2><p>Script ${scriptPath} não encontrado.</p>`;
            };
            document.body.appendChild(script);

            // Atualiza o hash da URL
            window.location.hash = `${model}/${page}`;
        })
        .catch(error => {
            content.innerHTML = `<h2>Erro</h2><p>${error.message}</p>`;
        });
}


function handlePageLoad(model, page) {
    switch (`${model}/${page}`) {
        case 'expense/expense-list':
            loadExpenses();
            break;

        case 'expense/expense-insert':
            setupExpenseForm();
            break;

        case 'expensecategory/expensecategory-list':
            loadExpensesCategories();
            break;

        case 'expensecategory/expensecategory-insert':
            setupExpenseCategoryForm();
            break;

        default:
            console.warn(`Nenhuma ação definida para ${model}/${page}`);
            break;
    }
}

async function loadExpenses() {
    const tbody = document.getElementById('expense-table-body');
    if (!tbody) {
        console.error('Tabela de despesas não encontrada');
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
        console.error('Tabela de categorias não encontrada');
        return;
    }

    tbody.innerHTML = `<tr><td colspan="2">Carregando...</td></tr>`;

    try {
        const response = await fetch(API_ROUTES.EXPENSE_CATEGORY_ASYNC);
        if (!response.ok) throw new Error('Erro ao buscar dados da API');

        const categories = await response.json();

        if (categories.length === 0) {
            tbody.innerHTML = '<tr><td colspan="2">Nenhuma categoria encontrada.</td></tr>';
            return;
        }

        tbody.innerHTML = '';

        categories.forEach(category => {
            tbody.innerHTML += `
                <tr>
                    <td>${category.name}</td>
                    <td>
                        <button class="btn btn-sm btn-warning">Editar</button>
                        <button class="btn btn-sm btn-danger">Excluir</button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        tbody.innerHTML = `<tr><td colspan="2">Erro ao carregar categorias: ${error.message}</td></tr>`;
        console.error('Erro ao buscar categorias:', error);
    }
}