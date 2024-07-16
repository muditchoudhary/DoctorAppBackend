# Database Structure

## Database

We have a single db named: DoctorApp in mongo db atlas

## Collections

1. User

   - Id PK not null
   - FullName string not null
   - Email string not null unique
   - Password string not null
   - Type

2. Appointment

   - Id PK not null
   - appointmentDate Date not null
   - appointmentTime Time not null
   - DoctorId FK not null
   - UserId FK not null

3. Doctor

   - Id PK
   - FullName string not null
   - Email string not null
   - Password string not null
   - Speciality string not null
   - Disable boolean not null default(false)

4. Admin
   - Id PK
   - FullName string not null
   - Email string not null
   - Password string not null
