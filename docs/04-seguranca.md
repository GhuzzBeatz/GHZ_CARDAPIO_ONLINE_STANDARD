# Seguranca

## Tokens

Use pelo menos tres tokens locais por estabelecimento:

- `token`: administrativo. Publica HTML, lista pedidos e muda status.
- `pedido_token`: publico dentro do HTML para criar pedido de cardapio.
- `garcom_token`: publico dentro do HTML de garcom para criar pedido de mesa.

No servidor, salve apenas hash dos tokens.

## O que nao salvar no HTML publico

- token administrativo;
- credenciais do banco;
- chave de API privada;
- senha de suporte;
- segredo de OAuth;
- token de GitHub;
- token de Mercado Livre;
- chave OpenAI.

## O que pode ir no HTML publico

- `codigo` do estabelecimento;
- `pedido_token` para enviar pedido do cardapio;
- `garcom_token` para pedido de mesa, se o garcom ainda precisar de PIN;
- produtos e precos;
- horarios;
- telefone publico da loja.

## Validacao obrigatoria na API

- validar tamanho do HTML;
- limitar quantidade de itens por pedido;
- limitar tamanho de textos;
- validar origem permitida;
- validar PIN/hash do garcom;
- validar token antes de listar ou alterar pedido;
- gravar pedidos como pendentes e nunca executar SQL vindo do cliente.

## Limites recomendados

- HTML ate 1 MB.
- Imagem por produto ate 1 MB apos compressao.
- Ate 100 imagens por publicacao.
- Ate 80 itens por pedido.
- Ate 80 pedidos retornados por consulta.
- Polling padrao de 30 segundos.

## Privacidade

O pedido online pode conter nome, telefone e endereco. Use apenas para operacionalizar o pedido. Evite expor listas de pedidos em paginas publicas.
