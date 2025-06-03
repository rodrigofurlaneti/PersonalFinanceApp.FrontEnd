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
                        <button class="btn btn-sm btn-danger btn-expense-delete" 
                                data-id="${expense.id}" 
                                data-name="${expense.description}">Excluir</button>
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

        document.querySelectorAll('.btn-expense-delete').forEach(button => {
            button.addEventListener('click', async function() {
                const expenseId = this.getAttribute('data-id');
                const expenseName = this.getAttribute('data-name');

                const result = await Swal.fire({
                    title: `Você deseja excluir a despesa "${expenseName}"?`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Sim',
                    cancelButtonText: 'Não',
                });

                if (result.isConfirmed) {
                    try {
                        const deleteResponse = await fetch(`${API_ROUTES.EXPENSES_ASYNC}/${expenseId}`, {
                            method: 'DELETE',
                        });

                        if (!deleteResponse.ok) throw new Error('Erro ao excluir despesa');

                        Swal.fire({
                            icon: 'success',
                            title: 'Excluído!',
                            text: 'Despesa excluída com sucesso.',
                            timer: 4500,
                            showConfirmButton: false,
                        });

                        loadExpenses();
                    } catch (error) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Erro',
                            text: `Falha ao excluir despesa: ${error.message}`,
                        });
                    }
                }
            });
        });
    } catch (error) {
        tbody.innerHTML = `<tr><td colspan="4">Erro ao carregar despesas: ${error.message}</td></tr>`;
        console.error('Erro ao buscar despesas:', error);
    }
}