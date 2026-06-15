import { defineConfig } from '@prisma/config'

export default defineConfig({
  migrations: {
    seed: 'node prisma/seed.js'
  },
  schema: {
    datasource: {
      url: 'file:./dev.db'
    }
  }
})
