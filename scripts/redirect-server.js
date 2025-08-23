const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const TARGET_PORT = 3001;

// HTML template para redirecionamento
const redirectHTML = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirecionando... - GrowthScale</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            color: white;
        }
        .container {
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            padding: 2rem;
            border-radius: 1rem;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        .spinner {
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        h1 {
            margin: 0 0 0.5rem 0;
            font-size: 1.5rem;
        }
        p {
            margin: 0;
            opacity: 0.9;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="spinner"></div>
        <h1>Redirecionando...</h1>
        <p>Aguarde enquanto redirecionamos para a porta correta.</p>
    </div>

    <script>
        // Função para extrair parâmetros da URL
        function getUrlParameter(name) {
            name = name.replace(/[\\[]/, '\\\\[').replace(/[\\]]/, '\\\\]');
            var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
            var results = regex.exec(location.search);
            return results === null ? '' : decodeURIComponent(results[1].replace(/\\+/g, ' '));
        }

        // Função para redirecionar
        function redirectToCorrectPort() {
            const code = getUrlParameter('code');
            const error = getUrlParameter('error');
            const errorDescription = getUrlParameter('error_description');

            // Construir a URL correta
            let correctUrl = 'http://localhost:${TARGET_PORT}';

            if (code) {
                correctUrl += '/auth/callback?code=' + encodeURIComponent(code);
            } else if (error) {
                correctUrl += '/auth?error=' + encodeURIComponent(error);
                if (errorDescription) {
                    correctUrl += '&error_description=' + encodeURIComponent(errorDescription);
                }
            } else {
                correctUrl += '/';
            }

            console.log('🔧 Redirecionando para:', correctUrl);
            window.location.href = correctUrl;
        }

        // Executar redirecionamento após um pequeno delay
        setTimeout(redirectToCorrectPort, 1000);
    </script>
</body>
</html>
`;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    
    console.log(`🔧 [REDIRECT SERVER] ${req.method} ${req.url}`);
    
    // Configurar headers CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    
    // Servir a página de redirecionamento para todas as rotas
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(redirectHTML);
});

server.listen(PORT, () => {
    console.log(`🚀 Servidor de redirecionamento rodando em http://localhost:${PORT}`);
    console.log(`📡 Redirecionando para http://localhost:${TARGET_PORT}`);
    console.log(`💡 Use 'npm run dev:full' para iniciar ambos os servidores`);
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log(`⚠️  Porta ${PORT} já está em uso. Servidor de redirecionamento não iniciado.`);
        console.log(`💡 Certifique-se de que não há outro processo rodando na porta ${PORT}`);
    } else {
        console.error('❌ Erro no servidor de redirecionamento:', err);
    }
});
