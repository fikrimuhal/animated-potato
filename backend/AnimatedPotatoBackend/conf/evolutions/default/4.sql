# --- !Ups
DROP TABLE IF EXISTS questionoption;
CREATE TABLE questionoption
(
  id bigserial NOT NULL,
  title character varying(255) NOT NULL,
  weight double precision NOT NULL,
  questionid bigint not null,
  CONSTRAINT questionoption_pkey PRIMARY KEY (id)

)
WITH (
  OIDS=FALSE
);
ALTER TABLE questionoption
  OWNER TO postgres;

-- DROP TABLE IF EXISTS questionoption;