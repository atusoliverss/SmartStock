// Função assíncrona para buscar os dados dos usuários no backend
async function fetchUsers() {
    try {
        // Faz a requisição GET para buscar todos os usuários
        const response = await fetch('http://localhost:8080/users/findall');

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error(`Erro ao buscar usuários: ${response.statusText}`);
        }

        // Converte a resposta em JSON
        const data = await response.json();
        const users = data.content; // Acessa a chave "content" que contém os usuários

        // Verifica se a resposta contém usuários
        if (users.length === 0) {
            alert("Nenhum usuário encontrado.");
        }

        // Obtém a referência do corpo da tabela no HTML
        const tableBody = document.querySelector('table tbody');
        tableBody.innerHTML = ''; // Limpa a tabela antes de adicionar novos dados

        // Loop para adicionar cada usuário na tabela
        users.forEach(user => {
            const row = document.createElement('tr');

            // Cria as células da linha da tabela com os dados do usuário
            row.innerHTML = `
                <td>${user.name}</td>
                <td>${user.login}</td>
                <td>${user.email}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editUser(decodeURIComponent('${encodeURIComponent(JSON.stringify(user))}'))">
                        <img src="../../assets/images/editar-texto.png" alt="Editar" class="img-fluid" style="width: 20px;">
                    </button>
                </td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.email}')">
                        <img src="../../assets/images/excluir.png" alt="Excluir" class="img-fluid" style="width: 20px;">
                    </button>
                </td>
            `;

            // Adiciona a linha criada ao corpo da tabela
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar os usuários:', error);
        alert('Não foi possível buscar os usuários. Verifique se o servidor está ativo.');
    }
}

// Função para excluir um usuário
async function deleteUser(userEmail) {
    // Verifica se o email do usuário foi fornecido
    if (!userEmail) {
        console.error("Erro: O email do usuário não foi fornecido.");
        alert("Erro ao excluir: Email do usuário não encontrado.");
        return;
    }

    // Exibe uma confirmação antes de excluir o usuário
    if (confirm(`Tem certeza que deseja excluir o usuário com email ${userEmail}?`)) {
        const url = `http://localhost:8080/users/delete/${encodeURIComponent(userEmail)}`;
        console.log("Tentando excluir:", url); // Debug no console

        try {
            // Faz a requisição DELETE para remover o usuário
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Verifica se a exclusão foi bem-sucedida
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

// Função para editar um usuário
async function editUser(userData) {
    const user = JSON.parse(userData); // Converte a string JSON de volta para um objeto

    // Solicita novos valores para o nome e login do usuário
    const name = prompt("Digite o novo nome do usuário:", user.name);
    const login = prompt("Digite o novo login do usuário:", user.login);

    // Verifica se os valores foram preenchidos
    if (login && name) {
        // Cria o objeto com os dados atualizados
        const updatedUser = {
            email: user.email, // Mantém o email original, pois é a chave de identificação
            login: login,
            name: name
        };

        try {
            // Faz a requisição PUT para atualizar o usuário
            const response = await fetch('http://localhost:8080/users/update', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser) // Converte o objeto para JSON
            });

            // Verifica se a edição foi bem-sucedida
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
        alert('Nome ou login não informados!');
    }
}

// Chama a função para buscar os usuários assim que a página carregar
document.addEventListener("DOMContentLoaded", fetchUsers);
