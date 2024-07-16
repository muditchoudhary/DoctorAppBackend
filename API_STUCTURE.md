# API Structure

# User

- Post /auth/register - register a new user
- Get /auth/login - check user in db and log in it
- Post /user/appointment/new - create new appointment
- Get /user/prescription/:prescriptionId

# Doctor

- Put /doctor/appointment/edit/:appId - change appt. time or edit or add prescription
- Get /doctor/appointemtn/:appId - return a appt. with given id
- Delete /doctor/appointment?:appId - delete the appointment

# Admin

- Post /admin/doctor/new - add new doctor
- Del /admin/doctor/:docId - delete doctor with given id
- Put /admin/doctor/:docId - disable or enable doctor
