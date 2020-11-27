'use strict';

exports.up = function (db) {
  const query = `
CREATE TABLE users (
  "id" serial,
  "email" text NOT NULL,
  "password_hash" text NOT NULL,
  "created_time" timestamp(6) with time zone NOT NULL DEFAULT now(),
  "updated_time" timestamp(6) with time zone NOT NULL DEFAULT now(),
  PRIMARY KEY ("id")
);

CREATE OR REPLACE FUNCTION auto_update() RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_time = NOW();
  RETURN NEW;
END;
$$ LANGUAGE PLPGSQL;

CREATE TRIGGER trigger_set_timestamp
BEFORE
UPDATE ON users
FOR EACH ROW EXECUTE PROCEDURE auto_update();
`;
  return db.runSql(query);
};

exports.down = function (db) {
  const query = `
DROP TABLE IF EXISTS users;
`;
  return db.runSql(query);
};

exports._meta = {
  version: 1,
};
