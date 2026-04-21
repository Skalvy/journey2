const searchInput = document.getElementById('mainSearch');
const clearBtn = document.getElementById('clearSearch');
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.card-premium');
const countDisplay = document.getElementById('resultsCount');
const noResults = document.getElementById('noResults');

let currentFilter = 'all';

// Функция фильтрации
function filterTours() {
    const searchText = searchInput.value.toLowerCase();
    let visibleCount = 0;

    cards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        const category = card.getAttribute('data-cat').toLowerCase();
        
        const matchesSearch = title.includes(searchText);
        const matchesChip = currentFilter === 'all' || category === currentFilter;

        if (matchesSearch && matchesChip) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });

    countDisplay.innerText = visibleCount;
    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
}

// Слушатель ввода
searchInput.addEventListener('input', filterTours);

// Слушатель кнопок-чипсов
chips.forEach(chip => {
    chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentFilter = chip.getAttribute('data-filter');
        filterTours();
    });
});

// Очистка поиска
clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    filterTours();
    searchInput.focus();
});