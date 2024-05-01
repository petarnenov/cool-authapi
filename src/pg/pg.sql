CREATE TABLE USERS(
    ID UUID DEFAULT GEN_RANDOM_UUID(),
    USERNAME VARCHAR(30) NOT NULL UNIQUE,
    PASSWORD VARCHAR NOT NULL,
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ACTIVE BOOLEAN DEFAULT TRUE,
    ADMIN BOOLEAN DEFAULT FALSE,
    ROLES INT[] DEFAULT ARRAY[200]::INT[],
    PRIMARY KEY(ID)
);

INSERT INTO USERS(
    USERNAME,
    PASSWORD
) VALUES(
    $1,
    $2
);