const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-up");
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll(".animate-card").forEach(card => {
    observer.observe(card);
});
