CREATE TABLE "todo_app" (
	id SERIAL PRIMARY KEY,
	"task" varchar(255),
	"completed" boolean
);

INSERT INTO todo_app ( "task", "completed" )
VALUES
	('get haircut', false);
	

SELECT * FROM "todo_app";