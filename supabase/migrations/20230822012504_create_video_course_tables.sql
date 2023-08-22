create table "public"."Course" (
    "id" uuid not null,
    "name" text,
    "description" text,
    "slug" text,
    "authorId" uuid,
    "published" boolean default false
);


alter table "public"."Course" enable row level security;

create table "public"."Lesson" (
    "id" uuid not null default gen_random_uuid(),
    "name" text,
    "description" text,
    "slug" text,
    "courseId" uuid
);


alter table "public"."Lesson" enable row level security;

create table "public"."Video" (
    "id" uuid not null default gen_random_uuid(),
    "lessonId" uuid,
    "ownerId" uuid,
    "uploadId" text,
    "publickPlaybackId" text,
    "privatePlaybackId" text,
    "duration" real,
    "aspectRatio" text,
    "status" text default 'preparing'::text,
    "posterTime" real
);


alter table "public"."Video" enable row level security;

create table "public"."userLessonProgress" (
    "userId" uuid,
    "lessonId" uuid,
    "completedAt" timestamp with time zone default now(),
    "id" uuid not null default gen_random_uuid()
);


alter table "public"."userLessonProgress" enable row level security;

alter table "public"."profiles" add column "isAdmin" boolean not null default false;

CREATE UNIQUE INDEX "Course_pkey" ON public."Course" USING btree (id);

CREATE UNIQUE INDEX "Lesson_pkey" ON public."Lesson" USING btree (id);

CREATE UNIQUE INDEX "Video_pkey" ON public."Video" USING btree (id);

CREATE UNIQUE INDEX "Video_uploadId_key" ON public."Video" USING btree ("uploadId");

CREATE UNIQUE INDEX "userLessonProgress_pkey" ON public."userLessonProgress" USING btree (id);

alter table "public"."Course" add constraint "Course_pkey" PRIMARY KEY using index "Course_pkey";

alter table "public"."Lesson" add constraint "Lesson_pkey" PRIMARY KEY using index "Lesson_pkey";

alter table "public"."Video" add constraint "Video_pkey" PRIMARY KEY using index "Video_pkey";

alter table "public"."userLessonProgress" add constraint "userLessonProgress_pkey" PRIMARY KEY using index "userLessonProgress_pkey";

alter table "public"."Course" add constraint "Course_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."Course" validate constraint "Course_authorId_fkey";

alter table "public"."Video" add constraint "Video_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"(id) ON DELETE CASCADE not valid;

alter table "public"."Video" validate constraint "Video_lessonId_fkey";

alter table "public"."Video" add constraint "Video_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."Video" validate constraint "Video_ownerId_fkey";

alter table "public"."Video" add constraint "Video_uploadId_key" UNIQUE using index "Video_uploadId_key";

alter table "public"."userLessonProgress" add constraint "userLessonProgress_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "Lesson"(id) ON DELETE CASCADE not valid;

alter table "public"."userLessonProgress" validate constraint "userLessonProgress_lessonId_fkey";

alter table "public"."userLessonProgress" add constraint "userLessonProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES profiles(id) ON DELETE CASCADE not valid;

alter table "public"."userLessonProgress" validate constraint "userLessonProgress_userId_fkey";


