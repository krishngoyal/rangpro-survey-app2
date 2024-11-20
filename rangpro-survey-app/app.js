document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('survey-form');
    const colorGrid = document.querySelector('.color-grid');
    const summaryTableBody = document.querySelector('#summary-table tbody');
    const colorDemandTableBody = document.querySelector('#color-demand-table tbody');

    const colors = [
        { id: 'color1', name: 'Bright Yellow' },
        { id: 'color2', name: 'Sky Blue' },
        { id: 'color3', name: 'Soft Pink' },
        { id: 'color4', name: 'Lime Green' },
        { id: 'color5', name: 'Peach' },
        { id: 'color6', name: 'Light Gray' },
        { id: 'color7', name: 'Orange' },
        { id: 'color8', name: 'Deep Red' },
        { id: 'color9', name: 'White' },
        { id: 'color10', name: 'Ivory' },
        { id: 'color11', name: 'Lavender' },
        { id: 'color12', name: 'Mint Green' },
        { id: 'color13', name: 'Turquoise' },
        { id: 'color14', name: 'Burgundy' },
        { id: 'color15', name: 'Beige' },
        { id: 'color16', name: 'Chocolate Brown' },
        { id: 'color17', name: 'Light Blue' },
        { id: 'color18', name: 'Charcoal Gray' },
        { id: 'color19', name: 'Coral' },
        { id: 'color20', name: 'Amber' },
    ];

    const colorDemand = {};
    colors.forEach(color => colorDemand[color.id] = 0);

    const selectedColors = new Set();

    // Populate color grid
    colors.forEach(color => {
        const colorCard = document.createElement('div');
        colorCard.classList.add('color-card');
        colorCard.dataset.id = color.id;

        const caption = document.createElement('p');
        caption.textContent = color.name;

        colorCard.appendChild(caption);
        colorCard.addEventListener('click', () => toggleColor(colorCard));

        colorGrid.appendChild(colorCard);
    });

    function toggleColor(card) {
        const colorId = card.dataset.id;

        if (selectedColors.has(colorId)) {
            selectedColors.delete(colorId);
            card.classList.remove('selected');
        } else if (selectedColors.size < 6) {
            selectedColors.add(colorId);
            card.classList.add('selected');
        } else {
            alert('You can select up to 6 colors.');
        }
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const shopName = document.getElementById('shop-name').value.trim();
        const shopkeeperName = document.getElementById('shopkeeper-name').value.trim();
        const contactNumber = document.getElementById('contact-number').value.trim();
        const visitDate = document.getElementById('visit-date').value;
        const shopAddress = document.getElementById('shop-address').value.trim();

        if (selectedColors.size < 6) {
            alert('Please select at least 6 colors.');
            return;
        }

        const selectedColorNames = Array.from(selectedColors).map(id => {
            const color = colors.find(c => c.id === id);
            colorDemand[id]++;
            return color.name;
        }).join(', ');

        // Add shopkeeper data to the summary table
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${shopName}</td>
            <td>${shopkeeperName}</td>
            <td>${contactNumber}</td>
            <td>${visitDate}</td>
            <td>${shopAddress}</td>
            <td>${selectedColorNames}</td>
        `;
        summaryTableBody.appendChild(row);

        // Update color demand table
        updateColorDemandTable();

        // Reset form
        form.reset();
        selectedColors.clear();
        document.querySelectorAll('.color-card').forEach(card => card.classList.remove('selected'));
    });

    function updateColorDemandTable() {
        colorDemandTableBody.innerHTML = '';
        Object.keys(colorDemand).forEach(colorId => {
            const color = colors.find(c => c.id === colorId);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${color.name}</td>
                <td>${colorDemand[colorId]}</td>
            `;
            colorDemandTableBody.appendChild(row);
        });
    }
});
