
import sqlite3 from 'sqlite3';
sqlite3.verbose();

const db = new sqlite3.Database('./Master.db');

db.serialize(() => {
    // Create posts Table
    db.run(`CREATE TABLE IF NOT EXISTS posts (
        post_id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        subtitle TEXT,
        category_id INTEGER,
        image VARCHAR(255),
        content TEXT,
        meta_title TEXT,
        meta_description TEXT,
        published_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categorys(category_id) ON DELETE CASCADE
    )`);

    // Create Category Table
    db.run(`CREATE TABLE IF NOT EXISTS categorys (
        category_id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_name TEXT,
        category_image VARCHAR
    )`);

    // create Trending Table
    db.run(`CREATE TABLE IF NOT EXISTS trendings (
        trending_id INTEGER PRIMARY KEY AUTOINCREMENT,
        post_id INTEGER,
        FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE
    )`);

    db.run(`CREATE TRIGGER IF NOT EXISTS delete_posts_on_category_delete
        AFTER DELETE ON categorys
        FOR EACH ROW
        BEGIN
            DELETE FROM posts WHERE category_id = OLD.category_id;
        END;
        `)
});


export default db;