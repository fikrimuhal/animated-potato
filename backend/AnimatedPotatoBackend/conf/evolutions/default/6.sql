# --- !Ups

DROP TABLE IF EXISTS users;

CREATE TABLE users
(
  id          BIGSERIAL              NOT NULL,
  password    CHARACTER VARYING(255) NOT NULL,
  email       CHARACTER VARYING(255) NOT NULL,
  isadmin     BOOLEAN                NOT NULL,
  ispersonnel BOOLEAN                NOT NULL,
  isdeleted   BOOLEAN                NOT NULL DEFAULT FALSE,
  CONSTRAINT users_pkey PRIMARY KEY (id)
)
WITH (
OIDS = FALSE
);

ALTER TABLE users
  OWNER TO postgres;

CREATE INDEX users_index
  ON users (id, email)

