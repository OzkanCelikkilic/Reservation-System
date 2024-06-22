# Movie-Theater Reservation System

## Overview
This project is an implementation of a reservation system for a movie theater saloon using HTML, CSS, and JavaScript. The system is divided into three parts: user input, seating arrangement, and reservation details. It allows users to enter their information, select seats, and view reservation details. Admins can set up the seating arrangement.

## Features

### User Input (Left Part)
- Users fill out a form with their name, surname, email address, phone number, and age.
- All fields are required, and appropriate inputs are validated.
- Upon submission, a user object is created with the provided information, user role, and ticket price.
- If the provided email address matches "admin@admin.com", the user's role is set to admin; otherwise, it is set to user.
- After the current user is set, the right part of the page becomes active.

### Admin Interface (Center Part)
- Admins can set the number of rows and columns for the seating arrangement.
- Upon clicking the "Set" button, a matrix representing the seating arrangement is generated, with each cell representing a seat in the saloon.
- Initially, all seats are empty.

### User Interface (Center Part)
- If the admin has not set the seating arrangement, the user interface is empty.
- When the seating matrix is created, users can see and select available seats.
- Selected seats turn green, indicating they are reserved by the current user. Clicking a selected seat cancels the reservation for that seat and reverts its color to default.
- Hovering over a selected seat displays a tooltip containing the seat's price information.
- Seat prices are determined as follows:
  - Age < 18: $10
  - 18 <= Age < 26: $15
  - 26 <= Age < 65: $25
  - Age >= 65: $10

### Reservation Details (Right Part)
- Displays the current user's name, surname, selected seats, and total price.
- A “Confirm” button ends the reservation and displays a pop-up with the reservation information.


## How to Run the Project
1. Clone the repository:
    ```sh
    git clone https://github.com/OzkanCelikkilic/Reservation-System.git
    ```
2. Navigate to the project directory:
    ```sh
    cd Reservation-System
    ```
3. Open `index.html` in your preferred web browser.

## The Website
![Ekran görüntüsü 2024-06-01 170726](https://github.com/OzkanCelikkilic/Reservation-System/assets/134146392/4f54ac8e-e111-4c85-ac02-ff85ac96dbfc)
