# Thingful Server

Pair: Sultana + Sacha

<br />

## Iterations

### 2. Learning a new codebase 
src: https://courses.thinkful.com/auth-jwt-v1/checkpoint/2#assignment

branch: **`checkpoint-2`**

<br />

### 3. Protected endpoints with basic auth
src: https://courses.thinkful.com/auth-jwt-v1/checkpoint/3#assignment

branch: **`checkpoint-3`**

<br />

### 4. Data protection with bcrypt
src: https://courses.thinkful.com/auth-jwt-v1/checkpoint/4#assignment

branch: **`checkpoint-4`**

_aside: Instructor' [gist on Data Protection & Hashing Resources](https://gist.github.com/ninjames101/1f44ef1083cfda45698bfc73de84a788)_

<br />

### 5. Secure Login with JWT
src: https://courses.thinkful.com/auth-jwt-v1/checkpoint/5#assignment

branch: **`checkpoint-5`**

<br />


### 6. User registration
src: https://courses.thinkful.com/auth-jwt-v1/checkpoint/6#assignment

branch: **`checkpoint-6`**

<br />

## Setting Up

- Install dependencies: `npm install`
- Create development and test databases: `createdb thingful`, `createdb thingful-test`
- Create database user: `createuser thingful`
- Grant privileges to new user in `psql`:
  - `GRANT ALL PRIVILEGES ON DATABASE thingful TO thingful`
  - `GRANT ALL PRIVILEGES ON DATABASE "thingful-test" TO thingful`
- Prepare environment file: `cp example.env .env`
- Replace values in `.env` with your custom values.
- Bootstrap development database: `npm run migrate`
- Bootstrap test database: `npm run migrate:test`

### Configuring Postgres

For tests involving time to run properly, your Postgres database must be configured to run in the UTC timezone.

1. Locate the `postgresql.conf` file for your Postgres installation.
    - OS X, Homebrew: `/usr/local/var/postgres/postgresql.conf`
2. Uncomment the `timezone` line and set it to `UTC` as follows:

```
# - Locale and Formatting -

datestyle = 'iso, mdy'
#intervalstyle = 'postgres'
timezone = 'UTC'
#timezone_abbreviations = 'Default'     # Select the set of available time zone
```

## Sample Data

- To seed the database for development: `psql -U thingful -d thingful -a -f seeds/seed.thingful_tables.sql`
- To clear seed data: `psql -U thingful -d thingful -a -f seeds/trunc.thingful_tables.sql`

## Scripts

- Start application for development: `npm run dev`
- Run tests: `npm test`

## Endpoints

```
Things Endpoints
  GET /api/things
  GET /api/things/:thing_id
  GET /api/things/:thing_id/reviews

Reviews Endpoints
  POST /api/reviews
```

## Schema

<img src="/migrations/erd_thingful.png" alt="Entity Relationship Diagram" width="500px">

<hr />

## Footnotes

[gist: thingful Q&A](https://gist.github.com/artificialarea/0e7fb264a39468a4710cac08543484e7)


