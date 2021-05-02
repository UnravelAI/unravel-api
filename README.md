# Unravel (Backend)
## To access Unravel (Frontend): https://github.com/UnravelAI/unravel-fe

## Temporary
.env file is available isn't ignored, for local environment on macOs

## To setup
1. Clone the repo `git clone https://github.com/UnravelAI/unravel-api`
2. Install postgresql: https://www.postgresql.org
3. Install postgres CLI psql
4. Using psql create the database `create database unravel;`
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

## Temporary: to run migrations on heroku:
1. Edit ormconfig.json to herokous postgres dyno credentials
2. Add `"extra": { "ssl": true }` to ormconfig.json
3. run `./node_modules/.bin/ts-node ./node_modules/.bin/typeorm migration:run on herkou` on heroku cli
4. Reset ormconfig to local configuration

## API Endpoints (Admin)
| Endpoint | Method | Request Body | Functionality |
|--|--| --| -- |
| <b>User</b>
| /users | POST | Object[User]  | Create a new user |
| /users | GET | {}  | Retrieve all users |
| /users | DELETE/:user_id | {}  | Delete specific user |
| <b>Login</b>
| /login | POST | {email, password} | login |
| <b>Cloud: used from AWS</b>
| /cloud/video/generateStreamingURL | PUT | {filename, guid} | Generate new streamble url and audio url
| /cloud/video/jobStatus | PUT | {fileName} | Notify that video conversion job is completed
| /cloud/video/jobStatus/transcribe | PUT | {transcribeJobName} | Notify that transcription job is completed
| <b>Materials</b>
| /users/materials/ | POST | Object[Material] | Create new material
| /users/materials/ | GET | {} | Get all materials
| /users/materials/ | GET/:user_id | {} | Get specific user materials
| /users/materials/:material_id/video | POST | multipart/form-data[video] | Upload a video
| /users/materials/:material_id/document | POST | multipart/form-data[documentName] | Upload a document


