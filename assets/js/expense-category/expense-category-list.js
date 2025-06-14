// 🔁 Função padrão: carrega as categorias das despesas sem ordenação
async function loadExpensesCategories() {
    const tbody = document.getElementById('expense-category-table-body');
    if (!tbody) {
        console.error('Tabela de categoria de despesas não encontrada');
        return;
    }

    tbody.innerHTML = `<tr><td colspan="6">Carregando...</td></tr>`;

    try {
       
        const response = await fetch(API_ROUTES.EXPENSES_CATEGORIES_ASYNC);

        if (!response.ok) throw new Error('Erro ao buscar dados da API');

        const expensescategories = await response.json();

        renderAllExpenseCategoryViews(expensescategories, API_ROUTES.EXPENSES_CATEGORIES_ASYNC);

    } catch (error) {
        tbody.innerHTML = `<tr><td colspan="6">Erro ao carregar categoria despesas: ${error.message}</td></tr>`;
        console.error('Erro ao buscar categoria de despesas:', error);
    }
}

// 🆕 Função com ordenação: recebe a URL da rota ordenada
async function loadExpensesCategoriesOrdered(apiUrl) {
    const tbody = document.getElementById('expense-category-table-body');
    if (!tbody) {
        console.error('Tabela de categoria despesas não encontrada');
        return;
    }

    tbody.innerHTML = `<tr><td colspan="6">Carregando...</td></tr>`;

    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) throw new Error('Erro ao buscar dados ordenados da API');

        const expensescategories = await response.json();
        
        console.log('Despesas ordenadas:', expensescategories);

        renderAllExpenseCategoryViews(expensescategories, API_ROUTES.EXPENSES_CATEGORIES_ASYNC);

    } catch (error) {
        tbody.innerHTML = `<tr><td colspan="6">Erro: ${error.message}</td></tr>`;
        console.error('Erro ao carregar categoria de despesas ordenadas:', error);
    }

    document.getElementById('expense-category-table-body').classList.add('loaded');
}

// ♻️ Função reutilizável para renderizar despesas
function renderExpensesCategories(expensescategories, reloadUrl) {

    const tbody = document.getElementById('expense-category-table-body');

    tbody.innerHTML = '';

    if (!expensescategories || expensescategories.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6">Nenhuma categoria de despesa encontrada.</td></tr>';
        return;
    }

    expensescategories.forEach(expensecategory => {

        tbody.innerHTML += `
            <tr>
                <td class="text-center font-size">${expensecategory.name}</td>
                <td class="text-center font-size">
                    <button class="btn btn-warning btn-sm btn-expense-category-edit" 
                            title="Editar"
                            data-id="${expensecategory.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger btn-expense-category-delete" 
                            title="Excluir"
                            data-id="${expensecategory.id}" 
                            data-name="${expensecategory.name}"
                            data-reload="${reloadUrl}">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML += `
        <tr style="font-weight: bold; background-color: #f8f9fa;">
            <td></td>
            <td></td>
        </tr>
    `;

    document.querySelectorAll('.btn-expense-category-delete').forEach(button => {
        button.addEventListener('click', async function () {
            const expenseId = this.getAttribute('data-id');
            const expenseName = this.getAttribute('data-name');
            const reloadUrl = this.getAttribute('data-reload');

            const result = await Swal.fire({
                title: `Você deseja excluir a categoria de despesa "${expenseName}"?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não',
            });

            if (result.isConfirmed) {
                try {
                    const deleteResponse = await fetch(`${API_ROUTES.EXPENSES_CATEGORIES_ASYNC}/${expenseId}`, {
                        method: 'DELETE',
                    });

                    if (!deleteResponse.ok) throw new Error('Erro ao excluir a categoria de despesa');

                    Swal.fire({
                        icon: 'success',
                        title: 'Excluído!',
                        text: 'Categoria de despesa excluída com sucesso.',
                        timer: 4500,
                        showConfirmButton: false,
                    });

                    // Recarrega a partir da rota usada (ordenada ou não)
                    if (reloadUrl === API_ROUTES.EXPENSES_CATEGORIES_ASYNC) {
                        loadExpensesCategories();
                    } else {
                        loadExpensesCategoriesOrdered(reloadUrl);
                    }

                } catch (error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro',
                        text: `Falha ao excluir categoria despesa: ${error.message}`,
                    });
                }
            }
        });
    });

    // ✅ Adicione isso dentro da função renderExpenses
    document.querySelectorAll('.btn-expense-category-edit').forEach(button => {
        button.addEventListener('click', function () {
            const expenseId = this.getAttribute('data-id');
            console.log(`Editando categoria de despesa ID: ${expenseId}`);
            localStorage.setItem('editingExpenseCategoryId', expenseId);
            loadContent('expense-category', 'expense-category-update');
        });
    });

    document.getElementById('expense-category-table-body').classList.add('loaded');
}

// 🔍 Filtro de categoria da despesas por texto
async function filterExpensesCategoriesByText() {
  const input = document.getElementById("filterText").value.trim().toLowerCase();
  const filterBy = document.querySelector('input[name="filterType"]:checked').value;

  if (input === "") {
    await loadExpensesCategories(); // carrega tudo
    return;
  }

  try {
    const response = await fetch(API_ROUTES.EXPENSES_CATEGORIES_ASYNC);
    const data = await response.json();

    const filtered = data.filter(expense => {
      const valueToCheck = (filterBy === "name" ? expense.name : expense.name) || "";
      return valueToCheck.toLowerCase().includes(input);
    });

    renderAllExpenseCategoryViews(filtered, API_ROUTES.EXPENSES_CATEGORIES_ASYNC);
  } catch (error) {
    console.error("Erro ao filtrar categoria despesas:", error);
  }
}

// 🔁 Aplica debounce ao filtro de texto
if (typeof window.debounceTimeout === "undefined") {
    window.debounceTimeout = null;
}

function debounceFilterExpensesCategories(delay = 300) {
  const tbody = document.getElementById("expense-category-table-body");
  if (tbody) {
    tbody.innerHTML = `<tr><td colspan="7" class="text-center text-muted">Filtrando...</td></tr>`;
  }

  clearTimeout(debounceTimeout);
  window.debounceTimeout = setTimeout(() => {
    filterExpensesCategoriesByText();
    }, delay);
}

function renderAllExpenseCategoryViews(expensescategories, reloadUrl) {
 
    // ✅ Chama a função para renderizar as despesas ← agora sim, com as cores certas
    renderExpensesCategories(expensescategories, reloadUrl);
}
