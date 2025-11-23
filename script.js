/**
 * Sistema Web de Cadastro de Currículos para Vagas
 * Script de Validação e Lógica do Formulário
 * 
 * Este script implementa:
 * - Validação de campos obrigatórios
 * - Validação de formato de e-mail
 * - Verificação de consentimento
 * - Mensagens de erro e sucesso
 * - Armazenamento local de dados (localStorage)
 */

// ============================================
// ELEMENTOS DO DOM
// ============================================

const form = document.getElementById('cadastro-form');
const successMessage = document.getElementById('success-message');
const consentimentoCheckbox = document.getElementById('consentimento');

// Campos do formulário
const campos = {
    nome: document.getElementById('nome'),
    email: document.getElementById('email'),
    telefone: document.getElementById('telefone'),
    experiencia: document.getElementById('experiencia'),
    formacao: document.getElementById('formacao'),
};

// Elementos de erro
const erros = {
    nome: document.getElementById('error-nome'),
    email: document.getElementById('error-email'),
    telefone: document.getElementById('error-telefone'),
    experiencia: document.getElementById('error-experiencia'),
    formacao: document.getElementById('error-formacao'),
    consentimento: document.getElementById('error-consentimento'),
};

// ============================================
// FUNÇÕES DE VALIDAÇÃO
// ============================================

/**
 * Valida se um campo de texto não está vazio
 * @param {string} valor - Valor do campo
 * @returns {boolean} - True se válido
 */
function validarCampoObrigatorio(valor) {
    return valor.trim().length > 0;
}

/**
 * Valida formato de e-mail
 * @param {string} email - E-mail a validar
 * @returns {boolean} - True se e-mail válido
 */
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Valida formato de telefone (básico)
 * @param {string} telefone - Telefone a validar
 * @returns {boolean} - True se telefone válido
 */
function validarTelefone(telefone) {
    // Aceita telefone com números, parênteses, hífens e espaços
    const regex = /^[\d\s\-()]+$/;
    return regex.test(telefone) && telefone.replace(/\D/g, '').length >= 10;
}

/**
 * Limpa mensagens de erro de um campo
 * @param {string} nomeCampo - Nome do campo
 */
function limparErro(nomeCampo) {
    if (erros[nomeCampo]) {
        erros[nomeCampo].textContent = '';
        erros[nomeCampo].classList.remove('show');
        campos[nomeCampo].classList.remove('error');
    }
}

/**
 * Exibe mensagem de erro para um campo
 * @param {string} nomeCampo - Nome do campo
 * @param {string} mensagem - Mensagem de erro
 */
function exibirErro(nomeCampo, mensagem) {
    if (erros[nomeCampo]) {
        erros[nomeCampo].textContent = mensagem;
        erros[nomeCampo].classList.add('show');
        campos[nomeCampo].classList.add('error');
    }
}

/**
 * Valida todo o formulário
 * @returns {boolean} - True se formulário válido
 */
function validarFormulario() {
    let isValido = true;

    // Limpar todos os erros
    Object.keys(erros).forEach(campo => {
        if (campo !== 'consentimento') {
            limparErro(campo);
        }
    });

    // Validar Nome
    if (!validarCampoObrigatorio(campos.nome.value)) {
        exibirErro('nome', 'Nome é obrigatório');
        isValido = false;
    }

    // Validar E-mail
    if (!validarCampoObrigatorio(campos.email.value)) {
        exibirErro('email', 'E-mail é obrigatório');
        isValido = false;
    } else if (!validarEmail(campos.email.value)) {
        exibirErro('email', 'E-mail inválido');
        isValido = false;
    }

    // Validar Telefone
    if (!validarCampoObrigatorio(campos.telefone.value)) {
        exibirErro('telefone', 'Telefone é obrigatório');
        isValido = false;
    } else if (!validarTelefone(campos.telefone.value)) {
        exibirErro('telefone', 'Telefone inválido (mínimo 10 dígitos)');
        isValido = false;
    }

    // Validar Experiência
    if (!validarCampoObrigatorio(campos.experiencia.value)) {
        exibirErro('experiencia', 'Experiência profissional é obrigatória');
        isValido = false;
    }

    // Validar Formação
    if (!validarCampoObrigatorio(campos.formacao.value)) {
        exibirErro('formacao', 'Formação acadêmica é obrigatória');
        isValido = false;
    }

    // Validar Consentimento
    if (!consentimentoCheckbox.checked) {
        erros.consentimento.textContent = 'Você deve aceitar a política de privacidade';
        erros.consentimento.classList.add('show');
        isValido = false;
    } else {
        erros.consentimento.textContent = '';
        erros.consentimento.classList.remove('show');
    }

    return isValido;
}

// ============================================
// FUNÇÕES DE ARMAZENAMENTO
// ============================================

/**
 * Salva dados do formulário no localStorage
 */
function salvarDadosLocalmente() {
    const dados = {
        nome: campos.nome.value,
        email: campos.email.value,
        telefone: campos.telefone.value,
        experiencia: campos.experiencia.value,
        formacao: campos.formacao.value,
        consentimento: consentimentoCheckbox.checked,
        dataCadastro: new Date().toISOString(),
    };

    // Recuperar cadastros anteriores
    let cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
    cadastros.push(dados);

    // Salvar no localStorage
    localStorage.setItem('cadastros', JSON.stringify(cadastros));

    console.log('Cadastro salvo com sucesso!', dados);
    console.log('Total de cadastros:', cadastros.length);
}

/**
 * Recupera dados salvos do localStorage
 * @returns {Array} - Array de cadastros
 */
function recuperarDadosSalvos() {
    return JSON.parse(localStorage.getItem('cadastros')) || [];
}

/**
 * Limpa todos os dados do localStorage
 */
function limparDadosSalvos() {
    localStorage.removeItem('cadastros');
    console.log('Dados do localStorage foram limpos');
}

// ============================================
// FUNÇÕES DE MANIPULAÇÃO DO FORMULÁRIO
// ============================================

/**
 * Reseta o formulário
 */
function resetarFormulario() {
    form.reset();
    successMessage.style.display = 'none';
    Object.keys(campos).forEach(campo => {
        limparErro(campo);
    });
    limparErro('consentimento');
}

/**
 * Exibe mensagem de sucesso
 */
function exibirMensagemSucesso() {
    form.style.display = 'none';
    successMessage.style.display = 'block';

    // Scroll para a mensagem de sucesso
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Resetar após 3 segundos
    setTimeout(() => {
        resetarFormulario();
        form.style.display = 'block';
    }, 3000);
}

// ============================================
// EVENT LISTENERS
// ============================================

/**
 * Submissão do formulário
 */
form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validarFormulario()) {
        // Salvar dados localmente
        salvarDadosLocalmente();

        // Exibir mensagem de sucesso
        exibirMensagemSucesso();
    } else {
        // Scroll para o primeiro erro
        const primeiroErro = Object.values(erros).find(erro => erro.classList.contains('show'));
        if (primeiroErro) {
            primeiroErro.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

/**
 * Limpar erro ao digitar em um campo
 */
Object.keys(campos).forEach(nomeCampo => {
    campos[nomeCampo].addEventListener('input', () => {
        limparErro(nomeCampo);
    });
});

/**
 * Limpar erro ao marcar/desmarcar consentimento
 */
consentimentoCheckbox.addEventListener('change', () => {
    if (consentimentoCheckbox.checked) {
        erros.consentimento.textContent = '';
        erros.consentimento.classList.remove('show');
    }
});

/**
 * Link para política de privacidade (scroll suave)
 */
document.querySelectorAll('a[href="#privacidade"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const privacidade = document.getElementById('privacidade');
        if (privacidade) {
            privacidade.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// INICIALIZAÇÃO
// ============================================

/**
 * Inicializa o script
 */
function inicializar() {
    console.log('Sistema de Cadastro de Currículos inicializado');

    // Verificar se há dados salvos
    const cadastrosSalvos = recuperarDadosSalvos();
    if (cadastrosSalvos.length > 0) {
        console.log('Cadastros anteriores encontrados:', cadastrosSalvos);
    }

    // Adicionar atributo autocomplete aos campos
    campos.nome.setAttribute('autocomplete', 'name');
    campos.email.setAttribute('autocomplete', 'email');
    campos.telefone.setAttribute('autocomplete', 'tel');

    // Focar no primeiro campo
    campos.nome.focus();
}

// Executar inicialização quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializar);
} else {
    inicializar();
}

// ============================================
// FUNÇÕES AUXILIARES PARA DEBUGGING
// ============================================

/**
 * Exibe informações de debug no console
 */
function debug() {
    console.group('Debug - Sistema de Cadastro');
    console.log('Dados do Formulário:', {
        nome: campos.nome.value,
        email: campos.email.value,
        telefone: campos.telefone.value,
        experiencia: campos.experiencia.value,
        formacao: campos.formacao.value,
        consentimento: consentimentoCheckbox.checked,
    });
    console.log('Cadastros Salvos:', recuperarDadosSalvos());
    console.groupEnd();
}

// Disponibilizar função de debug globalmente
window.debug = debug;
window.limparDadosSalvos = limparDadosSalvos;
window.recuperarDadosSalvos = recuperarDadosSalvos;
