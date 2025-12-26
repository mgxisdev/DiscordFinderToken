# DiscordFinderToken
Uma ferramenta simples e eficiente para recuperar seu token de autenticação do Discord

# PARA BOOKMARKLET
```javascript:(function()%7B(function() %7B%0A    'use strict'%3B%0A%0A    %2F%2F Configurações visuais para os logs%0A    const styles %3D %7B%0A        title%3A 'color%3A %235865F2%3B font-size%3A 18px%3B font-weight%3A bold%3B text-shadow%3A 2px 2px 4px rgba(0%2C0%2C0%2C0.3)%3B'%2C%0A        success%3A 'color%3A %2357F287%3B font-size%3A 14px%3B font-weight%3A bold%3B'%2C%0A        error%3A 'color%3A %23ED4245%3B font-size%3A 14px%3B font-weight%3A bold%3B'%2C%0A        info%3A 'color%3A %23FEE75C%3B font-size%3A 12px%3B'%2C%0A        warning%3A 'color%3A %23FEE75C%3B font-size%3A 13px%3B font-weight%3A bold%3B'%0A    %7D%3B%0A%0A    console.clear()%3B%0A    console.log('%25c Discord Token Finder v2.0'%2C styles.title)%3B%0A    console.log('%25c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'%2C 'color%3A %235865F2%3B')%3B%0A%0A    %2F**%0A     * Método 1%3A Extração via Webpack%0A     * Este é o método mais confiável para o Discord web%0A     *%2F%0A    function findTokenViaWebpack() %7B%0A        console.log('%25c Método 1%3A Procurando via Webpack...'%2C styles.info)%3B%0A        %0A        try %7B%0A            const req %3D webpackChunkdiscord_app.push(%5B%5BMath.random()%5D%2C %7B%7D%2C (req) %3D> req%5D)%3B%0A            %0A            for (const module in req.c) %7B%0A                if (req.c.hasOwnProperty(module)) %7B%0A                    let m %3D req.c%5Bmodule%5D.exports%3B%0A                    %0A                    if (m %26%26 m.default) %7B%0A                        %2F%2F Procura por funções relacionadas ao token%0A                        for (let prop in m.default) %7B%0A                            if (prop %3D%3D%3D 'getToken' %7C%7C prop %3D%3D%3D 'token') %7B%0A                                const token %3D m.default%5Bprop%5D%3B%0A                                if (typeof token %3D%3D%3D 'function') %7B%0A                                    return token()%3B%0A                                %7D%0A                                if (typeof token %3D%3D%3D 'string' %26%26 token.length > 50) %7B%0A                                    return token%3B%0A                                %7D%0A                            %7D%0A                        %7D%0A                    %7D%0A                %7D%0A            %7D%0A        %7D catch (error) %7B%0A            console.log('%25c Webpack%3A Método falhou'%2C styles.error)%3B%0A        %7D%0A        %0A        return null%3B%0A    %7D%0A%0A    %2F**%0A     * Método 2%3A Extração via LocalStorage%0A     * Backup caso o webpack falhe%0A     *%2F%0A    function findTokenViaStorage() %7B%0A        console.log('%25c Método 2%3A Procurando no Storage...'%2C styles.info)%3B%0A        %0A        try %7B%0A            const iframe %3D document.createElement('iframe')%3B%0A            iframe.style.display %3D 'none'%3B%0A            document.body.appendChild(iframe)%3B%0A            %0A            const storage %3D iframe.contentWindow.localStorage%3B%0A            %0A            for (let i %3D 0%3B i < storage.length%3B i%2B%2B) %7B%0A                const key %3D storage.key(i)%3B%0A                if (key %26%26 key.includes('token')) %7B%0A                    const value %3D storage.getItem(key)%3B%0A                    %0A                    try %7B%0A                        const parsed %3D JSON.parse(value)%3B%0A                        if (typeof parsed %3D%3D%3D 'string' %26%26 %2F%5B%5Cw-%5D%7B24%7D%5C.%5B%5Cw-%5D%7B6%7D%5C.%5B%5Cw-%5D%7B27%2C%7D%2F.test(parsed)) %7B%0A                            document.body.removeChild(iframe)%3B%0A                            return parsed%3B%0A                        %7D%0A                    %7D catch (e) %7B%0A                        if (typeof value %3D%3D%3D 'string' %26%26 %2F%5B%5Cw-%5D%7B24%7D%5C.%5B%5Cw-%5D%7B6%7D%5C.%5B%5Cw-%5D%7B27%2C%7D%2F.test(value)) %7B%0A                            document.body.removeChild(iframe)%3B%0A                            return value%3B%0A                        %7D%0A                    %7D%0A                %7D%0A            %7D%0A            %0A            document.body.removeChild(iframe)%3B%0A        %7D catch (error) %7B%0A            console.log('%25c Storage%3A Método falhou'%2C styles.error)%3B%0A        %7D%0A        %0A        return null%3B%0A    %7D%0A%0A    %2F**%0A     * Método 3%3A Extração via Network Requests%0A     * Intercepta requisições HTTP para capturar o token%0A     *%2F%0A    function findTokenViaNetwork() %7B%0A        console.log('%25c Método 3%3A Monitorando requisições...'%2C styles.info)%3B%0A        %0A        return new Promise((resolve) %3D> %7B%0A            const originalFetch %3D window.fetch%3B%0A            let found %3D false%3B%0A            %0A            window.fetch %3D async function(...args) %7B%0A                const response %3D await originalFetch.apply(this%2C args)%3B%0A                %0A                if (!found %26%26 args%5B0%5D.includes('discord.com%2Fapi')) %7B%0A                    const headers %3D args%5B1%5D%3F.headers %7C%7C %7B%7D%3B%0A                    const authHeader %3D headers.authorization %7C%7C headers.Authorization%3B%0A                    %0A                    if (authHeader %26%26 %2F%5B%5Cw-%5D%7B24%7D%5C.%5B%5Cw-%5D%7B6%7D%5C.%5B%5Cw-%5D%7B27%2C%7D%2F.test(authHeader)) %7B%0A                        found %3D true%3B%0A                        window.fetch %3D originalFetch%3B%0A                        resolve(authHeader)%3B%0A                    %7D%0A                %7D%0A                %0A                return response%3B%0A            %7D%3B%0A            %0A            setTimeout(() %3D> %7B%0A                if (!found) %7B%0A                    window.fetch %3D originalFetch%3B%0A                    resolve(null)%3B%0A                %7D%0A            %7D%2C 3000)%3B%0A        %7D)%3B%0A    %7D%0A%0A    %2F**%0A     * Valida se o token encontrado é válido%0A     *%2F%0A    async function validateToken(token) %7B%0A        console.log('%25c%F0%9F%94%90 Validando token...'%2C styles.info)%3B%0A        %0A        try %7B%0A            const response %3D await fetch('https%3A%2F%2Fdiscord.com%2Fapi%2Fv10%2Fusers%2F%40me'%2C %7B%0A                headers%3A %7B 'Authorization'%3A token %7D%0A            %7D)%3B%0A            %0A            if (response.ok) %7B%0A                const user %3D await response.json()%3B%0A                console.log('%25c Token válido!'%2C styles.success)%3B%0A                console.log('%25c Conta%3A'%2C styles.info%2C %60%24%7Buser.username%7D%23%24%7Buser.discriminator%7D%60)%3B%0A                console.log('%25c Email%3A'%2C styles.info%2C user.email %7C%7C 'Não disponível')%3B%0A                return true%3B%0A            %7D%0A        %7D catch (error) %7B%0A            console.log('%25c Não foi possível validar o token'%2C styles.warning)%3B%0A        %7D%0A        %0A        return false%3B%0A    %7D%0A%0A    %2F**%0A     * Função principal que executa todos os métodos%0A     *%2F%0A    async function main() %7B%0A        let token %3D null%3B%0A        %0A        %2F%2F Tenta método 1%0A        token %3D findTokenViaWebpack()%3B%0A        %0A        %2F%2F Se falhar%2C tenta método 2%0A        if (!token) %7B%0A            token %3D findTokenViaStorage()%3B%0A        %7D%0A        %0A        %2F%2F Se ainda não encontrou%2C tenta método 3%0A        if (!token) %7B%0A            console.log('%25c Aguardando atividade de rede...'%2C styles.info)%3B%0A            token %3D await findTokenViaNetwork()%3B%0A        %7D%0A        %0A        console.log('%25c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'%2C 'color%3A %235865F2%3B')%3B%0A        %0A        if (token) %7B%0A            console.log('%25 TOKEN ENCONTRADO!'%2C styles.success)%3B%0A            console.log('%25c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'%2C 'color%3A %2357F287%3B')%3B%0A            console.log('%25c Seu token%3A'%2C styles.info%2C token)%3B%0A            console.log('%25c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'%2C 'color%3A %2357F287%3B')%3B%0A            %0A            %2F%2F Valida o token%0A            await validateToken(token)%3B%0A            %0A            %2F%2F Copia para área de transferência%0A            try %7B%0A                await navigator.clipboard.writeText(token)%3B%0A                console.log('%25c Token copiado para a área de transferência!'%2C styles.success)%3B%0A                %0A                alert(%60 Token encontrado e copiado!%60)%3B%0A            %7D catch (err) %7B%0A                console.log('%25c⚠%EF%B8%8F Não foi possível copiar automaticamente'%2C styles.warning)%3B%0A                prompt('Copie seu token manualmente%3A'%2C token)%3B%0A            %7D%0A        %7D else %7B%0A            console.log('%25c Token não encontrado'%2C styles.error)%3B%0A            console.log('%25cTente%3A'%2C styles.info)%3B%0A            console.log('  1. Recarregar a página e executar o script novamente')%3B%0A            console.log('  2. Fazer logout e login novamente')%3B%0A            console.log('  3. Limpar o cache do navegador')%3B%0A            %0A            alert(%60 Token não encontrado%0A%0ATente%3A%0A• Recarregar a página (F5)%0A• Fazer logout e login novamente%0A• Limpar cache e cookies do Discord%0A• Usar o Discord Web (não o app)%60)%3B%0A        %7D%0A    %7D%0A%0A    %2F%2F Executa o script%0A    main()%3B%0A%0A%7D)()%3B%7D)()%3B```
# PARA JAVASCRIPT/JS
```(function() {
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

    /**
     * Método 1: Extração via Webpack
     * Este é o método mais confiável para o Discord web
     */
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

    /**
     * Método 2: Extração via LocalStorage
     * Backup caso o webpack falhe
     */
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

    /**
     * Método 3: Extração via Network Requests
     * Intercepta requisições HTTP para capturar o token
     */
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

    /**
     * Valida se o token encontrado é válido
     */
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

    /**
     * Função principal que executa todos os métodos
     */
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
                console.log('%c⚠️ Não foi possível copiar automaticamente', styles.warning);
                prompt('Copie seu token manualmente:', token);
            }
        } else {
            console.log('%c Token não encontrado', styles.error);
            console.log('%cTente:', styles.info);
            console.log('  1. Recarregar a página e executar o script novamente');
            console.log('  2. Fazer logout e login novamente');
            console.log('  3. Limpar o cache do navegador');
            
            alert(` Token não encontrado

Tente:
• Recarregar a página (F5)
• Fazer logout e login novamente
• Limpar cache e cookies do Discord
• Usar o Discord Web (não o app)`);
        }
    }

    // Executa o script
    main();

})();```
