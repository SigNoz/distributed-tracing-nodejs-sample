import { Sequelize } from 'sequelize'
import UserTable from './users.model'
import OrdersTable from './orders.model'
let db: any = new Object()
const initializeDB = (cb) => {
  const sequelize = new Sequelize(
    process.env.MYSQL_DB || 'signoz',
    process.env.MYSQL_USER || 'root',
    process.env.MYSQL_PASSWORD || 'password',
    {
    dialectOptions: {
      ssl: {
        require: false,
        rejectUnauthorized: false,
      },
    },
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: parseInt(process.env.MYSQL_PORT) || 3306,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 600000,
    },
  })

  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.')
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err)
    })

  db['sequelize'] = sequelize
  db['UserTable'] = UserTable(sequelize)
  db['OrdersTable'] = OrdersTable(sequelize)

  cb(db)
}

export { initializeDB, db }
