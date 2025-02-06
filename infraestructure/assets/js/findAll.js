// Função assíncrona para buscar os dados dos usuários
async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:8080/users/findall');
        
        // Verifica se a resposta é ok
        if (!response.ok) {
            throw new Error(`Erro ao buscar usuários: ${response.statusText}`);
        }

        const data = await response.json();
        const users = data.content; // Acessa a chave "content" que contém os usuários

        // Verifica se a resposta contém dados
        if (users.length === 0) {
            alert("Nenhum usuário encontrado.");
        }

        // Referência para o corpo da tabela
        const tableBody = document.querySelector('table tbody');
        tableBody.innerHTML = ''; // Limpa a tabela antes de adicionar os dados

        // Loop para adicionar cada usuário na tabela
        users.forEach(user => {
            const row = document.createElement('tr');
            
            // Criando células com os dados do usuário
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editUser(${user.id})">
                        <img src="../../assets/images/editar-texto.png" alt="Editar" class="img-fluid" style="width: 20px;">
                    </button>
                </td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">
                        <img src="../../assets/images/excluir.png" alt="Excluir" class="img-fluid" style="width: 20px;">
                    </button>
                </td>
            `;

            // Adicionando a linha na tabela
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar os usuários:', error);
        alert('Não foi possível buscar os usuários. Verifique se o servidor está ativo.');
    }
}

// Função para editar um usuário
async function editUser(userId) {
    const name = prompt("Digite o novo nome do usuário:");
    const email = prompt("Digite o novo email do usuário:");

    if (name && email) {
        const updatedUser = {
            id: userId,
            name: name,
            email: email
        };

        try {
            const response = await fetch('http://localhost:8080/users/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            });

            // Verifica se a resposta é ok
            if (!response.ok) {
                throw new Error(`Erro ao editar usuário: ${response.statusText}`);
            }

            alert('Usuário editado com sucesso!');
            fetchUsers(); // Atualiza a tabela após a edição
        } catch (error) {
            console.error('Erro ao editar o usuário:', error);
            alert('Erro ao editar o usuário.');
        }
    } else {
        alert('Nome ou e-mail não informados!');
    }
}

// Função para excluir um usuário
async function deleteUser(userId) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        try {
            const response = await fetch(`http://localhost:8080/users/delete/${userId}`, {
                method: 'DELETE',
            });

            // Verifica se a resposta é ok
            if (!response.ok) {
                throw new Error(`Erro ao excluir usuário: ${response.statusText}`);
            }

            alert('Usuário excluído com sucesso!');
            fetchUsers(); // Atualiza a tabela após a exclusão
        } catch (error) {
            console.error('Erro ao excluir o usuário:', error);
            alert('Erro ao excluir o usuário.');
        }
    }
}

// Chama a função para buscar os usuários quando a página carregar
window.onload = fetchUsers;
