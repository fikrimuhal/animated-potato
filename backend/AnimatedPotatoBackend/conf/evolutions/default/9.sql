# --- !Ups
DROP TABLE  IF EXISTS questionset;
CREATE TABLE questionset
(
  questionid bigint NOT NULL,
  setid bigint NOT NULL
)
WITH (
  OIDS=FALSE
);
ALTER TABLE questionset
  OWNER TO postgres;