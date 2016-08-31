# --- !Ups
DROP TABLE  IF EXISTS sets;
CREATE TABLE sets
(
  id bigserial NOT NULL,
  title character varying(255) NOT NULL,
  isdefaultset boolean not null
)
WITH (
  OIDS=FALSE
);
ALTER TABLE sets
  OWNER TO postgres;