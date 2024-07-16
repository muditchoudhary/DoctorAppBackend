# Frontend Structue

# Frontend Routes
- /home OR / (root) -> 
    - Have navbar [home, about us]
    - If User not log in -> Will show Log in ans Sign up Btn
    - If User log in -> Will show user functionality [book appt, view prescription]

- /login
    - This page show 3 options
    - Login as user, Login as doctor, Login as admin

- /register
    - This shows register page for user only

- /book/appointment
    - This shows 3 drop selector menus
    - Select dr, select date, select time slot

- /prescriptions
    - Shows all prescriptions in list
    - Like prescription by doctor name


- /adminPanel (accessible only by admin)
    - Show 2 block
    - Add dr, del dr
    - Add dr will open a form 
    - del dr will show a list of all dr with 2 btns [delete, disable]

- /doctorPanel (accessible only by doctor)
    - Show 1 block
    - View Appointments
    - View appointments page show all appointments in a block format
    - If appointment status is not done each block shows 3 btn [write prescription, cancel, edit]
    - If app.t status is done now show these buttons.


