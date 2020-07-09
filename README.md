## Setup
`npm i`

create a database and user called “skeleton” in postgres
```
sudo -u postgres psql;
create database skeleton;
create user skeleton with encrypted password 'skeleton';
grant all privileges on database skeleton to skeleton;
\c skeleton;
CREATE EXTENSION "uuid-ossp";
```

install knex as global and local dependency 

`npm i -g knex`

to run migrations run => `knex migrate:latest`

to drop migrations (no need in setup) run => `knex migrate:rollback`

## Run
`npm start` for linux/mac
`npm startForWindows` for windows

## Technology stack
All most all the code is coded by hand (ie no code generatores are used). All the code and choices were well thought and well known before implementation.
Each choice has its effect on fate of the project flow should be well known before using.

1. Node 12.18.2 LTS (never use non-LTS version). Use nvm (node version manager (preferred) to install node).
1. Redis (session storage)
1. Typescript
1. React
1. (Redux to be implemented later when needed)
1. knex query builder
1. Posgres database
1. ESlint and airbnb base for automatic code checking
1. JEST for unit/integration testing
1. Enzym, pupeteer (later; not included for now) for further end to end and more testing
1. i18n custom for internationalization and multi language support
1. Mailgun for sending emails to users.
1. Automatic CSS browser compatibility for old browsers (to limit versions of course)
1. Babel, Typescript compiler for transpiling code for backward compatibility
1. Webpack for bundling frontend code

## Notes for developers
### General concepts
1. Do not try, convert, drag or expect javascript (including Typescript) to have and show language features like Java/C# or other languages. Javascript has its own echosystem, taste, features, pros and cons. It it is best to keep it that way.
1. Keep layers of controller, service, dao (database access object), models, utilities separate.
1. Of course, keep frontend and backend separate.
    1. Further, in frontend, the scss/css should go in separate files, component/html in separate file.
    1. CDN is good but in this case, do not use any CDN or `<scrip>` tags requesting any third party css/js/image. Use npm to install locally and then refer it in code by `import`.
    
### Banned things
1. Use of `any` or `unknown` keyword without explicit written permission from code owner
1. Use of `<>` generics. This is temporary restriction and will be uplifted later on.
1. Disabling or suppressing any linting or TS rule in code files.
1. Change in ANY config including but not limited to linting, tsconfig, babel, package.json settings etc.
1. Addition of any other technology stack other than mentioned above.
1. Use of any new library without permission.
1. Direct addition, without PR/pull request, code review and approval) to `master` branch or any branch containing the workd `master`

Why these strict rules?
1. Code is one of the most precious things to a company. 
1. Any inconsistency or unoptimized state is not tolerable.

## Release
### 1.0.0
1. Register
1. Login
1. Logout

## Code owner
Masood Ahmad.