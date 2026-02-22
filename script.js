// --- ЛОГІКА КОШИКА ---

function addToCart(name, price, img) {
    let cart = JSON.parse(localStorage.getItem('eloriaCart')) || [];
    cart.push({ name: name, price: price, img: img });
    localStorage.setItem('eloriaCart', JSON.stringify(cart));
    
    updateCartCount();
    
    // Візуальний ефект при додаванні
    const btn = event.target;
    const originalText = btn.innerText;
    btn.innerText = "Додано ✅";
    btn.style.background = "#2ed573";
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.background = "black";
    }, 1000);
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('eloriaCart')) || [];
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.innerText = cart.length;
    }
}

// --- СЕРДЕЧКА ТА ЗАВАНТАЖЕННЯ ---

document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Лайк для карток товарів
    document.querySelectorAll('.product-heart').forEach(heart => {
        heart.addEventListener('click', function () {
            this.classList.toggle('liked');
            this.style.transform = 'scale(1.5)';
            setTimeout(() => {
                this.style.transform = this.classList.contains('liked') ? 'scale(1.2)' : 'scale(1)';
            }, 200);
        });
    });

    // Пульсація серця в шапці
    const mainHeart = document.querySelector('header .heart');
    if (mainHeart) {
        mainHeart.addEventListener('click', function () {
            this.style.transform = 'scale(1.4)';
            setTimeout(() => this.style.transform = 'scale(1)', 300);
        });
    }
});
// 1. Функція для оновлення лічильника на іконці кошика
function updateCartCount() {
    const countSpan = document.getElementById('cart-count');
    if (countSpan) {
        let cart = JSON.parse(localStorage.getItem('eloriaCart')) || [];
        countSpan.innerText = cart.length;
    }
}

// 2. Функція додавання товару в кошик
function addToCart(name, price, img) {
    // Отримуємо поточний кошик або створюємо порожній масив
    let cart = JSON.parse(localStorage.getItem('eloriaCart')) || [];
    
    // Додаємо новий об'єкт товару
    cart.push({
        name: name,
        price: parseFloat(price),
        img: img
    });
    
    // Зберігаємо назад у LocalStorage
    localStorage.setItem('eloriaCart', JSON.stringify(cart));
    
    // Оновлюємо цифру на кошику відразу
    updateCartCount();
    
    // Візуальне підтвердження
    alert(`Товар "${name}" додано!`);
}

// 3. Логіка для сторінки оплати (якщо ми на ній)
function renderPayPage() {
    const container = document.getElementById('cart-items-display');
    const totalDisplay = document.getElementById('total-price-display');
    
    if (!container) return; // Вихід, якщо ми не на сторінці оплати

    let cart = JSON.parse(localStorage.getItem('eloriaCart')) || [];
    
    if (cart.length === 0) {
        container.innerHTML = "<p style='text-align:center;'>Кошик порожній</p>";
        if (totalDisplay) totalDisplay.innerText = "0 ₴";
        return;
    }

    let total = 0;
    container.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.price;
        container.innerHTML += `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #eee; padding:10px 0;">
                <div style="display:flex; align-items:center; gap:10px;">
                    <img src="${item.img}" width="50" height="50" style="object-fit:cover; border-radius:5px;">
                    <span>${item.name}</span>
                </div>
                <b>${item.price} ₴</b>
            </div>
        `;
    });

    if (totalDisplay) {
        totalDisplay.innerText = total.toFixed(2) + " ₴";
    }
}

// 4. Запуск функцій при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    renderPayPage();
});
