-- ==========================================
-- AL-AWWAL PANDOGARI ECOSYSTEM
-- CORE TEAM DATABASE
-- POSTGRESQL + SEQUELIZE READY
-- ==========================================


CREATE TABLE IF NOT EXISTS teams (

id SERIAL PRIMARY KEY,

team_name VARCHAR(100)
UNIQUE NOT NULL,

description TEXT,

createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);



INSERT INTO teams
(team_name,description)

VALUES

(
'PI CORE TEAM',
'Pi ecosystem development, management and innovation team'
),

(
'SIDRA CORE TEAM',
'Sidra ecosystem contribution and community team'
)

ON CONFLICT(team_name)
DO NOTHING;




-- ==========================
-- ADMINS
-- ==========================


CREATE TABLE IF NOT EXISTS admins (

id SERIAL PRIMARY KEY,


username VARCHAR(100)
UNIQUE NOT NULL,


email VARCHAR(150)
UNIQUE NOT NULL,


password_hash TEXT NOT NULL,


role VARCHAR(50)
DEFAULT 'ADMIN',


createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);






-- ==========================
-- CORE TEAM APPLICATIONS
-- ==========================


CREATE TABLE IF NOT EXISTS core_team_applications (

id SERIAL PRIMARY KEY,


application_id VARCHAR(50)
UNIQUE NOT NULL,


full_name VARCHAR(150)
NOT NULL,


date_of_birth DATE,


gender VARCHAR(20),


country VARCHAR(100),


state VARCHAR(100),


address TEXT,


phone VARCHAR(30),


email VARCHAR(150),


team_id INTEGER
REFERENCES teams(id),


team_username VARCHAR(100),


username_type VARCHAR(50),


preferred_role VARCHAR(100),


skills TEXT,


experience TEXT,


contribution TEXT,


selfie_url TEXT,


identity_document_url TEXT,


next_of_kin JSONB,


application_status VARCHAR(30)
DEFAULT 'Pending',


admin_note TEXT,


createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);






-- ==========================
-- OFFICIAL MEMBERS
-- ==========================


CREATE TABLE IF NOT EXISTS official_members (

id SERIAL PRIMARY KEY,


member_id VARCHAR(50)
UNIQUE NOT NULL,


application_id INTEGER
NOT NULL
REFERENCES core_team_applications(id)
ON DELETE CASCADE,


full_name VARCHAR(150)
NOT NULL,


team_id INTEGER
REFERENCES teams(id),


username VARCHAR(100),


role VARCHAR(100),


selfie_url TEXT,


status VARCHAR(50)
DEFAULT 'ACTIVE',


createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);







-- ==========================
-- APPLICATION LOGS
-- ==========================


CREATE TABLE IF NOT EXISTS application_logs (

id SERIAL PRIMARY KEY,


application_id INTEGER
NOT NULL
REFERENCES core_team_applications(id)
ON DELETE CASCADE,


admin_id INTEGER
NOT NULL
REFERENCES admins(id),


action VARCHAR(100)
NOT NULL,


note TEXT,


createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);







-- ==========================
-- MEMBER ACTIVITY
-- ==========================


CREATE TABLE IF NOT EXISTS member_activity (

id SERIAL PRIMARY KEY,


member_id INTEGER
REFERENCES official_members(id)
ON DELETE CASCADE,


activity TEXT NOT NULL,


createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);







-- ==========================
-- VERIFICATION LOGS
-- ==========================


CREATE TABLE IF NOT EXISTS verification_logs (

id SERIAL PRIMARY KEY,


member_id INTEGER
REFERENCES official_members(id)
ON DELETE CASCADE,


ip_address VARCHAR(100),


verified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);







-- ==========================
-- DIGITAL CARDS
-- ==========================


CREATE TABLE IF NOT EXISTS digital_cards (

id SERIAL PRIMARY KEY,


member_id INTEGER
REFERENCES official_members(id)
ON DELETE CASCADE,


qr_code TEXT,


card_url TEXT,


createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);







-- ==========================
-- INDEXES
-- ==========================


CREATE INDEX IF NOT EXISTS idx_application_status

ON core_team_applications(application_status);



CREATE INDEX IF NOT EXISTS idx_application_team

ON core_team_applications(team_id);



CREATE INDEX IF NOT EXISTS idx_member_team

ON official_members(team_id);



CREATE INDEX IF NOT EXISTS idx_member_status

ON official_members(status);