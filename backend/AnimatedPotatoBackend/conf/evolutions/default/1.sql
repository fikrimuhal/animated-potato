# --- !Ups
CREATE TABLE questioncategory
(
  questionid bigint NOT NULL,
  categoryid bigint NOT NULL,
  weight double precision,
  CONSTRAINT questioncategory_pkey PRIMARY KEY (questionid, categoryid),
  CONSTRAINT questioncategory_categoryid_fkey FOREIGN KEY (categoryid)
      REFERENCES category (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION,
  CONSTRAINT questioncategory_questionid_fkey FOREIGN KEY (questionid)
      REFERENCES question (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
)
WITH (
  OIDS=FALSE
);
ALTER TABLE questioncategory
  OWNER TO postgres;

-- DROP TABLE  IF EXISTS questioncategory;