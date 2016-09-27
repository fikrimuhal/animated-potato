# --- !Ups
DROP TABLE IF EXISTS score;
CREATE TABLE score
(
  interviewid bigint NOT NULL,
  categoryid  bigint NOT NULL,
  score double precision not null,
  confidence double precision not null
)
WITH (
  OIDS=FALSE
);
ALTER TABLE score
  OWNER TO postgres;

create index score_index ON score (interviewid, categoryid)
