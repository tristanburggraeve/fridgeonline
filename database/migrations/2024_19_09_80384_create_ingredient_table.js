const Migration = require('mysql2-migration/lib/Migration')

module.exports = new class extends Migration
{
    up = async () => {
        return await this.createTable('IF NOT EXISTS ingredient',
            this.id().autoincrement(),
            this.unsignedBigInt('food_id'),
            this.unsignedBigInt('recipe_id'),
            this.foreign('food_id').references('id').on('food').onDelete('cascade'),
            this.foreign('recipe_id').references('id').on('recipe').onDelete('cascade')
        )
    }
    
    down = async () => {
        return await this.dropTable('IF EXISTS ingredient')
    }
}