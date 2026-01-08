const PRODUCTS = [
    {
        id: 5567,
        name: "Bambu Lab — A1",
        price: 919990,
        image: "https://trimetra3d.com.ar/wp-content/uploads/2025/05/impresora-3d-bambu-lab-a1-combo-multicolor-con-ams-4-colores-fdm-5-600x600.png",
        category: "Impresoras FDM",
        features: ["Multicolor", "Auto-calibración"],
        isNew: true
    },
    {
        id: 6120,
        name: "Bambu Lab — A1 Combo",
        price: 1363990,
        image: "https://trimetra3d.com.ar/wp-content/uploads/2025/05/impresora-3d-bambu-lab-a1-combo-multicolor-con-ams-4-colores-fdm-600x600.png",
        category: "Impresoras FDM",
        features: ["AMS incluido", "Alta Velocidad"],
        onSale: true
    },
    {
        id: 5547,
        name: "Bambu Lab — A1 Mini",
        price: 541830,
        image: "https://trimetra3d.com.ar/wp-content/uploads/2025/05/impresora-bambulab-a1-mini-combo-3-600x600.png",
        category: "Impresoras FDM",
        features: ["Compacta", "Silenciosa"]
    },
    {
        id: 4869,
        name: "Bambu Lab — A1 Mini Combo",
        price: 986290,
        image: "https://trimetra3d.com.ar/wp-content/uploads/2025/05/impresora-bambulab-a1-mini-combo-600x600.png",
        category: "Impresoras FDM",
        features: ["AMS Lite", "4 Colores"]
    },
    {
        id: 6932,
        name: "Bambu Lab — P1S",
        price: 1601590,
        image: "https://trimetra3d.com.ar/wp-content/uploads/2025/10/Bambu-P1S-Estandar-600x600.png",
        category: "Impresoras FDM",
        features: ["Cerrada", "Grado Profesional"]
    },
    {
        id: 4891,
        name: "Bambu Lab — H2D",
        price: 5399990,
        image: "https://trimetra3d.com.ar/wp-content/uploads/2025/05/Bambulab-H2D-3-600x600.jpg",
        category: "Industrial",
        features: ["Dual Extruder", "Cámara Activa"]
    }
];

let cart = [];

// DOM Elements
const productGrid = document.getElementById('product-grid');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-drawer-overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalLabel = document.getElementById('cart-total');
const cartCountBadges = document.querySelectorAll('.cart-count-badge');
const searchInput = document.getElementById('search-input');

// Functions
function formatCurrency(amount) {
    return '$' + amount.toLocaleString('es-AR');
}

function renderProducts(filter = '') {
    productGrid.innerHTML = '';
    const filtered = PRODUCTS.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()) || p.category.toLowerCase().includes(filter.toLowerCase()));

    if (filtered.length === 0) {
        productGrid.innerHTML = '<p class="col-span-full text-center py-10 text-gray-400">No se encontraron productos.</p>';
        return;
    }

    filtered.forEach(p => {
        const card = document.createElement('div');
        card.className = "group bg-white border border-gray-100 rounded-2xl p-4 flex flex-col transition-all product-card-hover";
        card.innerHTML = `
            <div class="relative aspect-square mb-4 overflow-hidden rounded-xl bg-gray-50">
                <img src="${p.image}" alt="${p.name}" class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500">
                ${p.onSale ? '<span class="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">OFERTA</span>' : ''}
                ${p.isNew ? '<span class="absolute top-2 left-2 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded">NUEVO</span>' : ''}
            </div>
            <div class="flex flex-col flex-grow">
                <span class="text-[10px] font-bold text-gray-400 uppercase mb-1">${p.category}</span>
                <h3 class="font-bold text-gray-800 mb-2 leading-tight h-10 overflow-hidden">${p.name}</h3>
                <div class="mt-auto">
                    <div class="mb-4">
                        <span class="text-2xl font-black text-blue-700">${formatCurrency(p.price)}</span>
                        <p class="text-[10px] text-gray-400">o 3 cuotas sin interés</p>
                    </div>
                    <button data-id="${p.id}" class="add-to-cart-btn w-full bg-gray-900 group-hover:bg-blue-600 text-white font-bold py-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors">
                        Añadir al carrito
                    </button>
                </div>
            </div>
        `;
        productGrid.appendChild(card);
    });

    // Add events to new buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.onclick = () => addToCart(parseInt(btn.dataset.id));
    });
}

function updateCartUI() {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="h-full flex flex-col items-center justify-center opacity-40 py-20"><p>El carrito está vacío</p></div>';
    } else {
        cart.forEach(item => {
            total += item.price * item.quantity;
            count += item.quantity;
            const el = document.createElement('div');
            el.className = "flex gap-4 border-b pb-4";
            el.innerHTML = `
                <div class="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                    <img src="${item.image}" class="w-full h-full object-contain">
                </div>
                <div class="flex-grow">
                    <div class="flex justify-between">
                        <h4 class="text-sm font-bold text-gray-800">${item.name}</h4>
                        <button onclick="removeFromCart(${item.id})" class="text-gray-400 hover:text-red-500">
                             <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <p class="text-xs text-blue-600 font-bold">${formatCurrency(item.price)}</p>
                    <div class="flex items-center gap-3 mt-2">
                        <div class="flex items-center border rounded bg-white">
                            <button onclick="changeQty(${item.id}, -1)" class="px-2 hover:bg-gray-100">-</button>
                            <span class="px-2 text-xs font-bold">${item.quantity}</span>
                            <button onclick="changeQty(${item.id}, 1)" class="px-2 hover:bg-gray-100">+</button>
                        </div>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(el);
        });
    }

    cartTotalLabel.innerText = formatCurrency(total);
    cartCountBadges.forEach(b => {
        b.innerText = count;
        b.classList.toggle('hidden', count === 0);
    });
}

function addToCart(id) {
    const product = PRODUCTS.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
    toggleCart(true);
}

window.removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
};

window.changeQty = (id, delta) => {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            updateCartUI();
        }
    }
};

function toggleCart(show) {
    if (show) {
        cartDrawer.classList.remove('translate-x-full');
        cartOverlay.classList.remove('hidden');
    } else {
        cartDrawer.classList.add('translate-x-full');
        cartOverlay.classList.add('hidden');
    }
}

// Event Listeners
document.getElementById('mobile-cart-btn').onclick = () => toggleCart(true);
document.getElementById('desktop-cart-btn').onclick = () => toggleCart(true);
document.getElementById('close-cart').onclick = () => toggleCart(false);
cartOverlay.onclick = () => toggleCart(false);

searchInput.oninput = (e) => {
    renderProducts(e.target.value);
};

// Init
renderProducts();
updateCartUI();