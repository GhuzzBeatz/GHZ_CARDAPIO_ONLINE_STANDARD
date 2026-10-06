const crypto = require('crypto')

// Adapter esperado pelo app:
// getConfig(key), setConfig(key,value), getAppVersion?()
function createMenuCloudClient(adapter, options = {}) {
  const appId = options.appId || 'app'
  const appName = options.appName || 'Aplicativo'
  const endpointBase = options.endpointBase || `https://ghzplugin.com.br/api/${appId}-menu-cloud.php`
  const publicBase = options.publicBase || `https://ghzplugin.com.br/${appId}/cardapios`

  function slugify(value) {
    return String(value || appId)
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 42) || appId
  }

  function randomCode(size = 5) {
    return crypto.randomBytes(size).toString('hex').toUpperCase()
  }

  function endpoint(action) {
    return `${endpointBase}?action=${encodeURIComponent(action)}`
  }

  function ensureCloudIdentity(nomeEstabelecimento = '') {
    let codigo = adapter.getConfig('cloud_codigo')
    let token = adapter.getConfig('cloud_token')
    let pedidoToken = adapter.getConfig('cloud_pedido_token')
    let garcomToken = adapter.getConfig('cloud_garcom_token')

    if (!codigo) {
      codigo = `${slugify(nomeEstabelecimento || adapter.getConfig('empresa_nome') || appName)}-${randomCode(3).toLowerCase()}`
      adapter.setConfig('cloud_codigo', codigo)
    }
    if (!token) {
      token = randomCode(24)
      adapter.setConfig('cloud_token', token)
    }
    if (!pedidoToken) {
      pedidoToken = randomCode(18)
      adapter.setConfig('cloud_pedido_token', pedidoToken)
    }
    if (!garcomToken) {
      garcomToken = randomCode(18)
      adapter.setConfig('cloud_garcom_token', garcomToken)
    }

    return { codigo, token, pedidoToken, garcomToken }
  }

  function getPublicMenuUrl(codigo = '') {
    const code = codigo || adapter.getConfig('cloud_codigo')
    return code ? `${publicBase}/${encodeURIComponent(code)}/index.html` : ''
  }

  function getPublicWaiterUrl(codigo = '') {
    const code = codigo || adapter.getConfig('cloud_codigo')
    return code ? `${publicBase}/${encodeURIComponent(code)}/garcom.html` : ''
  }

  function getProductImageUrl(codigo, produtoId, versao = 0) {
    if (!codigo || !produtoId) return ''
    const base = `${publicBase}/${encodeURIComponent(codigo)}/produtos/${encodeURIComponent(String(produtoId))}.webp`
    return versao ? `${base}?v=${encodeURIComponent(String(versao))}` : base
  }

  async function postJson(action, payload) {
    const response = await fetch(endpoint(action), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    const data = await response.json().catch(() => ({}))
    if (!response.ok || !data.ok) {
      return { sucesso: false, motivo: data.error || 'erro_api', mensagem: data.message || `Erro HTTP ${response.status}`, status: response.status }
    }
    return { sucesso: true, data }
  }

  async function publishMenu({ htmlContent, estabelecimento = {}, imagens = [] }) {
    const identidade = ensureCloudIdentity(estabelecimento.nome)
    const result = await postJson('publicar_cardapio', {
      codigo: identidade.codigo,
      token: identidade.token,
      pedido_token: identidade.pedidoToken,
      estabelecimento,
      imagens,
      html: htmlContent
    })
    if (!result.sucesso) return result
    return { sucesso: true, codigo: identidade.codigo, publicUrl: result.data.publicUrl || getPublicMenuUrl(identidade.codigo), storageUrl: result.data.storageUrl || '' }
  }

  async function publishWaiter({ htmlContent, estabelecimento = {}, garcons = [] }) {
    const identidade = ensureCloudIdentity(estabelecimento.nome)
    const result = await postJson('publicar_garcom', {
      codigo: identidade.codigo,
      token: identidade.token,
      garcom_token: identidade.garcomToken,
      estabelecimento,
      garcons,
      html: htmlContent
    })
    if (!result.sucesso) return result
    return { sucesso: true, codigo: identidade.codigo, publicUrl: result.data.publicUrl || getPublicWaiterUrl(identidade.codigo), storageUrl: result.data.storageUrl || '' }
  }

  async function listOnlineOrders(origens = []) {
    const identidade = ensureCloudIdentity()
    const result = await postJson('pedidos', { action: 'listar', codigo: identidade.codigo, token: identidade.token, origens })
    if (!result.sucesso) return result
    return { sucesso: true, pedidos: Array.isArray(result.data.pedidos) ? result.data.pedidos : [] }
  }

  async function markOrderImported(id, atendimentoId = '') {
    const identidade = ensureCloudIdentity()
    return postJson('pedidos', { action: 'atender', codigo: identidade.codigo, token: identidade.token, pedido_id: id, atendimento_id: atendimentoId })
  }

  async function rejectOrder(id, motivo = '') {
    const identidade = ensureCloudIdentity()
    return postJson('pedidos', { action: 'recusar', codigo: identidade.codigo, token: identidade.token, pedido_id: id, motivo })
  }

  function createAutoPublisher(publishFn, delayMs = 3000) {
    let timer = null
    return function scheduleAutoPublish(reason = '') {
      if (timer) clearTimeout(timer)
      timer = setTimeout(async () => {
        timer = null
        try { await publishFn({ reason, silent: true }) } catch (error) {}
      }, delayMs)
    }
  }

  return {
    ensureCloudIdentity,
    getPublicMenuUrl,
    getPublicWaiterUrl,
    getProductImageUrl,
    publishMenu,
    publishWaiter,
    listOnlineOrders,
    markOrderImported,
    rejectOrder,
    createAutoPublisher
  }
}

module.exports = { createMenuCloudClient }
