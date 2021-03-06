# --- !Ups
DROP TABLE IF EXISTS question;
CREATE TABLE question
(
  id bigserial NOT NULL,
  title character varying(255) NOT NULL,
  qtype character varying(255) NOT NULL,
  CONSTRAINT question_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE question
  OWNER TO postgres;

create index question_index ON question (id)

-- DROP TABLE IF EXISTS question;