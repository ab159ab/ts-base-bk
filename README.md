## Setup
`npm i`

## Run
`npm start` for linux/mac
`npm startForWindows` for windows

## Technology stack
1. Node 12.18.2 LTS (never use non-LTS version). Use nvm (preferred to install node version manager).
1. Redis (session storage)
1. Typescript
1. React
1. (Redux to be implemented later when needed)
1. knex query builder
1. Posgres database

## Notes for developers
### General concepts
1. Do not try, convert, drag or expect javascript (including Typescript) to have and show language features like Java/C# or other languages. Javascript has its own echosystem, taste, features, pros and cons. It it is best to keep it that way.

### Banned things
1. Use of `any` or `unknown` keyword without explicit written permission from code owner
1. Use of `<>` generics. This is temporary restriction and will be uplifted later on.
1. Change in ANY config including but not limited to linting, tsconfig, babel, package.json settings etc.
1. Addition of any other technology stack other than mentioned above.
1. Use of any new library without permission.
1. Direct addition, without PR/pull request, code review and approval) to `master` branch or any branch containing the workd `master`

Why these strict rules?
1. Code is one of the most precious things to a company. 
1. Any inconsistency or unoptimized state is untolerable.
