# GHZ Cardapio Online Standard

Base padrao da GHZ Plugin para implementar cardapio online, pedido por QR Code, pedido delivery/retirada e pedido de mesa/garcom em qualquer aplicativo desktop ou web.

Esta base nasceu do fluxo validado no MesaUp, mas esta documentada de forma generica para ser reaproveitada em outros aplicativos sem depender do nome MesaUp.

## Objetivo

Permitir que qualquer aplicativo GHZ publique um cardapio HTML no site `ghzplugin.com.br`, mantenha um link fixo por estabelecimento e receba pedidos online de forma simples, barata e estavel usando PHP + MySQL/cPanel.

## O que este padrao entrega

- Link fixo de cardapio por estabelecimento.
- Publicacao automatica do HTML quando produtos/configuracoes mudam.
- Publicacao manual como reforco.
- Pedido delivery, retirada e mesa/garcom.
- Numero sequencial de pedido por estabelecimento.
- Tokens separados para publicar, pedir pelo cardapio e pedir como garcom.
- Banco MySQL simples no cPanel/phpMyAdmin.
- API PHP sem Supabase obrigatorio.
- Sincronizacao por polling leve no aplicativo, normalmente a cada 30 segundos.
- Botao `Atualizar agora` para forcar busca de pedidos.
- Historico de publicacoes e pedidos.
- Estrutura facil de adaptar em outros produtos GHZ.

## Arquitetura recomendada

```text
Aplicativo desktop
  |- cadastro local de produtos, horarios, garcons, mesas e configuracoes
  |- gera HTML publico do cardapio
  |- publica HTML + metadados para API PHP
  |- consulta pedidos pendentes a cada 30s
  |- importa pedido para comanda/venda local

Site GHZ/cPanel
  |- /api/{app}-menu-cloud.php
  |- /{app}/cardapios/{codigo}/index.html
  |- /{app}/cardapios/{codigo}/garcom.html
  |- /{app}/cardapios/{codigo}/produtos/{produto_id}.webp
  |- MySQL: estabelecimentos, publicacoes, garcons, pedidos

Cliente final
  |- abre QR/link publico
  |- monta carrinho
  |- envia pedido para API PHP
  |- opcionalmente abre WhatsApp com texto pronto
```

## Estrutura deste repositorio

- `docs/01-arquitetura.md`: desenho tecnico e decisoes do padrao.
- `docs/02-modelo-dados.md`: tabelas e campos explicados.
- `docs/03-fluxos.md`: publicacao, pedido delivery, pedido mesa, importacao.
- `docs/04-seguranca.md`: tokens, hashes, limites e cuidados.
- `docs/05-integracao-app.md`: passo a passo para plugar em um app.
- `docs/06-checklist.md`: checklist antes de publicar uma nova versao.
- `templates/sql/menu_cloud_mysql.sql`: schema MySQL generico.
- `templates/api/app-menu-cloud.php`: API PHP generica.
- `templates/client/menu-cloud-client.js`: cliente JS/Electron generico.
- `templates/web/cardapio-publico.html`: estrutura base do HTML publico.
- `prompts/implementar-cardapio-em-app.md`: prompt pronto para usar em outro chat.

## Como usar em outro aplicativo

1. Escolha um `APP_ID` curto, por exemplo `folhapro`, `petflow`, `nexhotel`.
2. Copie o template SQL e troque o prefixo `app_` pelo prefixo do aplicativo, se quiser tabelas separadas.
3. Copie a API PHP para `SITE-GHZ/api/{app}-menu-cloud.php`.
4. Ajuste `base_url`, `public_dir`, nomes de tabela e caminho publico.
5. No aplicativo, crie um cliente equivalente a `templates/client/menu-cloud-client.js`.
6. Gere um `codigo` fixo por estabelecimento e tokens locais.
7. Ao salvar produto/configuracao relevante, chame auto-publicacao silenciosa.
8. Mantenha um botao manual `Publicar/Atualizar`.
9. Busque pedidos pendentes a cada 30 segundos e tenha botao `Atualizar agora`.
10. Teste com QR/link real antes de liberar.

## Regra principal

O cliente nunca deve precisar lembrar de publicar o QR Code para o cardapio funcionar. Se mudou produto, horario, WhatsApp, garcom, mesa ou configuracao relevante, o app deve tentar publicar automaticamente em segundo plano.

O botao manual continua existindo apenas como reforco.

## Padrao de URL

```text
https://ghzplugin.com.br/{app}/cardapios/{codigo}/index.html
https://ghzplugin.com.br/{app}/cardapios/{codigo}/garcom.html
https://ghzplugin.com.br/{app}/cardapios/{codigo}/produtos/{produto_id}.webp
```

## Padrao de polling

- Intervalo recomendado: 30 segundos.
- Nao usar loop agressivo de 5 ou 10 segundos sem necessidade.
- Nao publicar HTML a cada 30 segundos.
- Publicar somente quando houver alteracao relevante ou quando usuario clicar no botao manual.

## Status

Padrao inicial documentado com base no MesaUp e pronto para reaproveitamento em outros aplicativos.
