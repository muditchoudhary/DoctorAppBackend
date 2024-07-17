# API Structure

# User

- Post /user/register - register a new user (Done)
- Get /user/login - check user in db and log in it (Done)
- Post /user/appointment/new - create new appointment (Done)
- Get /user/prescriptions - get all appointments prescriptions (Done)

# Doctor

- Put /doctor/appointment/edit/:appId - change appt. time or edit or add prescription
- Get /doctor/appointemtn/:appId - return a appt. with given id
- Delete /doctor/appointment?:appId - delete the appointment

# Admin

- Post /admin/doctor/new - add new doctor (Done)
- Del /admin/doctor/:docId - delete doctor with given id (Done)
- Put /admin/doctor/:docId - disable or enable doctor (Done)
