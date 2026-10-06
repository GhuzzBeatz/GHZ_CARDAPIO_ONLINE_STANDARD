# Fluxos

## 1. Primeira publicacao

1. App gera `codigo`, `token`, `pedido_token` e opcionalmente `garcom_token`.
2. App salva esses valores localmente.
3. App gera HTML publico.
4. App chama `action=publicar_cardapio`.
5. API cria tabelas, cria estabelecimento e salva `index.html`.
6. App mostra link e QR Code.

## 2. Atualizacao automatica

Deve acontecer quando mudar algo que afeta o cardapio:

- produto criado/editado/excluido;
- preco;
- categoria;
- disponibilidade;
- foto;
- adicionais/sabores/escolhas;
- horarios;
- WhatsApp;
- endereco;
- formas de pagamento;
- configuracoes de retirada/delivery.

Regra: nao publicar em loop. Publique depois de salvar, com debounce se varias alteracoes forem feitas em sequencia.

## 3. Pedido delivery/retirada

1. Cliente abre `index.html`.
2. Cliente escolhe itens.
3. Cliente informa nome, telefone, entrega/retirada, forma de pagamento e observacao.
4. Pagina chama `action=pedidos` com `action` interna `criar_cardapio`.
5. API valida `pedido_token`.
6. API grava pedido como `pendente`.
7. Opcional: pagina abre WhatsApp com mensagem pronta.
8. App consulta pedidos pendentes e importa.

## 4. Pedido mesa/garcom

1. App publica `garcom.html` com mesas/produtos e lista de garcons.
2. Garcom abre link.
3. Garcom escolhe nome e digita PIN.
4. Garcom escolhe mesa e itens.
5. Pagina chama `action=pedidos` com `action` interna `criar`.
6. API valida `garcom_token` e PIN.
7. App recebe em `Pedidos Mesa`.
8. App atende automaticamente ou operador atende manualmente, conforme configuracao.

## 5. Busca de pedidos no app

Recomendado:

- buscar automaticamente a cada 30 segundos;
- buscar ao abrir tela de pedidos;
- buscar ao clicar `Atualizar agora`;
- mostrar badge/contador no menu se houver pedidos pendentes.

Nao recomendado:

- polling a cada 1 segundo;
- publicar HTML periodicamente sem mudanca;
- depender de o usuario entrar numa aba para os pedidos chegarem.

## 6. Falhas esperadas

Se o link abrir 404:

- o HTML ainda nao foi publicado;
- a pasta/codigo nao existe;
- o app nao fez primeira publicacao;
- houve erro de permissao no servidor.

Solucao padrao:

- app tenta publicar automaticamente ao abrir Cardapio Online se `index.html` ainda nao existir;
- app publica automaticamente quando salvar produto/configuracao;
- botao manual fica como reforco.
