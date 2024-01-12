# Intro

# DB Config and Setup

## Setup

Get the docker image: 
`docker pull postgres`

Start the container and create the database:
```shell
docker run --name CHARGE_DATA_DB -e POSTGRES_PASSWORD=ServiceChargerator_pass -p 5432:5432 -d postgres
````

Check the container is running: `docker ps`

Connect using the `psql` command line tool:
```shell
docker exec -it CHARGE_DATA_DB psql -U postgres
```

The DB can be stopped with
```shell
docker stop CHARGE_DATA_DB
```

It can be started again with
```shell
docker start CHARGE_DATA_DB
```

## Create a DB User

Log in to the DB with `psql`: 
`docker exec -it CHARGE_DATA_DB psql -U postgres`

Create a user for running the migrations:

```sql
CREATE USER alembic WITH PASSWORD 'alembic_pass';
ALTER USER alembic WITH SUPERUSER;
\q
```

## Migrations
Install the migration tool:

```shell
pip install psycopg2-binary
pip install alembic
```

Initialise Alembic and create the initial config files.

`alembic init alembic`

## Copy over data to the container

```shell
docker cp data.csv container_name:/path/to/data.csv
```

```shell
psql -U alembic -d CHARGE_DATA -c "COPY your_table_name FROM '/tmp/charges.csv' DELIMITER ',' CSV HEADER;"
```


# React App

```shell
npx create-react-app service-chargearator
cd service-chargearator
npm start
```

# Flask App

```shell
python app.py
```
