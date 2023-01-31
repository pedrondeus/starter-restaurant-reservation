const { table } = require("../connection");

exports.up = function(knex) {
    return knex.schema.createTable("tables", (table) => {
        table.increments("table_id").primary()
        table.toString("table_name")
        table.decimal("capacity")
        table.integer("reservation_id").unsigned().notNullable()
        table.timestamps(true, true)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("tables");
};
