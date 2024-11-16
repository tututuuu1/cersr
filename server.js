const express = require('express');
const app = express();
const path = require('path');

// 中间件配置
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// API 路由
app.get('/api/hello', (req, res) => {
    res.json({ message: '你好，世界！' });
});

// 主页路由
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: '服务器内部错误' });
});

// 开发环境服务器
if (process.env.NODE_ENV !== 'production') {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`开发服务器运行在端口 ${port}`);
    });
}

module.exports = app; 