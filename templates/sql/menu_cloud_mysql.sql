create table if not exists app_estabelecimentos (
  id bigint unsigned not null auto_increment,
  codigo varchar(64) not null,
  token_hash char(64) not null,
  pedido_token_hash char(64) null,
  garcom_token_hash char(64) null,
  nome varchar(120) not null default 'Aplicativo',
  telefone varchar(40) null,
  endereco varchar(240) null,
  documento varchar(40) null,
  responsavel varchar(120) null,
  ativo tinyint(1) not null default 1,
  next_order_number int unsigned not null default 1,
  ultimo_publish_em datetime null,
  criado_em timestamp not null default current_timestamp,
  atualizado_em timestamp not null default current_timestamp on update current_timestamp,
  primary key (id),
  unique key app_estabelecimentos_codigo_unique (codigo),
  key app_estabelecimentos_ativo_idx (ativo)
) engine=InnoDB default charset=utf8mb4 collate=utf8mb4_unicode_ci;

create table if not exists app_publicacoes_cardapio (
  id bigint unsigned not null auto_increment,
  estabelecimento_id bigint unsigned not null,
  codigo varchar(64) not null,
  tipo varchar(20) not null default 'cardapio',
  storage_path varchar(255) not null,
  html_bytes int unsigned not null default 0,
  criado_em timestamp not null default current_timestamp,
  primary key (id),
  key app_publicacoes_codigo_idx (codigo, criado_em),
  constraint app_publicacoes_est_fk foreign key (estabelecimento_id) references app_estabelecimentos(id) on delete cascade
) engine=InnoDB default charset=utf8mb4 collate=utf8mb4_unicode_ci;

create table if not exists app_garcons_online (
  id bigint unsigned not null auto_increment,
  estabelecimento_id bigint unsigned not null,
  garcom_id varchar(64) not null,
  codigo varchar(20) null,
  nome varchar(120) not null,
  pin_hash char(64) not null,
  ativo tinyint(1) not null default 1,
  criado_em timestamp not null default current_timestamp,
  atualizado_em timestamp not null default current_timestamp on update current_timestamp,
  primary key (id),
  unique key app_garcons_online_unique (estabelecimento_id, garcom_id),
  key app_garcons_online_ativo_idx (estabelecimento_id, ativo),
  constraint app_garcons_est_fk foreign key (estabelecimento_id) references app_estabelecimentos(id) on delete cascade
) engine=InnoDB default charset=utf8mb4 collate=utf8mb4_unicode_ci;

create table if not exists app_pedidos_online (
  id char(32) not null,
  estabelecimento_id bigint unsigned not null,
  codigo varchar(64) not null,
  numero int unsigned not null,
  origem enum('mesa','delivery','retirada','cardapio') not null default 'mesa',
  mesa_id varchar(64) null,
  mesa_num varchar(40) null,
  garcom_id varchar(64) null,
  garcom_codigo varchar(20) null,
  garcom_nome varchar(120) null,
  cliente_nome varchar(120) null,
  telefone varchar(40) null,
  endereco varchar(240) null,
  forma_pagamento varchar(60) null,
  tipo_entrega varchar(80) null,
  observacao varchar(300) null,
  status enum('pendente','importado','cancelado') not null default 'pendente',
  payload longtext not null,
  atendimento_local_id varchar(80) null,
  criado_em timestamp not null default current_timestamp,
  importado_em datetime null,
  atualizado_em timestamp not null default current_timestamp on update current_timestamp,
  primary key (id),
  key app_pedidos_codigo_status_idx (codigo, status, criado_em),
  key app_pedidos_est_status_idx (estabelecimento_id, status, criado_em),
  key app_pedidos_origem_status_idx (estabelecimento_id, origem, status, criado_em),
  constraint app_pedidos_est_fk foreign key (estabelecimento_id) references app_estabelecimentos(id) on delete cascade
) engine=InnoDB default charset=utf8mb4 collate=utf8mb4_unicode_ci;
