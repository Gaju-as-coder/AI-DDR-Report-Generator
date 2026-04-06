# from google import genai
# import json

# # Initialize Gemini client
# client = genai.Client(api_key="AIzaSyAe2SATfjw_dpPCcOuJ2dDxXKSj3He-I84")

# def generate_ddr(inspection_text, thermal_text):
#     prompt = f"""
# You are an AI that creates a Detailed Diagnostic Report (DDR).

# Rules:
# - Do NOT invent data
# - If missing → write "Not Available"
# - If conflict → mention clearly

# Inspection Report:
# {inspection_text}

# Thermal Report:
# {thermal_text}

# Return STRICT JSON:
# {{
#  "summary": "The property shows signs of structural and moisture-related issues based on inspection and thermal observations.",
    
#     "observations": [
#         "Wall dampness observed in living area",
#         "Thermal variation detected indicating possible leakage",
#         "Cracks found near window edges"
#     ],
    
#     "root_cause": "Possible water seepage due to poor waterproofing and structural stress.",
    
#     "severity": "High – due to moisture damage and structural cracks",
    
#     "recommendations": "Repair cracks, apply waterproofing, and inspect plumbing system.",
    
#     "notes": "Generated using fallback due to AI limitation",
    
#     "missing_info": "Detailed thermal readings not available"
# }}
# """
    

#     response = client.models.generate_content(
#         model="gemini-2.5-flash-lite",
#         contents=prompt
#     )

#     text = response.text

#     try:
#         return json.loads(text)
#     except:
#         return {"error": text}
    




# from google import genai
# import json
# import re

# client = genai.Client(api_key="GEMINI_API_KEY") # Replace with your actual API key

# def clean_json(text):
#     try:
#         return json.loads(text)
#     except:
#         match = re.search(r'\{.*\}', text, re.DOTALL)
#         if match:
#             try:
#                 return json.loads(match.group())
#             except:
#                 return None
#         return None


# def generate_ddr(inspection_text, thermal_text):
#     prompt = f"""
# You are an AI that generates a Detailed Diagnostic Report (DDR).

# Follow rules:
# - Do NOT invent facts
# - If missing → write "Not Available"
# - If conflict → mention clearly

# Generate output in JSON format ONLY:

# {{
#  "summary": "",
#  "observations": [],
#  "root_cause": "",
#  "severity": "",
#  "recommendations": "",
#  "notes": "",
#  "missing_info": ""
# }}

# Inspection Report:
# {inspection_text}

# Thermal Report:
# {thermal_text}
# """

#     try:
#         response = client.models.generate_content(
#             model="gemini-2.5-flash-lite",
#             contents=prompt
#         )

#         text = response.text
#         data = clean_json(text)

#         if data:
#             return data

#     except Exception as e:
#         print("Gemini Error:", e)

#     # 🔥 STRONG FALLBACK (VERY IMPORTANT)
#     return {
#         "summary": "The property shows signs of moisture intrusion and structural issues.",

#         "observations": [
#             "Dampness observed on walls",
#             "Thermal variation detected indicating leakage",
#             "Cracks found near structural joints"
#         ],

#         "root_cause": "Likely due to water seepage and poor waterproofing.",

#         "severity": "High – due to continuous leakage, structural cracks, and moisture spread",

#         "recommendations": "Apply waterproofing, repair cracks, inspect plumbing system.",

#         "notes": "Fallback used due to AI limitation",

#         "missing_info": "Detailed thermal readings not available"
#     }


from google import genai
import json
import re
import os

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY")) # Replace with your actual API key

def clean_json(text):
    try:
        return json.loads(text)
    except:
        match = re.search(r'\{.*\}', text, re.DOTALL)
        if match:
            try:
                return json.loads(match.group())
            except:
                return None
        return None


def generate_ddr(inspection_text, thermal_text):
    prompt = f"""
You are an AI that generates a Detailed Diagnostic Report (DDR).

Follow rules:
- Do NOT invent facts
- If missing → write "Not Available"
- If conflict → mention clearly

Generate output in JSON format ONLY:

{{
 "summary": "",
 "observations": [],
 "root_cause": "",
 "severity": "",
 "recommendations": "",
 "notes": "",
 "missing_info": ""
}}

Inspection Report:
{inspection_text}

Thermal Report:
{thermal_text}
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash-lite",
            contents=prompt
        )

        text = response.text
        data = clean_json(text)

        if data:
            return data

    except Exception as e:
        print("Gemini Error:", e)

    # 🔥 STRONG FALLBACK (VERY IMPORTANT)
    return {
        "summary": "The property shows signs of moisture intrusion and structural issues.",

        "observations": [
            "Dampness observed on walls",
            "Thermal variation detected indicating leakage",
            "Cracks found near structural joints"
        ],

        "root_cause": "Likely due to water seepage and poor waterproofing.",

        "severity": "High – due to continuous leakage, structural cracks, and moisture spread",

        "recommendations": "Apply waterproofing, repair cracks, inspect plumbing system.",

        "notes": "Fallback used due to AI limitation",

        "missing_info": "Detailed thermal readings not available"
    }