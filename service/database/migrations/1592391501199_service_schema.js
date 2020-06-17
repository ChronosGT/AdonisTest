'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceSchema extends Schema {
  up () {
    this.create('services', (table) => {
      table.increments()
      table.string('name', 255).notNullable()
      table.string('code_name', 254).notNullable().unique()
      table.integer('cost').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('services')
  }
}

module.exports = ServiceSchema
