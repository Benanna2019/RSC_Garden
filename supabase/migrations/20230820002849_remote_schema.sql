
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE SCHEMA IF NOT EXISTS "next_auth";

ALTER SCHEMA "next_auth" OWNER TO "postgres";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "next_auth"."uid"() RETURNS "uuid"
    LANGUAGE "sql" STABLE
    AS $$
  select
    coalesce(
        nullif(current_setting('request.jwt.claim.sub', true), ''),
        (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
    )::uuid
$$;

ALTER FUNCTION "next_auth"."uid"() OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."increment_article_view"("slug" "text", "inc_amt" integer) RETURNS "void"
    LANGUAGE "sql" SECURITY DEFINER
    AS $_$create function increment_view (slug text, inc_amt int) 
returns void as
$$
  update views 
  set views_count = views_count + inc_amt
  where slug = slug
$$ 
language sql volatile;$_$;

ALTER FUNCTION "public"."increment_article_view"("slug" "text", "inc_amt" integer) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."increment_post_view"("slug" "text", "inc_amt" integer) RETURNS "void"
    LANGUAGE "sql"
    AS $$
  update views 
  set views_count = views_count + inc_amt
  where slug = slug
$$;

ALTER FUNCTION "public"."increment_post_view"("slug" "text", "inc_amt" integer) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."increment_post_view"("slug" character varying, "inc_amt" integer) RETURNS "void"
    LANGUAGE "sql"
    AS $$
  update views 
  set views_count = views_count + inc_amt
  where slug = slug
$$;

ALTER FUNCTION "public"."increment_post_view"("slug" character varying, "inc_amt" integer) OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."increment_post_views"("slug" "text") RETURNS "void"
    LANGUAGE "plpgsql"
    AS $$
begin
  -- Check if the row exists
  if exists(select * from views where id = increment_post_views.slug) then
    -- If the row exists, increment the views column by 1
    update views set views_count = views_count + 1 where id = increment_post_views.slug;
  else
    -- If the row does not exist, create a new row with views = 1
    insert into views(id, views_count) values (increment_post_views.slug, 1);
  end if;
end;
$$;

ALTER FUNCTION "public"."increment_post_views"("slug" "text") OWNER TO "postgres";

CREATE OR REPLACE FUNCTION "public"."insert_profile_for_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    AS $$begin
  insert into public.profiles(id, name, username, email, avatar_url)
  values(
    new.id,
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'user_name',
    new.raw_user_meta_data->>'email',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;$$;

ALTER FUNCTION "public"."insert_profile_for_new_user"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "next_auth"."accounts" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "type" "text" NOT NULL,
    "provider" "text" NOT NULL,
    "providerAccountId" "text" NOT NULL,
    "refresh_token" "text",
    "access_token" "text",
    "expires_at" bigint,
    "token_type" "text",
    "scope" "text",
    "id_token" "text",
    "session_state" "text",
    "oauth_token_secret" "text",
    "oauth_token" "text",
    "userId" "uuid"
);

ALTER TABLE "next_auth"."accounts" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "next_auth"."sessions" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "expires" timestamp with time zone NOT NULL,
    "sessionToken" "text" NOT NULL,
    "userId" "uuid"
);

ALTER TABLE "next_auth"."sessions" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "next_auth"."users" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "name" "text",
    "email" "text",
    "emailVerified" timestamp with time zone,
    "image" "text"
);

ALTER TABLE "next_auth"."users" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "next_auth"."verification_tokens" (
    "identifier" "text",
    "token" "text" NOT NULL,
    "expires" timestamp with time zone NOT NULL
);

ALTER TABLE "next_auth"."verification_tokens" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."comments" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone,
    "content" "text" NOT NULL,
    "post_id" "text" NOT NULL,
    "author_id" "uuid" NOT NULL
);

ALTER TABLE "public"."comments" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "username" "text" NOT NULL,
    "email" "text" NOT NULL,
    "avatar_url" "text" NOT NULL
);

ALTER TABLE "public"."profiles" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."views" (
    "id" "text" NOT NULL,
    "views_count" bigint DEFAULT '0'::bigint NOT NULL
);

ALTER TABLE "public"."views" OWNER TO "postgres";

ALTER TABLE ONLY "next_auth"."accounts"
    ADD CONSTRAINT "accounts_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "next_auth"."users"
    ADD CONSTRAINT "email_unique" UNIQUE ("email");

ALTER TABLE ONLY "next_auth"."accounts"
    ADD CONSTRAINT "provider_unique" UNIQUE ("provider", "providerAccountId");

ALTER TABLE ONLY "next_auth"."sessions"
    ADD CONSTRAINT "sessions_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "next_auth"."sessions"
    ADD CONSTRAINT "sessiontoken_unique" UNIQUE ("sessionToken");

ALTER TABLE ONLY "next_auth"."verification_tokens"
    ADD CONSTRAINT "token_identifier_unique" UNIQUE ("token", "identifier");

ALTER TABLE ONLY "next_auth"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "next_auth"."verification_tokens"
    ADD CONSTRAINT "verification_tokens_pkey" PRIMARY KEY ("token");

ALTER TABLE ONLY "public"."comments"
    ADD CONSTRAINT "comments_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."views"
    ADD CONSTRAINT "views_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."views"
    ADD CONSTRAINT "views_slug_key" UNIQUE ("id");

ALTER TABLE ONLY "next_auth"."accounts"
    ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "next_auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "next_auth"."sessions"
    ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "next_auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."comments"
    ADD CONSTRAINT "comments_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "public"."profiles"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

CREATE POLICY "Allow users to comment " ON "public"."comments" FOR INSERT TO "authenticated" WITH CHECK (("author_id" = "auth"."uid"()));

CREATE POLICY "Enable update for users " ON "public"."comments" FOR UPDATE TO "authenticated" USING (("author_id" = "auth"."uid"())) WITH CHECK (("author_id" = "auth"."uid"()));

CREATE POLICY "User can delete their item " ON "public"."comments" FOR DELETE TO "authenticated" USING (("author_id" = "auth"."uid"()));

CREATE POLICY "allow all guests to read posts and comments" ON "public"."comments" FOR SELECT USING (true);

ALTER TABLE "public"."comments" ENABLE ROW LEVEL SECURITY;

CREATE POLICY "enable read access for profiles on comments" ON "public"."profiles" FOR SELECT USING (true);

ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "next_auth" TO "service_role";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."increment_article_view"("slug" "text", "inc_amt" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."increment_article_view"("slug" "text", "inc_amt" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."increment_article_view"("slug" "text", "inc_amt" integer) TO "service_role";

GRANT ALL ON FUNCTION "public"."increment_post_view"("slug" "text", "inc_amt" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."increment_post_view"("slug" "text", "inc_amt" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."increment_post_view"("slug" "text", "inc_amt" integer) TO "service_role";

GRANT ALL ON FUNCTION "public"."increment_post_view"("slug" character varying, "inc_amt" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."increment_post_view"("slug" character varying, "inc_amt" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."increment_post_view"("slug" character varying, "inc_amt" integer) TO "service_role";

GRANT ALL ON FUNCTION "public"."increment_post_views"("slug" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."increment_post_views"("slug" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."increment_post_views"("slug" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."insert_profile_for_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."insert_profile_for_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."insert_profile_for_new_user"() TO "service_role";

GRANT ALL ON TABLE "next_auth"."accounts" TO "service_role";

GRANT ALL ON TABLE "next_auth"."sessions" TO "service_role";

GRANT ALL ON TABLE "next_auth"."users" TO "service_role";

GRANT ALL ON TABLE "next_auth"."verification_tokens" TO "service_role";

GRANT ALL ON TABLE "public"."comments" TO "anon";
GRANT ALL ON TABLE "public"."comments" TO "authenticated";
GRANT ALL ON TABLE "public"."comments" TO "service_role";

GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";

GRANT ALL ON TABLE "public"."views" TO "anon";
GRANT ALL ON TABLE "public"."views" TO "authenticated";
GRANT ALL ON TABLE "public"."views" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
