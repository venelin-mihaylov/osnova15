import Knex from 'knex'
import db from './db'
export const knex = Knex(db) // eslint-disable-line
export default knex
