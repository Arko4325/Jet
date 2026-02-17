// 1. Завантажуємо кошик з пам'яті
let cart = JSON.parse(localStorage.getItem('samsung_cart')) || [];

// 2. Функція оновлення лічильника
function updateBadge() {
    const badge = document.getElementById('cart-count');
    if (!badge) return;
    
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.innerText = total;
    
    // Анімація "стрибка"
    badge.classList.add('bump');
    setTimeout(() => badge.classList.remove('bump'), 300);
}

// 3. Обробка кліку (Додавання в кошик)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('buy-btn')) {
        const btn = e.target;
        
        const product = {
            id: btn.dataset.id,
            name: btn.dataset.name,
            price: parseInt(btn.dataset.price),
            quantity: 1
        };

        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            existing.quantity++;
        } else {
            cart.push(product);
        }

        // Зберігаємо та оновлюємо лічильник
        localStorage.setItem('samsung_cart', JSON.stringify(cart));
        updateBadge();

        // Візуальний відгук на кнопці
        const originalText = btn.innerText;
        btn.innerText = "✅ Додано";
        setTimeout(() => btn.innerText = originalText, 1000);
    }
});

// 4. Оновлюємо лічильник відразу при завантаженні сторінки
document.addEventListener('DOMContentLoaded', updateBadge);
