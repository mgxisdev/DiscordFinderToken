(function() {
    'use strict';

    // Configurações visuais para os logs
    const styles = {
        title: 'color: #5865F2; font-size: 18px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);',
        success: 'color: #57F287; font-size: 14px; font-weight: bold;',
        error: 'color: #ED4245; font-size: 14px; font-weight: bold;',
        info: 'color: #FEE75C; font-size: 12px;',
        warning: 'color: #FEE75C; font-size: 13px; font-weight: bold;'
    };

    console.clear();
    console.log('%c Discord Token Finder v2.0', styles.title);
    console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #5865F2;');

    function findTokenViaWebpack() {
        console.log('%c Método 1: Procurando via Webpack...', styles.info);
        
        try {
            const req = webpackChunkdiscord_app.push([[Math.random()], {}, (req) => req]);
            
            for (const module in req.c) {
                if (req.c.hasOwnProperty(module)) {
                    let m = req.c[module].exports;
                    
                    if (m && m.default) {
                        // Procura por funções relacionadas ao token
                        for (let prop in m.default) {
                            if (prop === 'getToken' || prop === 'token') {
                                const token = m.default[prop];
                                if (typeof token === 'function') {
                                    return token();
                                }
                                if (typeof token === 'string' && token.length > 50) {
                                    return token;
                                }
                            }
                        }
                    }
                }
            }
        } catch (error) {
            console.log('%c Webpack: Método falhou', styles.error);
        }
        
        return null;
    }

    function findTokenViaStorage() {
        console.log('%c Método 2: Procurando no Storage...', styles.info);
        
        try {
            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            
            const storage = iframe.contentWindow.localStorage;
            
            for (let i = 0; i < storage.length; i++) {
                const key = storage.key(i);
                if (key && key.includes('token')) {
                    const value = storage.getItem(key);
                    
                    try {
                        const parsed = JSON.parse(value);
                        if (typeof parsed === 'string' && /[\w-]{24}\.[\w-]{6}\.[\w-]{27,}/.test(parsed)) {
                            document.body.removeChild(iframe);
                            return parsed;
                        }
                    } catch (e) {
                        if (typeof value === 'string' && /[\w-]{24}\.[\w-]{6}\.[\w-]{27,}/.test(value)) {
                            document.body.removeChild(iframe);
                            return value;
                        }
                    }
                }
            }
            
            document.body.removeChild(iframe);
        } catch (error) {
            console.log('%c Storage: Método falhou', styles.error);
        }
        
        return null;
    }

    function findTokenViaNetwork() {
        console.log('%c Método 3: Monitorando requisições...', styles.info);
        
        return new Promise((resolve) => {
            const originalFetch = window.fetch;
            let found = false;
            
            window.fetch = async function(...args) {
                const response = await originalFetch.apply(this, args);
                
                if (!found && args[0].includes('discord.com/api')) {
                    const headers = args[1]?.headers || {};
                    const authHeader = headers.authorization || headers.Authorization;
                    
                    if (authHeader && /[\w-]{24}\.[\w-]{6}\.[\w-]{27,}/.test(authHeader)) {
                        found = true;
                        window.fetch = originalFetch;
                        resolve(authHeader);
                    }
                }
                
                return response;
            };
            
            setTimeout(() => {
                if (!found) {
                    window.fetch = originalFetch;
                    resolve(null);
                }
            }, 3000);
        });
    }
    async function validateToken(token) {
        console.log('%c🔐 Validando token...', styles.info);
        
        try {
            const response = await fetch('https://discord.com/api/v10/users/@me', {
                headers: { 'Authorization': token }
            });
            
            if (response.ok) {
                const user = await response.json();
                console.log('%c Token válido!', styles.success);
                console.log('%c Conta:', styles.info, `${user.username}#${user.discriminator}`);
                console.log('%c Email:', styles.info, user.email || 'Não disponível');
                return true;
            }
        } catch (error) {
            console.log('%c Não foi possível validar o token', styles.warning);
        }
        
        return false;
    }

    async function main() {
        let token = null;
        
        // Tenta método 1
        token = findTokenViaWebpack();
        
        // Se falhar, tenta método 2
        if (!token) {
            token = findTokenViaStorage();
        }
        
        // Se ainda não encontrou, tenta método 3
        if (!token) {
            console.log('%c Aguardando atividade de rede...', styles.info);
            token = await findTokenViaNetwork();
        }
        
        console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #5865F2;');
        
        if (token) {
            console.log('% TOKEN ENCONTRADO!', styles.success);
            console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #57F287;');
            console.log('%c Seu token:', styles.info, token);
            console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #57F287;');
            
            // Valida o token
            await validateToken(token);
            
            // Copia para área de transferência
            try {
                await navigator.clipboard.writeText(token);
                console.log('%c Token copiado para a área de transferência!', styles.success);
                
                alert(` Token encontrado e copiado!`);
            } catch (err) {
                console.log('% Não foi possível copiar automaticamente', styles.warning);
                prompt('Copie seu token manualmente:', token);
            }
        } else {
            console.log('%c Token não encontrado', styles.error);
            console.log('%cTente:', styles.info);
            console.log('  1. Recarregar a página e executar o script novamente');
            console.log('  2. Fazer logout e login novamente');
            console.log('  3. Limpar o cache do navegador');
            
            alert(`Token não encontrado`);
        }
    }

    // Executa o script
    main();

})();
