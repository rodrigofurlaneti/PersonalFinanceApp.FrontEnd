// ✅ Utilitários globais
function getInputValue(id) {
    const element = document.getElementById(id);
    return element ? element.value : '';
}

function getCheckboxChecked(id) {
    const element = document.getElementById(id);
    return element ? element.checked : false;
}

function nowIso() {
    return new Date().toISOString();
}

// ✅ Validação para categoria de despesa
function validateExpenseCategoryFormFields() {
    const name = getInputValue('name');

    if (!name || name.trim() === '') {
        Swal.fire({
            icon: 'warning',
            title: 'Campo obrigatório!',
            text: 'O campo "Nome" deve ser preenchido.',
        });
        return false;
    }

    return true;
}

// ✅ Função principal do formulário
function setupExpenseCategoryForm() {
    const form = document.getElementById('expenseCategoryForm');
    if (!form) {
        console.error('Formulário não encontrado');
        return;
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!validateExpenseCategoryFormFields()) return;

        const data = {
            id: 0,
            name: getInputValue('name'),
            isActive: getCheckboxChecked('isActive'),
            createdAt: nowIso(),
            updatedAt: nowIso(),
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
                throw new Error(`Erro ao salvar categoria. Detalhe: ${errorDetail}`);
            }

            Swal.fire({
                title: "Categoria cadastrada com sucesso!",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });

            loadContent('expense', 'expensecategory-list');

        } catch (error) {
            console.error('Erro:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Erro ao cadastrar a categoria!",
                footer: `<a href="#">${error.message}</a>`
            });
        }
    });
}