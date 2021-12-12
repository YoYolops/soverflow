CREATE TABLE "tags" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL UNIQUE,
	CONSTRAINT "tags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "questions" (
	"id" serial NOT NULL,
	"student" TEXT NOT NULL,
	"class" TEXT NOT NULL,
	"question" TEXT NOT NULL,
	"submit_at" timestamp with time zone NOT NULL DEFAULT 'NOW()',
	"answer_id" int,
	CONSTRAINT "questions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "tags_group" (
	"id" serial NOT NULL,
	"tag_id" int NOT NULL,
	"question_id" int NOT NULL,
	CONSTRAINT "tags_group_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "answers" (
	"id" serial NOT NULL,
	"answer" TEXT NOT NULL,
	"submit_at" timestamp with time zone NOT NULL DEFAULT 'NOW()',
	"submit_by" int NOT NULL,
	CONSTRAINT "answers_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	"token" uuid NOT NULL,
	"class_id" int NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "classes" (
	"id" serial NOT NULL,
	"name" TEXT NOT NULL,
	CONSTRAINT "classes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "questions" ADD CONSTRAINT "questions_fk0" FOREIGN KEY ("answer_id") REFERENCES "answers"("id");

ALTER TABLE "tags_group" ADD CONSTRAINT "tags_group_fk0" FOREIGN KEY ("tag_id") REFERENCES "tags"("id");
ALTER TABLE "tags_group" ADD CONSTRAINT "tags_group_fk1" FOREIGN KEY ("question_id") REFERENCES "questions"("id");

ALTER TABLE "answers" ADD CONSTRAINT "answers_fk0" FOREIGN KEY ("submit_by") REFERENCES "users"("id");

ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("class_id") REFERENCES "classes"("id");
