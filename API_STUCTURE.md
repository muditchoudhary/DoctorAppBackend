# API Structure

# User

- Post /user/register - register a new user (Done) (Done Mudit)
- Get /user/login - check user in db and log in it (Done) (Done Mudit)
- Po st /user/appointment/new - create new appointment (Done) (Done Mudit)
- Get /user/prescriptions - get all appointments prescriptions (Done) (Done Mudit)

# Doctor

- Put /doctor/login - check the doctor and login in it
- Put /doctor/appointment/edit/:appId - change appt. time or edit or add prescription
- Get /doctor/appointments/:appId - return a appt. with given id
- Get /doctor/appointment/:doctorId - return all appt. by given doctor id
- Delete /doctor/appointment/:appId - delete the given appt.
- Delete /doctor/appointment?:appId - delete the appointment

# Admin

- Post /admin/doctor/register - add new doctor (Done) (Done Mudit)
- Del /admin/doctor/:docId - delete doctor with given id (Done) (Done Mudit)
- Put /admin/doctor/:docId - disable or enable doctor (Done) (Done Mudit)
