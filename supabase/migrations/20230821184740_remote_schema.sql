CREATE TRIGGER "on_auth.users_insert" AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION insert_profile_for_new_user();


