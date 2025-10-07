import spacy
from spacy.matcher import PhraseMatcher
from flask import Flask, request, jsonify

# Load the spaCy model
nlp = spacy.load("en_core_web_sm")

# (The SKILL_DB list remains the same as before)
SKILL_DB = [
    'react', 'react.js', 'angular', 'vue.js', 'svelte', 'redux',
    'javascript', 'typescript', 'ecmascript', 'es6',
    'python', 'java', 'c++', 'c#', 'golang', 'rust', 'php', 'ruby', 'swift', 'kotlin',
    'node.js', 'nodejs', 'express.js', 'django', 'flask', 'ruby on rails', 'asp.net',
    'html', 'html5', 'css', 'css3', 'scss', 'sass', 'less', 'bootstrap', 'tailwind',
    'sql', 'mysql', 'postgresql', 'microsoft sql server', 'mongodb', 'redis', 'nosql', 'dynamodb', 'firebase',
    'rest', 'restful api', 'graphql', 'api', 'jwt', 'oauth',
    'docker', 'kubernetes', 'k8s', 'aws', 'azure', 'google cloud platform', 'gcp', 'terraform', 'ansible', 'ci/cd', 'jenkins', 'github actions',
    'git', 'github', 'gitlab', 'jira', 'confluence', 'agile', 'scrum', 'kanban',
    'machine learning', 'deep learning', 'tensorflow', 'pytorch', 'keras', 'scikit-learn', 'pandas', 'numpy', 'matplotlib',
    'data analysis', 'data visualization', 'data science', 'natural language processing', 'nlp', 'computer vision',
    'linux', 'bash', 'shell scripting', 'powershell',
    'cybersecurity', 'penetration testing', 'encryption',
    'webpack', 'babel', 'vite',
    'junit', 'jest', 'cypress', 'selenium', 'playwright'
]


# Initialize the PhraseMatcher
matcher = PhraseMatcher(nlp.vocab, attr='LOWER')
patterns = [nlp.make_doc(text) for text in SKILL_DB]
matcher.add("SKILL_MATCHER", patterns)

app = Flask(__name__)

# This endpoint is for processing RESUMES
@app.route('/extract', methods=['POST'])
def extract_entities():
    # ... (This function remains exactly the same as before) ...
    try:
        data = request.json
        text = data['text']
        doc = nlp(text)
        
        extracted_skills = set()
        matches = matcher(doc)
        for match_id, start, end in matches:
            span = doc[start:end]
            extracted_skills.add(span.text.lower())

        for chunk in doc.noun_chunks:
            if 1 <= len(chunk.text.split()) <= 3:
                if chunk.text.lower() not in ['summary', 'experience', 'education', 'contact', 'responsibilities', 'project']:
                    extracted_skills.add(chunk.text.lower())
        
        name = "Unknown Candidate"
        for ent in doc.ents:
            if ent.label_ == "PERSON":
                name = ent.text
                break

        final_skills = list(set(skill.strip() for skill in extracted_skills))
        
        return jsonify({ "name": name, "skills": final_skills })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# NEW: This endpoint is specifically for processing JOB DESCRIPTIONS
@app.route('/analyze_jd', methods=['POST'])
def analyze_jd():
    try:
        data = request.json
        if not data or 'text' not in data:
            return jsonify({"error": "No text provided"}), 400

        text = data['text']
        doc = nlp(text)
        
        # Use only the precise PhraseMatcher for JDs to avoid noise
        matches = matcher(doc)
        extracted_skills = set()
        for match_id, start, end in matches:
            span = doc[start:end]
            extracted_skills.add(span.text.lower())
        
        return jsonify({ "skills": list(extracted_skills) })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5002, debug=True)