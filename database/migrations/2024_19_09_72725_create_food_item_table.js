const Migration = require('mysql2-migration/lib/Migration')

module.exports = new class extends Migration
{
    up = async () => {
        return await this.createTable('IF NOT EXISTS food_item',
            this.id().autoincrement(),
            this.unsignedBigInt('food_id'),
            this.foreign('food_id').references('id').on('food').onDelete('cascade'),
            this.bigInt('amount'),
            this.unsignedBigInt('fridge_id'),
            this.foreign('fridge_id').references('id').on('fridge').onDelete('cascade'),
            this.unsignedBigInt('user_id'),
            this.foreign('user_id').references('id').on('user').onDelete('cascade')
        )
    }
    
    down = async () => {
        return await this.dropTable('IF EXISTS food_item')
    }
}