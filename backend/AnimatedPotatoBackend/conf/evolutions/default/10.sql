# --- !Ups
DROP TABLE  IF EXISTS interview;
CREATE TABLE interview
(
  id bigserial NOT NULL,
  email character varying(255) NOT NULL,
  hasfinished boolean NOT NULL,
  start_date TIMESTAMP not null,
  end_date  TIMESTAMP,
  average_score double PRECISION,
  CONSTRAINT interview_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE interview
  OWNER TO postgres;

create index interview_index ON interview (id, email)
