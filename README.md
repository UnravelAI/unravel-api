# Unravel (Backend)

## Temporary
.env file is available isn't ignored, for local environment on macOs

## To setup
1. Clone the repo `git clone https://github.com/UnravelAI/unravel-api`
2. Install postgresql: https://www.postgresql.org
3. Install postgres CLI psql
4. Using psql create the database `createdb unravel`
5. Install dev-dependencies `npm install`

## Install typeScript globally if not previously installed
#### `npm install -g typescript`
#### `npm install -g ts-node`


## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the api in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

The api will reload if you make edits.\
You will also see any linting errors in the console.

### `npm run generateMigration your-migration-name`

Generates new migration after every entity creation.\
The script builds the application and generates a new migration.

### `npm run runMigration`

Executes new migration after generation.\
The script builds the application and executes the new migrations.
## API Endpoints (Admin)
| Endpoint | Method | Request Body | Functionality |
|--|--| --| -- |
| <b>User</b>
| /users | POST | Object[User]  | Create a new user |
| /users | GET | {}  | Retrieve all users |
| /users | DELETE/:user_id | {}  | Delete specific user |
