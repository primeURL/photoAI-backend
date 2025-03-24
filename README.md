# photoAI-backend


1.
npm install prisma --save-dev
npx prisma init

2.
npx prisma migrate dev --name init
    This command does two things:
        It creates a new SQL migration file for this migration
        It runs the SQL migration file against the database

3.
npm install @prisma/client

4. 
npx prisma migrate dev --name [desired_name]
Whenever you update your Prisma schema, you will have to update your database schema using either prisma migrate dev

5. 
npx prisma studio