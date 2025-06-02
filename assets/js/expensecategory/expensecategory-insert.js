// 🔥 Função que configura o formulário de cadastro
function setupExpenseCategoryForm() {
    const form = document.getElementById('expenseCategoryForm');
    if (!form) {
        console.error('Formulário não encontrado');
        return;
    }

    // 🔥 Define a data de hoje nos campos de data
    setTodayDate();

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const data = {
            id: 0,
            name: document.getElementById('name').value,
            isActive: document.getElementById('isActive').checked,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        console.log('Enviando dados para API:', data);

        try {
            const response = await fetch(API_ROUTES.EXPENSES_CATEGORY_SYNC, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorDetail = await response.text();
                throw new Error(`Erro ao salvar despesa. Detalhe: ${errorDetail}`);
            }

            alert('Categoria de Despesa cadastrada com sucesso!');
            loadContent('despesa'); // Volta para a lista de despesas
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao cadastrar a categoria da despesa: ' + error.message);
        }
    });
}