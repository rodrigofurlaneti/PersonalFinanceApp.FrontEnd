function loadContent(page) {
    const content = document.getElementById('main-content');

    if (page === 'despesa') {
        fetch(`pages/${page}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Página não encontrada');
                }
                return response.text();
            })
            .then(html => {
                content.innerHTML = html;
                loadExpenses(); // 🔥 Chama a função que busca dados da API
                window.location.hash = page;
            })
            .catch(error => {
                content.innerHTML = `<h2>Erro</h2><p>${error.message}</p>`;
            });

        return;
    }

    fetch(`pages/${page}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Página não encontrada');
            }
            return response.text();
        })
        .then(data => {
            content.innerHTML = data;
            window.location.hash = page;
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
        const response = await fetch('https://localhost:7124/api/expenses/async');
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

        // 🔥 Linha do total no final da tabela
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
