const up =
    `CREATE TABLE users ( 
        id INT UNSIGNED NOT NULL AUTO_INCREMENT, 
        uuid VARCHAR(50) NOT NULL, 
        username varchar(100) not null,
        password varchar(250) not null,
        created_at DATETIME NOT NULL, 
        updated_at DATETIME NOT NULL,
        deleted_at DATETIME NULL,
        PRIMARY KEY (id),
        UNIQUE INDEX uuid_UNIQUE (uuid ASC));`;

const down = `DROP TABLE users;`;

export = { up, down }