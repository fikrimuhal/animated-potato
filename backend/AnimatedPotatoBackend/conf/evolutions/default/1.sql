# --- !Ups
DROP TABLE IF EXISTS category;
CREATE TABLE category
(
  id bigserial NOT NULL,
  name character varying(255) NOT NULL,
  isdeleted BOOLEAN NOT NULL DEFAULT false,
  CONSTRAINT category_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE category
  OWNER TO postgres;

-- DROP TABLE IF EXISTS category