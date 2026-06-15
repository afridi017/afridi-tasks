const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10)

  const ibAfridi = await prisma.user.upsert({
    where: { email: 'ib.afridi@example.com' },
    update: {},
    create: {
      email: 'ib.afridi@example.com',
      name: 'IB Afridi',
      password: hashedPassword,
      projects: {
        create: [
          {
            name: 'Afridi Tasks Alpha',
            description: 'The first version of Afridi Tasks.',
            tasks: {
              create: [
                { title: 'Design Database Schema', description: 'Create Prisma schema for the app', status: 'DONE', order: 0 },
                { title: 'Setup NextAuth', description: 'Implement Email login', status: 'IN_PROGRESS', order: 1 },
                { title: 'Implement Drag and Drop', description: 'Use dnd-kit or react-beautiful-dnd', status: 'TODO', order: 2 }
              ]
            }
          }
        ]
      }
    }
  })

  const dummyUser1 = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      email: 'alice@example.com',
      name: 'Alice Developer',
      password: hashedPassword,
    }
  })

  const dummyUser2 = await prisma.user.upsert({
    where: { email: 'bob@example.com' },
    update: {},
    create: {
      email: 'bob@example.com',
      name: 'Bob Designer',
      password: hashedPassword,
    }
  })

  console.log('Seed executed successfully. Added users:', ibAfridi.name, dummyUser1.name, dummyUser2.name)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
