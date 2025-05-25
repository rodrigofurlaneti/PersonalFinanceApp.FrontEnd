// 🔥 Função para aplicar máscara de valor monetário
function maskMoney(input) {
    let value = input.value.replace(/\D/g, '');
    value = (value / 100).toFixed(2) + '';
    value = value.replace('.', ',');
    value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    input.value = 'R$ ' + value;
}

// 🔥 Função que configura o formulário de cadastro
function setupExpenseForm() {
    const form = document.getElementById('expenseForm');
    if (!form) {
        console.error('Formulário não encontrado');
        return;
    }

    // 🔥 Define a data de hoje nos campos de data
    setTodayDate();

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const amountRaw = document.getElementById('amount').value || '0';
        const amountValue = amountRaw
            .replace('R$ ', '')
            .replace(/\./g, '')
            .replace(',', '.');

        const dueDateValue = document.getElementById('dueDate').value;
        const paidAtValue = document.getElementById('paidAt').value;

        const data = {
            id: 0,
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            amount: parseFloat(amountValue) || 0,
            dueDate: new Date(dueDateValue).toISOString(),
            paidAt: paidAtValue ? new Date(paidAtValue).toISOString() : null,
            expenseCategoryId: parseInt(document.getElementById('expenseCategoryId').value) || 0,
            isActive: document.getElementById('isActive').checked,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        console.log('Enviando dados para API:', data);

        try {
            const response = await fetch(API_ROUTES.EXPENSES, {
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

            alert('Despesa cadastrada com sucesso!');
            loadContent('despesa'); // Volta para a lista de despesas
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao cadastrar despesa: ' + error.message);
        }
    });
}

// 🔥 Função que define a data de hoje nos campos de data
function setTodayDate() {
    const today = new Date().toISOString().split('T')[0];

    const dueDateInput = document.getElementById('dueDate');
    const paidAtInput = document.getElementById('paidAt');

    if (dueDateInput) dueDateInput.value = today;
    if (paidAtInput) paidAtInput.value = today;
}