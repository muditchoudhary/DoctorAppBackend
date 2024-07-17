# Database Structure

## Database

We have a single db named: DoctorApp in mongo db atlas

## Collections

1. User

   - Id not null
   - FullName string not null
   - Email string not null unique
   - Password string not null
   - userType string not null
   - Appointments list of appointments object

2. Appointment Schema for User Model (not a seperate collection)

   - Id PK not null
   - appointmentOn Sting (Date) not null
   - appointmentAt String (Time) not null
   - doctorName not null
   - doctorSpeciality not null

3. Doctor

   - Id PK not null
   - FullName string not null
   - Email string not null
   - Password string not null
   - Speciality string not null
   - Disable boolean not null default(false)
   - Appointments list of appointments [appointmentOn, appointmentAt, userId, userName ]

4. Admin
   - Id PK
   - FullName string not null
   - Email string not null
   - Password string not null
