-- Drop existing tables in correct dependency order
DROP TABLE IF EXISTS query_log, entities, summaries, chunks, projects CASCADE;

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS vector;

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create chunks table
CREATE TABLE IF NOT EXISTS chunks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    embedding VECTOR(384),
    metadata JSONB,
    chunk_index INT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create summaries table
CREATE TABLE IF NOT EXISTS summaries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    embedding VECTOR(384),
    level INT NOT NULL,
    child_chunks UUID[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create entities table
CREATE TABLE IF NOT EXISTS entities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT,
    citations UUID[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create query_log table
CREATE TABLE IF NOT EXISTS query_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    user_query TEXT NOT NULL,
    constructed_prompt TEXT NOT NULL,
    model_used TEXT,
    response TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_chunks_project ON chunks(project_id);
CREATE INDEX IF NOT EXISTS idx_chunks_embedding ON chunks USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX IF NOT EXISTS idx_summaries_project ON summaries(project_id);
CREATE INDEX IF NOT EXISTS idx_summaries_level ON summaries(project_id, level);
CREATE INDEX IF NOT EXISTS idx_entities_project ON entities(project_id);
CREATE INDEX IF NOT EXISTS idx_entities_type ON entities(project_id, type);
CREATE INDEX IF NOT EXISTS idx_query_log_project ON query_log(project_id);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE chunks ENABLE ROW LEVEL SECURITY;
ALTER TABLE summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE entities ENABLE ROW LEVEL SECURITY;
ALTER TABLE query_log ENABLE ROW LEVEL SECURITY;

-- Insert dummy data
INSERT INTO projects (name) VALUES 
('Research Paper Analysis'),
('Company Documentation'),
('Legal Case Review');

INSERT INTO chunks (project_id, content, chunk_index, metadata) VALUES 
((SELECT id FROM projects WHERE name = 'Research Paper Analysis'), 'This is the first chunk of research content discussing machine learning advancements.', 1, '{"source": "research_paper.pdf", "page": 1}'),
((SELECT id FROM projects WHERE name = 'Company Documentation'), 'Company policies regarding data privacy and security protocols.', 1, '{"source": "employee_handbook.docx", "section": "Privacy"}'),
((SELECT id FROM projects WHERE name = 'Legal Case Review'), 'Initial case summary outlining the key legal arguments and precedents.', 1, '{"source": "case_file.pdf", "case_number": "2024-001"}');

INSERT INTO summaries (project_id, content, level, child_chunks) VALUES 
((SELECT id FROM projects WHERE name = 'Research Paper Analysis'), 'Summary of machine learning research findings and methodologies.', 1, ARRAY[(SELECT id FROM chunks WHERE chunk_index = 1 AND project_id = (SELECT id FROM projects WHERE name = 'Research Paper Analysis'))]::UUID[]),
((SELECT id FROM projects WHERE name = 'Company Documentation'), 'Overview of company data protection policies and procedures.', 1, ARRAY[(SELECT id FROM chunks WHERE chunk_index = 1 AND project_id = (SELECT id FROM projects WHERE name = 'Company Documentation'))]::UUID[]),
((SELECT id FROM projects WHERE name = 'Legal Case Review'), 'High-level summary of legal arguments and case background.', 1, ARRAY[(SELECT id FROM chunks WHERE chunk_index = 1 AND project_id = (SELECT id FROM projects WHERE name = 'Legal Case Review'))]::UUID[]);

INSERT INTO entities (project_id, name, type, description) VALUES 
((SELECT id FROM projects WHERE name = 'Research Paper Analysis'), 'Machine Learning', 'CONCEPT', 'Field of study focused on algorithms and statistical models'),
((SELECT id FROM projects WHERE name = 'Company Documentation'), 'Data Privacy', 'POLICY', 'Company guidelines for handling sensitive information'),
((SELECT id FROM projects WHERE name = 'Legal Case Review'), 'Plaintiff', 'PARTY', 'The party initiating the legal action');

INSERT INTO query_log (project_id, user_query, constructed_prompt, model_used, response) VALUES 
((SELECT id FROM projects WHERE name = 'Research Paper Analysis'), 'What are the key findings?', 'Based on the research content, summarize the key findings about machine learning.', 'gemini-pro', 'The research discusses recent advancements in machine learning algorithms and their applications.'),
((SELECT id FROM projects WHERE name = 'Company Documentation'), 'What are the data privacy policies?', 'Explain the company data privacy policies mentioned in the documentation.', 'gemini-pro', 'The company has strict data privacy protocols focusing on security and compliance.'),
((SELECT id FROM projects WHERE name = 'Legal Case Review'), 'What are the main legal arguments?', 'Describe the primary legal arguments presented in the case review.', 'gemini-pro', 'The case presents arguments based on precedent and statutory interpretation.');