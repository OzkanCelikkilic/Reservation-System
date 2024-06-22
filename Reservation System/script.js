document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const adminPanel = document.getElementById('adminPanel');
    const seatingArea = document.getElementById('seatingArea');
    const reservationDetails = document.getElementById('reservationDetails');
    const userNameSpan = document.getElementById('userName');
    const userSurnameSpan = document.getElementById('userSurname');
    const selectedSeatsSpan = document.getElementById('selectedSeats');
    const totalPriceSpan = document.getElementById('totalPrice');
    const confirmReservationButton = document.getElementById('confirmReservation');

    let currentUser = null;
    let selectedSeats = [];

    userForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const formData = new FormData(userForm);
        const user = {
            name: formData.get('name'),
            surname: formData.get('surname'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            age: parseInt(formData.get('age')),
            role: formData.get('email') === 'admin@admin.com' ? 'admin' : 'user',
            ticketPrice: calculateTicketPrice(parseInt(formData.get('age')))
        };
        currentUser = user;
        updateUserDetails();
        if (user.role === 'admin') {
            adminPanel.style.display = 'block';
        } else {
            adminPanel.style.display = 'none';
            seatingArea.innerHTML = '';
        }
        reservationDetails.style.display = 'block';
    });

    document.getElementById('setSeats').addEventListener('click', () => {
        const rows = parseInt(document.getElementById('rows').value);
        const columns = parseInt(document.getElementById('columns').value);
        if (rows > 0 && columns > 0) {
            createSeatingArrangement(rows, columns);
        }
    });

    confirmReservationButton.addEventListener('click', () => {
        if (selectedSeats.length > 0) {
            alert(`Reservation confirmed for ${currentUser.name} ${currentUser.surname} with seats: ${selectedSeats.join(', ')}`);
        } else {
            alert('No seats selected');
        }
    });

    function validateForm() {
        const name = document.getElementById('name').value.trim();
        const surname = document.getElementById('surname').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const age = document.getElementById('age').value.trim();
        
        if (!name || !surname || !email || !phone || !age) {
            alert('All fields are required.');
            return false;
        }
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return false;
        }
        
        const phonePattern = /^\d{10}$/;  //10-digit phone number format
        if (!phonePattern.test(phone)) {
            alert('Please enter a valid phone number (10 digits).');
            return false;
        }
        
        if (isNaN(age) || age <= 0) { //Age value can't be negative
            alert('Please enter a valid age.');
            return false;
        }

        return true;
    }

    function calculateTicketPrice(age) {
        if (age < 18 || age >= 65) {
            return 10;
        } else if (age >= 18 && age < 26) {
            return 15;
        } else {
            return 25;
        }
    }

    function createSeatingArrangement(rows, columns) {
        seatingArea.innerHTML = '';
        seatingArea.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                const seat = document.createElement('div');
                seat.classList.add('seat');
                seat.dataset.row = r;
                seat.dataset.column = c;
                seat.dataset.price = currentUser.ticketPrice;
                seat.textContent = `${String.fromCharCode(65 + r)}${c + 1}`;
                seat.title = `$${currentUser.ticketPrice}`;
                seat.addEventListener('click', toggleSeatSelection);
                seatingArea.appendChild(seat);
            }
        }
    }

    function toggleSeatSelection(e) {
        const seat = e.target;
        const seatId = `${String.fromCharCode(65 + parseInt(seat.dataset.row))}${parseInt(seat.dataset.column) + 1}`;
        if (seat.classList.contains('selected')) {
            seat.classList.remove('selected');
            selectedSeats = selectedSeats.filter(s => s !== seatId);
        } else {
            seat.classList.add('selected');
            selectedSeats.push(seatId);
        }
        updateSelectedSeats();
    }

    function updateSelectedSeats() {
        selectedSeatsSpan.textContent = selectedSeats.join(', ');
        const totalPrice = selectedSeats.length * currentUser.ticketPrice;
        totalPriceSpan.textContent = totalPrice.toFixed(2);
    }

    function updateUserDetails() {
        userNameSpan.textContent = currentUser.name;
        userSurnameSpan.textContent = currentUser.surname;
    }
});
