# --- !Ups
DROP TABLE  IF EXISTS interview;
CREATE TABLE interview
(
  id bigserial NOT NULL,
  email character varying(255) NOT NULL,
  hasFinished boolean NOT NULL
)
WITH (
  OIDS=FALSE
);
ALTER TABLE interview
  OWNER TO postgres;