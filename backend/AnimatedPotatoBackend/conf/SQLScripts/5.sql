# --- !Ups
CREATE TABLE participant
(
  id bigserial NOT NULL,
  username character varying(255) NOT NULL,
  name character varying(255) NOT NULL,
  lastname character varying(255) NOT NULL,
  email character varying(255) NOT NULL,
  phone character varying(255) NOT NULL,
  photo character varying(255),
  website character varying(255),
  notes character varying(255),
  CONSTRAINT participant_pkey PRIMARY KEY (id),
  CONSTRAINT participant_email_constraint UNIQUE (email)
)
WITH (
OIDS=FALSE
);
ALTER TABLE participant
  OWNER TO postgres;

-- DROP TABLE IF EXISTS participant;
