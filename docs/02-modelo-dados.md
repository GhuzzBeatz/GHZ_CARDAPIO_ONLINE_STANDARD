# Modelo de Dados

Use este modelo como base. Troque o prefixo `app_` pelo prefixo real se desejar tabelas por aplicativo.

## `app_estabelecimentos`

Guarda o estabelecimento publicado.

Campos importantes:

- `codigo`: slug fixo usado na URL publica.
- `token_hash`: hash do token administrativo de publicacao/listagem/importacao.
- `pedido_token_hash`: hash do token usado pelo cardapio publico para criar pedidos.
- `garcom_token_hash`: hash do token usado pela tela de garcom/mesa.
- `next_order_number`: contador sequencial de pedidos.
- `ultimo_publish_em`: ultima publicacao feita pelo app.
- `ativo`: permite bloquear um estabelecimento sem apagar historico.

## `app_publicacoes_cardapio`

Historico simples de publicacoes.

Serve para auditoria e diagnostico:

- quando publicou;
- qual tipo publicou (`cardapio` ou `garcom`);
- caminho salvo;
- tamanho do HTML.

## `app_garcons_online`

Usado apenas quando o app tiver pedidos por mesa/garcom.

- PIN nunca deve ser salvo puro.
- Salvar apenas `pin_hash` com SHA-256 ou algoritmo melhor.
- Ao publicar novamente, desative garcons antigos e reative os enviados.

## `app_pedidos_online`

Fila online de pedidos.

Status recomendados:

- `pendente`: chegou no site e ainda nao foi importado pelo app.
- `importado`: app importou para comanda/venda.
- `cancelado`: operador recusou ou cancelou.

Origens recomendadas:

- `mesa`: pedido feito por garcom/mesa.
- `delivery`: pedido delivery.
- `retirada`: retirada no local.
- `cardapio`: origem generica do cardapio.

O campo `payload` guarda o JSON completo do pedido para preservar detalhes sem precisar mudar a tabela a cada nova funcao.
