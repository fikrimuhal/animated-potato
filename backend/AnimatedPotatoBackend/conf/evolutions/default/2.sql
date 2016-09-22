# --- !Ups
DROP TABLE IF EXISTS answer;
CREATE TABLE answer
(
  id bigserial NOT NULL,
  userid bigint,
  interviewId bigint NOT NULL,
  email character VARYING(255),
  questionid bigint NOT NULL,
  answer boolean NOT NULL,
  isdeleted BOOLEAN NOT NULL DEFAULT false,
  CONSTRAINT answer_pkey PRIMARY KEY (id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE answer
  OWNER TO postgres;

create index answer_index ON answer (id, interviewId)
