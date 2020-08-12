CREATE TABLE thingful_things (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  image TEXT,
  title TEXT NOT NULL,
  content TEXT,
  date_created TIMESTAMPTZ DEFAULT now() NOT NULL
);
