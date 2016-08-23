# --- !Ups
CREATE TABLE category
(
  id bigserial NOT NULL,
  category character varying(255) NOT NULL,
  CONSTRAINT category_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE category
  OWNER TO postgres;

-- DROP TABLE IF EXISTS category