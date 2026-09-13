document.addEventListener("DOMContentLoaded", () => {

    const buttons = document.querySelectorAll('.filter-btn');
    const items = document.querySelectorAll('.portfolio-col');
    
    // Imposta "Tutti" come attivo all'avvio
    const defaultBtn = document.querySelector('[data-filter="all"]');
    if (defaultBtn) defaultBtn.classList.add('active');
    
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Rimuove active da tutti i pulsanti
            buttons.forEach(b => b.classList.remove('active'));

            // Aggiunge active al pulsante cliccato
            btn.classList.add('active');

            // Filtra gli elementi
            items.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.classList.remove('d-none');
                } else {
                    item.classList.add('d-none');
                }
            });
        });
    });

});


// ⭐ LIGHTBOX INTELLIGENTE (scorre solo la categoria cliccata)

let imagesFiltered = [];
let currentIndex = 0;

// Quando clicchi un'immagine
document.querySelectorAll('.portfolio-img').forEach((img) => {

    img.addEventListener('click', () => {

        const clickedCat = img.getAttribute('data-cat');

        // Filtra solo le immagini della categoria cliccata
        imagesFiltered = Array.from(document.querySelectorAll('.portfolio-img'))
            .filter(i => i.getAttribute('data-cat') === clickedCat)
            .map(i => i.getAttribute('data-img'));

        // Trova l'indice dell'immagine cliccata dentro il gruppo filtrato
        currentIndex = imagesFiltered.indexOf(img.getAttribute('data-img'));

        // Mostra l'immagine nel modal
        document.getElementById('modalImage').src = imagesFiltered[currentIndex];

        const modal = new bootstrap.Modal(document.getElementById('imgModal'));
        modal.show();
    });
});


// ⭐ Freccia destra
document.getElementById('nextBtn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % imagesFiltered.length;
    document.getElementById('modalImage').src = imagesFiltered[currentIndex];
});

// ⭐ Freccia sinistra
document.getElementById('prevBtn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + imagesFiltered.length) % imagesFiltered.length;
    document.getElementById('modalImage').src = imagesFiltered[currentIndex];
});
