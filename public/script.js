async function fetchMessage() {
    try {
        const response = await fetch('/api/hello');
        const data = await response.json();
        document.getElementById('message').textContent = data.message;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').textContent = '加载失败';
    }
}

async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, message }),
        });

        if (response.ok) {
            alert('消息已发送！');
            form.reset();
        } else {
            alert('发送失败，请稍后重试。');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('发送失败，请稍后重试。');
    }
}

// 页面加载完成后自动获取消息
document.addEventListener('DOMContentLoaded', fetchMessage); 