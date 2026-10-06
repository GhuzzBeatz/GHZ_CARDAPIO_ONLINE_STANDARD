# Prompt para implementar cardapio online em outro aplicativo

Use este prompt em uma nova sessao do Codex/Claude quando quiser adicionar o padrao de cardapio online em outro app GHZ.

```text
Voce vai implementar o padrao GHZ de Cardapio Online neste aplicativo.

Repositorio de referencia obrigatorio:
https://github.com/GhuzzBeatz/GHZ_CARDAPIO_ONLINE_STANDARD

Objetivo:
Adicionar ao aplicativo atual um cardapio online parecido com o MesaUp, mas adaptado ao dominio do app, usando HTML publico no site GHZ e backend PHP + MySQL/cPanel/phpMyAdmin. Nao usar Supabase para o cardapio, pedidos ou publicacao.

O que deve ser implementado:
1. Criar identidade cloud local fixa por estabelecimento/cliente:
   - cloud_codigo
   - cloud_token
   - cloud_pedido_token
   - cloud_garcom_token se houver pedido por garcom/mesa
2. Criar endpoint PHP no SITE-GHZ:
   - /api/{app}-menu-cloud.php
   - baseado em templates/api/app-menu-cloud.php
3. Criar SQL MySQL no SITE-GHZ:
   - baseado em templates/sql/menu_cloud_mysql.sql
   - usar prefixo proprio do app, nao misturar com MesaUp, salvo se o app for MesaUp
4. Criar pasta publica:
   - https://ghzplugin.com.br/{app}/cardapios/{codigo}/index.html
   - se houver garcom/mesa: https://ghzplugin.com.br/{app}/cardapios/{codigo}/garcom.html
   - imagens em /{app}/cardapios/{codigo}/produtos/{produto_id}.webp
5. Criar cliente JS/Electron no app:
   - baseado em templates/client/menu-cloud-client.js
6. Gerar HTML publico standalone:
   - produtos por categoria
   - carrinho
   - finalizacao
   - chamada API para criar pedido
   - opcional WhatsApp pronto
7. Publicacao automatica:
   - ao salvar produto
   - ao alterar preco/categoria/foto/disponibilidade
   - ao alterar horario/WhatsApp/endereco/formas de pagamento
   - ao abrir Cardapio Online se ainda nao existir index.html publicado
8. Manter botao manual Publicar/Atualizar como reforco.
9. Buscar pedidos pendentes automaticamente:
   - a cada 30 segundos
   - ao abrir tela de pedidos
   - botao Atualizar agora
10. Marcar pedido como importado/atendido/recusado no servidor.
11. Preservar historico local do app quando pedido for recusado/cancelado, se o app tiver area de historico.

Regras importantes:
- O cliente nao pode depender de clicar em Publicar QR Code toda vez que altera o cardapio.
- A primeira vez que usar o app ja deve publicar automaticamente para evitar 404.
- Nao colocar segredo no HTML publico.
- Nao colocar credencial MySQL dentro do app.
- Nao usar polling agressivo. Padrao: 30 segundos.
- Nao publicar HTML em loop. Publique apenas apos mudanca relevante ou clique manual.
- Link publico deve ser fixo; atualizar conteudo nao pode trocar o QR Code.

Antes de editar:
- Leia README.md e todos os docs do repositorio GHZ_CARDAPIO_ONLINE_STANDARD.
- Analise como o aplicativo atual armazena produtos/configuracoes.
- Identifique onde encaixar auto-publicacao.
- Identifique onde criar tela Cardapio Online e Pedidos Online.

Depois de editar:
- Rode testes/lint/build existentes.
- Teste health da API.
- Teste publicacao real.
- Teste abrir o link em navegador.
- Teste pedido delivery/retirada.
- Teste busca no app em ate 30 segundos.
- Nao faca commit/release sem minha aprovacao, salvo se eu pedir explicitamente.
```
