const Migration = require('mysql2-migration/lib/Migration')

module.exports = new class extends Migration
{
    up = async () => {
        return await this.createTable('IF NOT EXISTS fridge',
            this.id().autoincrement(),
            this.string('name', 128),
            this.unsignedBigInt('user_id'),
            this.foreign('user_id').references('id').on('user').onDelete('cascade'),
        )
    }
    
    down = async () => {
        return await this.dropTable('fridge')
    }
}