# Checklist de Implementacao

## Antes de codar

- [ ] Definir `APP_ID`.
- [ ] Definir URL publica: `https://ghzplugin.com.br/{app}/cardapios/{codigo}/index.html`.
- [ ] Definir endpoint: `https://ghzplugin.com.br/api/{app}-menu-cloud.php`.
- [ ] Definir prefixo de tabelas MySQL.
- [ ] Confirmar se tera pedido mesa/garcom ou apenas delivery.

## Backend

- [ ] Criar API PHP baseada no template.
- [ ] Criar SQL baseado no template.
- [ ] Configurar credenciais via arquivo config do site, nunca no app.
- [ ] Testar `health`.
- [ ] Testar `publicar_cardapio`.
- [ ] Testar `pedidos/criar_cardapio`.
- [ ] Testar `pedidos/listar`.
- [ ] Testar `pedidos/atender`.

## App

- [ ] Criar identidade local fixa.
- [ ] Criar cliente cloud.
- [ ] Gerar HTML publico.
- [ ] Publicar automaticamente ao salvar produto/configuracao.
- [ ] Publicar automaticamente na primeira abertura se faltar HTML.
- [ ] Manter botao manual publicar.
- [ ] Buscar pedidos em polling de 30 segundos.
- [ ] Criar botao Atualizar agora.
- [ ] Marcar pedido importado/recusado.

## Produto/cardapio

- [ ] Categoria obrigatoria.
- [ ] Preco obrigatorio para produto do cardapio.
- [ ] Disponibilidade para QR Code.
- [ ] Foto otimizada.
- [ ] Adicionais/sabores/escolhas preservados.
- [ ] Horario de funcionamento validado.
- [ ] Horario delivery validado.

## Release

- [ ] Testar link publico em navegador anonimo.
- [ ] Testar 404 antes e depois da publicacao.
- [ ] Testar pedido real.
- [ ] Testar app fechado/aberto.
- [ ] Testar internet lenta.
- [ ] Garantir que nao ha segredo no HTML.
- [ ] Garantir que polling nao esta agressivo.
