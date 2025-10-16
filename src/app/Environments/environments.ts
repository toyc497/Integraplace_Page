export const environments = {
    production: false,
    keycloak: {
        config: {
            url: 'http://127.0.0.1:8087',
            realm: 'Integraplace',
            clientId: 'integraplace_web_client'
        },
        initOptions: {
            onLoad: 'login-required',
            checkLoginIframe: false
        }
    },
    api: {
        url: 'http://127.0.0.1:8085'
    }
};