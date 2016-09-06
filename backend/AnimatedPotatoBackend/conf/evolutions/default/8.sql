# --- !Ups
DROP TABLE  IF EXISTS collection;
DROP TABLE  IF EXISTS sets;
CREATE TABLE collection
(
  id bigserial NOT NULL,
  title character varying(255) NOT NULL,
  isdefaultset boolean not null,
  isdeleted BOOLEAN NOT NULL DEFAULT false
)
WITH (
  OIDS=FALSE
);
ALTER TABLE collection
  OWNER TO postgres;