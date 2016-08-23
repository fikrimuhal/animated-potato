# --- !Ups
CREATE TABLE question
(
  id bigserial NOT NULL,
  title character varying(255) NOT NULL,
  qtype character varying(255) NOT NULL,
  opts character varying(255) NOT NULL,
  setlist character varying(255) NOT NULL,
  CONSTRAINT question_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE question
  OWNER TO postgres;

-- DROP TABLE IF EXISTS question;