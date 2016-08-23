# --- !Ups
CREATE TABLE users
(
  id bigserial NOT NULL,
  username character varying(255) NOT NULL,
  password character varying(255) NOT NULL,
  isadmin boolean,
  CONSTRAINT users_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE users
  OWNER TO postgres;

-- DROP TABLE IF EXISTS users;