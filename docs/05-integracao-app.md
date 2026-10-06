# Integracao no Aplicativo

## Passo 1: criar identidade cloud local

No banco/config local do app, salve:

- `cloud_codigo`
- `cloud_token`
- `cloud_pedido_token`
- `cloud_garcom_token`, se houver garcom

Gere apenas uma vez e preserve entre atualizacoes.

## Passo 2: criar cliente cloud

Use `templates/client/menu-cloud-client.js` como base.

Funcoes minimas:

- `ensureCloudIdentity()`
- `getPublicMenuUrl()`
- `getPublicWaiterUrl()`
- `publishMenu()`
- `publishWaiter()`
- `listOnlineOrders()`
- `markOrderImported()`
- `rejectOrder()`

## Passo 3: gerar HTML publico

O app deve gerar um HTML standalone, com CSS e JS embutidos ou arquivos estaticos confiaveis.

O HTML precisa conter:

- dados do estabelecimento;
- produtos agrupados por categoria;
- fotos usando caminho publico;
- carrinho;
- finalizacao de pedido;
- chamada para API;
- mensagem para WhatsApp, se existir.

## Passo 4: auto-publicacao

Chame publicacao automatica depois de salvar:

- produto;
- categoria;
- foto;
- adicional/escolha;
- horario;
- WhatsApp;
- endereco;
- configuracao de delivery/retirada;
- garcom/PIN/mesa, para tela de garcom.

Use debounce de 2 a 5 segundos para nao publicar varias vezes se o usuario salvar muito rapido.

## Passo 5: primeira abertura

Ao abrir a tela de Cardapio Online:

1. confira se existe `cloud_codigo`;
2. gere identidade se nao existir;
3. se o link publico ainda nao foi publicado, publique silenciosamente;
4. mostre link/QR.

## Passo 6: pedidos

O app deve buscar pedidos:

- ao iniciar;
- ao abrir dashboard, se houver badges;
- ao abrir tela Pedidos Delivery/Pedidos Mesa;
- a cada 30 segundos enquanto app estiver aberto;
- ao clicar `Atualizar agora`.

Depois de importar:

- criar venda/comanda local;
- imprimir se configurado;
- marcar como importado no servidor.

Se recusar:

- marcar como cancelado no servidor;
- preservar historico local, se o app tiver area de recusados/cancelados.

## Passo 7: testes obrigatorios

- Primeiro uso sem publicar manualmente deve abrir o link sem 404.
- Produto novo aparece no link apos salvar.
- Produto excluido some no link apos salvar.
- Pedido delivery chega no app em ate 30 segundos.
- Botao Atualizar agora busca pedido imediatamente.
- Pedido mesa valida PIN do garcom.
- Pedido importado nao aparece de novo.
- Pedido recusado fica registrado.
