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
function validateIncomeCategoryFormFields() {
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
function setupIncomeCategoryForm() {
    const form = document.getElementById('incomeCategoryForm');
    if (!form) {
        console.error('Formulário não encontrado');
        return;
    }

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!validateIncomeCategoryFormFields()) return;

        const data = {
            id: 0,
            name: getInputValue('name'),
            isActive: getCheckboxChecked('isActive'),
            createdAt: nowIso(),
            updatedAt: nowIso(),
        };

        console.log('Enviando dados para API:', data);

        try {
            const response = await fetch(API_ROUTES.INCOME_CATEGORIES_SYNC, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const errorDetail = await response.text();
                throw new Error(`Erro ao salvar categoria de renda ${data.name}. Detalhe erro: ${errorDetail}`);
            }

            Swal.fire({
                title: `A categoria de renda ${data.name} cadastrada com sucesso!`,
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });

            loadContent('income-category', 'income-category-list');

        } catch (error) {
            console.error('Erro:', error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Erro ao cadastrar a categoria de renda ${data.name}!`,
                footer: `<a href="#">${error.message}</a>`
            });
        }
    });
}