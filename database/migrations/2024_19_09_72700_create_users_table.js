const Migration = require('mysql2-migration/lib/Migration')

module.exports = new class extends Migration
{
    up = async () => {
        return await this.createTable('IF NOT EXISTS user',
            this.id().autoincrement(),
            this.string('username', 128),
            this.string('password_hash', 256),
            this.string('email'),
            this.unique('email')
        )
    }
    
    down = async () => {
        return await this.dropTable('IF EXISTS user')
    }
}