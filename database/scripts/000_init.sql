\c db;

CREATE TABLE produto (
	id          serial      primary key,
	nome        varchar     not null    default '',
	descricao   varchar     not null    default '',
	preco       real        not null    default 0.0,
	estoque     int         not null    default 0,
	created_at  timestamp   not null    default now()
);