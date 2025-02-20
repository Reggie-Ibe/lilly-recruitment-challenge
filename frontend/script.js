// API endpoints
const API_URL = 'http://localhost:8000';

// DOM Elements
const medicineTableBody = document.getElementById('medicineTableBody');
const addMedicineForm = document.getElementById('addMedicineForm');
const nameError = document.getElementById('nameError');
const priceError = document.getElementById('priceError');

//Async
async function fetchMedicines() {
    try {
        const response = await fetch(`${API_URL}/medicines`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayMedicines(data.medicines);
        updateStatistics(data.medicines);
    } catch (error) {
        console.error('Error fetching medicines:', error);
    }
}

// Table for meds
function displayMedicines(medicines) {
    medicineTableBody.innerHTML = '';
    medicines.forEach(medicine => {
        const row = document.createElement('tr');
        const nameClass = !medicine.name ? 'empty-name' : '';
        row.innerHTML = `
            <td class="${nameClass}" onclick="handleNameClick(this)">${medicine.name || '(Empty Name)'}</td>
            <td>${medicine.price ? `$${medicine.price.toFixed(2)}` : 'N/A'}</td>
            <td>
                <button class="btn btn-secondary" onclick="handleEdit('${medicine.name}')">Edit</button>
                <button class="btn btn-primary" onclick="handleDelete('${medicine.name}')">Delete</button>
            </td>
        `;
        medicineTableBody.appendChild(row);
    });
}

// Update stats
function updateStatistics(medicines) {
    const validPrices = medicines.filter(m => m.price !== null && m.price !== undefined)
                                .map(m => m.price);
    
    totalMedicines.textContent = medicines.length;
    
    if (validPrices.length > 0) {
        const avg = validPrices.reduce((a, b) => a + b, 0) / validPrices.length;
        const max = Math.max(...validPrices);
        const min = Math.min(...validPrices);
        
        averagePrice.textContent = `$${avg.toFixed(2)}`;
        highestPrice.textContent = `$${max.toFixed(2)}`;
        lowestPrice.textContent = `$${min.toFixed(2)}`;
    }
}

// Handle form submission
addMedicineForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Reset errors
    nameError.textContent = '';
    priceError.textContent = '';
    
    // Get data
    const formData = new FormData(addMedicineForm);
    const name = formData.get('name');
    const price = formData.get('price');
    
    // Conditions to valide
    let hasError = false;
    
    if (!name.trim()) {
        nameError.textContent = 'Medicine name is required';
        hasError = true;
    }
    
    if (!price || price <= 0) {
        priceError.textContent = 'Price must be greater than 0';
        hasError = true;
    }
    
    if (hasError) return;
    
    try {
        const response = await fetch(`${API_URL}/create`, {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            addMedicineForm.reset();
            fetchMedicines();
        }
    } catch (error) {
        console.error('Error adding medicine:', error);
    }
});

// Handle name click to select empty names
async function handleNameClick(element) {
    if (element.classList.contains('empty-name')) {
        const newName = prompt('Enter new name for medicine:');
        if (newName && newName.trim()) {
            const oldName = element.textContent === '(Empty Name)' ? '' : element.textContent;
            const price = parseFloat(element.nextElementSibling.textContent.replace('$', ''));
            
            const formData = new FormData();
            formData.append('name', newName);
            formData.append('price', price);
            
            try {
                await fetch(`${API_URL}/update`, {
                    method: 'POST',
                    body: formData
                });
                fetchMedicines();
            } catch (error) {
                console.error('Error updating medicine:', error);
            }
        }
    }
}

// Handle edit
async function handleEdit(name) {
    const medicine = await fetch(`${API_URL}/medicines/${name}`).then(r => r.json());
    if (medicine.error) return;
    
    const newName = prompt('Enter new name:', medicine.name);
    const newPrice = prompt('Enter new price:', medicine.price);
    
    if (newName && newPrice) {
        const formData = new FormData();
        formData.append('name', newName);
        formData.append('price', parseFloat(newPrice));
        
        try {
            await fetch(`${API_URL}/update`, {
                method: 'POST',
                body: formData
            });
            fetchMedicines();
        } catch (error) {
            console.error('Error updating medicine:', error);
        }
    }
}

// Handle delete
async function handleDelete(name) {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
        const formData = new FormData();
        formData.append('name', name);
        
        try {
            await fetch(`${API_URL}/delete`, {
                method: 'DELETE',
                body: formData
            });
            fetchMedicines();
        } catch (error) {
            console.error('Error deleting medicine:', error);
        }
    }
}

// Initiate fetch
fetchMedicines();