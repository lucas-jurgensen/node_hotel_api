
# API para Reservas de Hotel

A Hotel Reservation API é uma API RESTful que permite realizar, consultar, atualizar e excluir reservas de quartos em um hotel. A API oferece endpoints para interagir com as reservas, incluindo a verificação de conflitos de reserva, garantindo que os quartos não sejam reservados para o mesmo período por múltiplos clientes.

## Features

**Cadastrar uma nova reserva**: Permite que o usuário faça uma reserva fornecendo informações como nome, email, número do quarto e as datas de check-in e check-out.

**Consultar reservas**: Permite consultar todas as reservas ou uma reserva específica por ID.

**Atualizar uma reserva**: Permite atualizar as informações de uma reserva existente.

**Excluir uma reserva**: Permite deletar uma reserva já existente.

**Verificação de conflito de reserva**: A API verifica se o quarto está disponível para as datas desejadas, evitando a sobrecarga de reservas.
## Requisitos

- Node.js (versão 18 ou superior)
- npm (gerenciador de pacotes)
## Instalação

1. Clone este repositório para o seu diretório local:
```bash
git clone https://github.com/lucas-jurgensen/node_hotel_api.git
```

2. Acesse o diretório do projeto:
```bash
cd node_hotel_api
```

3. Instale as dependências necessárias:
```bash
npm install
```

4. Inicie o servidor:
```bash
npm start
```
O servidor será iniciado na porta 3000 por padrão.


## Endpoints

**GET** `/reservations`

Retorna todas as reservas registradas no sistema.

- Exemplo
```json
{
  "reservations": [
    {
      "id": 1,
      "name": "João Silva",
      "email": "joao@email.com",
      "roomNumber": 101,
      "checkIn": "2025-04-25",
      "checkOut": "2025-04-28"
    }
  ]
}
```

---

**POST** `/reservation`

Cria uma nova reserva.

- body (JSON)
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "roomNumber": 101,
  "checkIn": "2025-04-25",
  "checkOut": "2025-04-28"
}
```
- Resposta (201 Createed)
```json
{
  "message": "Reserva criada com sucesso",
  "data": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com",
    "roomNumber": 101,
    "checkIn": "2025-04-25",
    "checkOut": "2025-04-28"
  }
}
```

---

**PUT** `reservation/:id`

Atualiza os dados de uma reserva existente.

- body (JSON)
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "roomNumber": 102,
  "checkIn": "2025-04-26",
  "checkOut": "2025-04-29"
}
```

- Resposta (200 OK)
```json
{
  "message": "Reserva atualizada com sucesso",
  "updatedReservation": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com",
    "roomNumber": 102,
    "checkIn": "2025-04-26",
    "checkOut": "2025-04-29"
  }
}
```

---

**DELETE** `reservation/:id`

Exclui uma reserva existente.

- Resposta (200 Ok)
```json
{
  "message": "Reserva deletada com sucesso",
  "reservation": {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com",
    "roomNumber": 101,
    "checkIn": "2025-04-25",
    "checkOut": "2025-04-28"
  }
}
```
## Aprendizados

- Organização de projeto utilizando Node.js, Express e arquitetura em camadas
- Criação de uma API RESTful completa com rotas, controllers, services, middlewares e validação
- Validação de dados com Zod, utilizando schemas completos e parciais
- Persistência de dados com File System utilizando fs/promises
- Implementação de regras de negócio, como verificação de conflito de reservas por data
- Criação e uso de middlewares para validação e tratamento de erros
- Manipulação de JSON para simular um banco de dados
- Uso de TypeScript para garantir tipagem estática e segurança na aplicação





## Licença

Este projeto está licenciado sob a Licença [MIT](https://choosealicense.com/licenses/mit/)

