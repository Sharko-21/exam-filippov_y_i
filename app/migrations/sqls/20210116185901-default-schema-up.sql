/* Replace with your SQL commands */

CREATE SEQUENCE musician_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE IF NOT EXISTS musician (
    id BIGINT NOT NULL DEFAULT nextval('musician_id_seq'),
    name VARCHAR NOT NULL,
    date TIMESTAMP WITHOUT TIME ZONE,
    sex BOOL,
    description VARCHAR
);

CREATE UNIQUE INDEX IF NOT EXISTS musician_id_uidx ON musician(id);

CREATE TABLE IF NOT EXISTS ensemble_type (
    type VARCHAR NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS ensemble_type_uidx ON ensemble_type(type);

CREATE SEQUENCE ensemble_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE IF NOT EXISTS ensemble (
    id BIGINT NOT NULL DEFAULT nextval('ensemble_id_seq'),
    name VARCHAR NOT NULL,
    type VARCHAR NOT NULL REFERENCES ensemble_type(type) ON DELETE CASCADE
    description VARCHAR
);

CREATE UNIQUE INDEX IF NOT EXISTS ensemble_id_uidx ON ensemble(id);
CREATE UNIQUE INDEX IF NOT EXISTS ensemble_name_uidx ON ensemble(name);

CREATE SEQUENCE composition_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE IF NOT EXISTS composition (
    id BIGINT NOT NULL DEFAULT nextval('composition_id_seq'),
    name VARCHAR NOT NULL,
    date TIMESTAMP WITHOUT TIME ZONE,
    ensemble BIGINT NOT NULL REFERENCES ensemble(id) ON DELETE CASCADE,
    description VARCHAR
);

CREATE UNIQUE INDEX IF NOT EXISTS composition_id_uidx ON composition(id);