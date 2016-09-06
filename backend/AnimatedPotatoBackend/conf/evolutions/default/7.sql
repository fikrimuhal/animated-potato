# --- !Ups
DROP TABLE  IF EXISTS questioncategory;
CREATE TABLE questioncategory
(
  questionid bigint NOT NULL,
  categoryid bigint NOT NULL,
  weight double precision
)
WITH (
  OIDS=FALSE
);
ALTER TABLE questioncategory
  OWNER TO postgres;

-- DROP TABLE  IF EXISTS questioncategory;