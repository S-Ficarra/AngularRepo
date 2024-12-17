const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

app.use(cors());

app.use('/api', createProxyMiddleware({
    target: 'https://smtp.maileroo.com',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
    secure: false
}));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur proxy démarré sur http://localhost:${PORT}`);
});
