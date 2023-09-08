insert into auth.users (
    id,
    instance_id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    invited_at,
    confirmation_token,
    confirmation_sent_at,
    recovery_token,
    recovery_sent_at,
    email_change_token_new,
    email_change,
    email_change_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    created_at,
    updated_at,
    phone,
    phone_confirmed_at,
    phone_change,
    phone_change_token,
    phone_change_sent_at,
    email_change_token_current,
    email_change_confirm_status,
    banned_until,
    reauthentication_token,
    reauthentication_sent_at
  )
  values (
    'e3a1bddb-ebae-4ec8-8eaa-68ea8d4c517f'::uuid,
    '00000000-0000-0000-0000-000000000000'::uuid,
    'authenticated',
    'authenticated',
    'rickard@lindahl.app',
    crypt('password123', gen_salt('bf')),
    now(),
    null::timestamp,
    '',
    null::timestamp,
    '',
    null::timestamp,
    '',
    '',
    null::timestamp,
    now()::timestamp,
    '{"provider":"email","providers":["email"]}'::jsonb,
    '{}'::jsonb,
    0::boolean,
    '2022-10-04 03:41:27.391146+00'::timestamp,
    '2022-10-04 03:41:27.391146+00'::timestamp,
    null,
    null::timestamp,
    '',
    '',
    null::timestamp,
    '',
    0,
    null::timestamp,
    '',
    null::timestamp
  );

  insert into auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    created_at,
    updated_at
  )
  values (
    'e3a1bddb-ebae-4ec8-8eaa-68ea8d4c517f'::uuid,
    'e3a1bddb-ebae-4ec8-8eaa-68ea8d4c517f'::uuid,
    '{"sub": "e3a1bddb-ebae-4ec8-8eaa-68ea8d4c517f"}'::jsonb,
    'email',
    now()::timestamp,
    now()::timestamp
  );

update public.profiles
set full_name = 'Rickard Lindahl'
where id = 'e3a1bddb-ebae-4ec8-8eaa-68ea8d4c517f';

insert into public.posts (
  user_id,
  updated_at,
  title,
  body,
  image,
  publish_date,
  id,
  draft,
  profile_id
)
values
(
  'e3a1bddb-ebae-4ec8-8eaa-68ea8d4c517f'::uuid,
  null::timestamp,
  'Bortforsling av ris',
  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Hej, Tack för en god insats i lördags. Dels är blir det fint och dels är det trevligt. Det ligger lite högar med ris och grenar som behöver forslas bort. Förslagsvis kan de som inte var med på städdagen i första hand ta sig an denna uppgift. Om man behöver låna ett släp så finns mitt tillgängligt från och med imorgon tisdag. Skicka bara ett mail till michael.doohan@outlook.com eller skriv på messenger innan så låser jag upp det. Min spännband sjunger på sista versen men funkar om man behöver låna."}]}]}'::json,
  null,
  '2022-05-23 11:30:43.476+00'::timestamp,
  gen_random_uuid()::uuid,
  false,
  'e3a1bddb-ebae-4ec8-8eaa-68ea8d4c517f'::uuid
),
(
  'e3a1bddb-ebae-4ec8-8eaa-68ea8d4c517f'::uuid,
  null,
  'Protokoll på hemsidan',
  '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Jag har haft problem med att kunna använda hemsidan eftersom min arbetsdator och den enda jag har haft att tillgå inte tillåter vissa hemsidor. Nu har jag däremot kommit runt problemet och kommer att lägga upp tidigare protokoll på hemsidan. /Michael C. Doohan"}]}]}',
  null,
  '2022-03-09 11:30:52.561+00'::timestamp,
  gen_random_uuid()::uuid,
  false,
  'e3a1bddb-ebae-4ec8-8eaa-68ea8d4c517f'::uuid
),
(
  'e3a1bddb-ebae-4ec8-8eaa-68ea8d4c517f'::uuid,
  null,
  'Städdag + sopning','{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Vi har kommit fram till att städdagen kommer att gå av stapeln 5/6 efter lunch. Det är såklart beroende av när folk äter lunch, men säg 13:00. Vill man så får man såklart börja tidigare. Gödsel är införskaffat och ligger i vindskyddet utanför nr. 29 så länge. Jag ska se till att det kommer bort ett antal säckar till andra gemensamhetsytan när det blir dags. Beträffande sopning så är det på gång. Vi kör sopning tillsammans med våra tre grannkvarter och de har nu gett klartecken, så det kommer att beställas den här veckan. Hälsingar, Michael C. Doohan"}]}]}',
  null,
  '2021-05-18 11:31:03.838+00'::timestamp,
  gen_random_uuid()::uuid,
  false,
  'e3a1bddb-ebae-4ec8-8eaa-68ea8d4c517f'::uuid
);
