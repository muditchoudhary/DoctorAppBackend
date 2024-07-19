# API Structure

# User

- Post /user/register - register a new user (Done) (Done Mudit)
- Get /user/login - check user in db and log in it (Done) (Done Mudit)
- Post /user/appointment/new - create new appointment (Done) (Done Mudit)
- Get /user/prescriptions - get all appointments prescriptions (Done) (Done Mudit)
- Get /user/doctor/all - get all doctor which are not disabled (Done Mudit)

# Doctor

- Put /doctor/login - check the doctor and login in it (Done Mudit)
- Put /doctor/appointment/edit - change appt. time OR date (Done Mudit)
- Get /doctor/appointments/ - return all appointments of a doctor (Done Mudit)
- Delete /doctor/appointment/ - delete/cancel the given appt. (Done Mudit)
- Put /doctor/appointment/prescription - add/update prescription for the appointment (Done Mudit)

# Admin

- Post /admin/doctor/register - add new doctor (Done) (Done Mudit)
- Post /admin/register - register a new admin. Route not available in frontend (Done) (Done Mudit)
- Post /admin/login - login a new admin. Route is available in frontend (Done) (Done Mudit)
- Del /admin/doctor/:docId - delete doctor with given id (Done) (Done Mudit)
- Put /admin/doctor/:docId - disable or enable doctor (Done) (Done Mudit)
