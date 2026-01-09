const products = [
    { name: "Creality Ender 3 V2", price: "$189.999" },
    { name: "Filamento PLA 1kg", price: "$12.499" },
    { name: "Kit Mantenimiento", price: "$24.999" },
    { name: "Servicio Impresión 3D", price: "Consultar" }
];

const grid = document.getElementById("product-grid");

products.forEach(p => {
    grid.innerHTML += `
        <div class="col-md-3">
            <div class="product-card">
                <h6 class="fw-bold">${p.name}</h6>
                <p class="price">${p.price}</p>
                <button class="btn btn-danger btn-sm rounded-pill">
                    <i class="fas fa-cart-plus"></i> Añadir
                </button>
            </div>
        </div>
    `;
});


// FECHA OBJETIVO: 02/02/2026
const countDownDate = new Date(2026, 1, 2, 0, 0, 0).getTime();

const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance <= 0) {
        clearInterval(timer);
        document.querySelector(".promo-countdown").innerHTML =
            "<div class='container text-center fw-bold'>Promo finalizada. Próximamente nuevas ofertas.</div>";
        return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const m = Math.floor((distance / (1000 * 60)) % 60);
    const s = Math.floor((distance / 1000) % 60);

    document.getElementById("days").textContent = d.toString().padStart(2, "0");
    document.getElementById("hours").textContent = h.toString().padStart(2, "0");
    document.getElementById("minutes").textContent = m.toString().padStart(2, "0");
    document.getElementById("seconds").textContent = s.toString().padStart(2, "0");
}, 1000);


const btnUp = document.getElementById("btnUp");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        btnUp.classList.add("show");
    } else {
        btnUp.classList.remove("show");
    }
});

btnUp.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});