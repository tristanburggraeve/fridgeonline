const Migration = require('mysql2-migration/lib/Migration')

module.exports = new class extends Migration
{
    up = async () => {
        return await this.createTable('IF NOT EXISTS food',
            this.id().autoincrement(),
            this.string('name', 128),
            this.string('description', 512),
        )
    }
    
    down = async () => {
        return await this.dropTable('IF EXISTS food')
    }
}