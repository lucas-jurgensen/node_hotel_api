# API de Reservas de Hotel

A **Hotel Reservation API** é uma API RESTful que permite criar, consultar, atualizar e deletar reservas de quartos em um hotel. A API também verifica conflitos de datas ao criar ou atualizar reservas, garantindo que nenhum quarto seja reservado simultaneamente por múltiplos clientes.

---

## Features

-   **Cadastrar nova reserva**: Crie reservas fornecendo `quartoId`, datas de check-in e check-out.
-   **Consultar reservas**: Liste todas as reservas ou busque uma reserva específica por ID (GET `/reservas/`).
-   **Atualizar reservas**: Modifique informações de uma reserva existente, com validação de disponibilidade.
-   **Excluir reservas**: Remova reservas já cadastradas.
-   **Verificação automática de disponibilidade**: Evita conflitos de reservas verificando se o quarto está disponível para o período desejado.

---

## Tecnologias utilizadas

-   Node.js + Express
-   TypeScript
-   Prisma (MySQL) para persistência de dados
-   Zod para validação de dados
-   Arquitetura em camadas: Controllers → Services → Repositories

---

## Requisitos

-   Node.js v18 ou superior
-   npm
-   MySQL ou outro banco compatível com Prisma

---

## Instalação

1.  Clone o repositório:
    ```bash
    git clone https://github.com/lucas-jurgensen/node_hotel_api.git
    cd node_hotel_api
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Configure seu `.env` com a variável `DATABASE_URL` apontando para seu banco MySQL.

4.  Gere o Prisma Client:
    ```bash
    npx prisma generate
    ```
5.  Rode as migrations para criar as tabelas:
    ```bash
    npx prisma migrate dev --name init
    ```
6.  Inicie o servidor:
    ```bash
    npm run dev
    ```
    O servidor rodará na porta `3000` por padrão.

---

## Endpoints

### 1. Criar reserva

`POST /reservas/`

**Body (JSON):**

```json
{
    "quartoId": 1,
    "checkIn": "2025-09-01T14:00:00.000Z",
    "checkOut": "2025-09-05T12:00:00.000Z"
}
```

Resposta `(201 Created)`

```json
{
    "id": 1,
    "quartoId": 1,
    "checkIn": "2025-09-01T14:00:00.000Z",
    "checkOut": "2025-09-05T12:00:00.000Z"
}
```

### 2. Atualizar reserva

`PUT /reservas/:id`

**Body (JSON) parcial permitido:**

```json
{
    "checkOut": "2025-09-07T12:00:00.000Z"
}
```

Resposta `(200 OK)`

```json
{
    "message": "Reserva atualizada com sucesso",
    "updatedReservation": {
        "id": 1,
        "quartoId": 1,
        "checkIn": "2025-09-01T14:00:00.000Z",
        "checkOut": "2025-09-07T12:00:00.000Z"
    }
}
```

### 3. Deletar reserva

`DELETE /reservas/:id`

Resposta `(204 No Content)`

```json
{
    "message": "Reserva deletada com sucesso"
}
```

### 4. Listar reserva

`GET /reservas/`

Resposta `(200 OK)`

```json
{
    "reservations": [
        {
            "id": 1,
            "quartoId": 101,
            "checkIn": "2025-09-01T14:00:00.000Z",
            "checkOut": "2025-09-05T12:00:00.000Z"
        }
    ]
}
```

## Estrutura do projeto

```Plaintext
src/
 ├─ controllers/      # Controllers da API
 ├─ services/         # Regras de negócio
 ├─ repository/       # Acesso ao banco (Prisma)
 ├─ schema/           # Schemas Zod para validação
 ├─ utils/            # Prisma Client e DTOs
 └─ server.ts         # Inicialização do servidor
```
