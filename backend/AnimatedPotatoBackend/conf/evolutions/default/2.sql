# --- !Ups
DROP TABLE IF EXISTS answer;
CREATE TABLE answer
(
  id bigserial NOT NULL,
  username character varying(255) NOT NULL,
  questionid bigint NOT NULL,
  answer boolean NOT NULL,
  userid bigint,
  CONSTRAINT answer_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE answer
  OWNER TO postgres;
-- DROP TABLE IF EXISTS answer;