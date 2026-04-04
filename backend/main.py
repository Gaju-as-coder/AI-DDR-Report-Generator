# from fastapi import FastAPI, UploadFile, File
# import shutil
# import os
# import time

# from utils.pdf_parser import extract_pdf_data
# from utils.gemini_processor import generate_ddr
# from utils.report_generator import generate_word, generate_pdf

# from fastapi.middleware.cors import CORSMiddleware
# from fastapi.staticfiles import StaticFiles



# app = FastAPI()

# UPLOAD_DIR = "uploads"
# OUTPUT_DIR = "outputs"

# os.makedirs(UPLOAD_DIR, exist_ok=True)
# os.makedirs(OUTPUT_DIR, exist_ok=True)

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.get("/")
# def home():
#     return {"message": "API is running 🚀"}

# @app.post("/generate-report")
# async def generate_report(
#     inspection: UploadFile = File(...),
#     thermal: UploadFile = File(...)
# ):
#     # Save files
#     inspection_path = f"{UPLOAD_DIR}/{inspection.filename}"
#     thermal_path = f"{UPLOAD_DIR}/{thermal.filename}"

#     with open(inspection_path, "wb") as f:
#         shutil.copyfileobj(inspection.file, f)

#     with open(thermal_path, "wb") as f:
#         shutil.copyfileobj(thermal.file, f)

#     # Extract data
#     inspection_text, _ = extract_pdf_data(inspection_path)
#     thermal_text, _ = extract_pdf_data(thermal_path)

#     # AI Processing
#     ddr_data = generate_ddr(inspection_text, thermal_text)

#     # Generate outputs
#     timestamp = int(time.time())

#     word_path = f"{OUTPUT_DIR}/report_{timestamp}.docx"
#     pdf_path = f"{OUTPUT_DIR}/report_{timestamp}.pdf"


#     app.mount("/outputs", StaticFiles(directory="outputs"), name="outputs")

#     generate_word(ddr_data, word_path)
#     generate_pdf(ddr_data, pdf_path)



#     return {
#         "message": "Report Generated",
#         "pdf_file": f"outputs/report_{timestamp}.pdf",
#         "word_file": f"outputs/report_{timestamp}.docx",
#         "data": ddr_data
#     }

# # app.add_middleware(
# #     CORSMiddleware,
# #     allow_origins=["*"],
# #     allow_credentials=True,
# #     allow_methods=["*"],
# #     allow_headers=["*"],
# # )






from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

import shutil
import os
import time

from utils.pdf_parser import extract_pdf_data
from utils.gemini_processor import generate_ddr
from utils.report_generator import generate_word, generate_pdf


# ===================== APP INIT =====================
app = FastAPI()


# ===================== PATH SETUP =====================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")
OUTPUT_DIR = os.path.join(BASE_DIR, "outputs")

os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)


# ===================== STATIC FILE SERVING =====================
app.mount(
    "/outputs",
    StaticFiles(directory=OUTPUT_DIR),
    name="outputs"
)


# ===================== CORS =====================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ===================== ROUTES =====================
@app.get("/")
def home():
    return {"message": "API is running 🚀"}


@app.post("/generate-report")
async def generate_report(
    inspection: UploadFile = File(...),
    thermal: UploadFile = File(...)
):
    try:
        # ================= SAVE FILES =================
        inspection_path = os.path.join(UPLOAD_DIR, inspection.filename)
        thermal_path = os.path.join(UPLOAD_DIR, thermal.filename)

        with open(inspection_path, "wb") as f:
            shutil.copyfileobj(inspection.file, f)

        with open(thermal_path, "wb") as f:
            shutil.copyfileobj(thermal.file, f)

        print("Files saved:", inspection_path, thermal_path)

        # ================= EXTRACT TEXT =================
        inspection_text, _ = extract_pdf_data(inspection_path)
        thermal_text, _ = extract_pdf_data(thermal_path)

        print("Text extracted")

        # ================= AI PROCESSING =================
        ddr_data = generate_ddr(inspection_text, thermal_text)

        print("DDR DATA:", ddr_data)

        # ================= GENERATE FILES =================
        timestamp = int(time.time())

        word_filename = f"report_{timestamp}.docx"
        pdf_filename = f"report_{timestamp}.pdf"

        word_path = os.path.join(OUTPUT_DIR, word_filename)
        pdf_path = os.path.join(OUTPUT_DIR, pdf_filename)

        generate_word(ddr_data, word_path)
        generate_pdf(ddr_data, pdf_path)

        print("Files generated:", word_path, pdf_path)

        # ================= RESPONSE =================
        return {
            "message": "Report Generated Successfully",
            "pdf_file": f"outputs/{pdf_filename}",
            "word_file": f"outputs/{word_filename}",
            "data": ddr_data
        }

    except Exception as e:
        print("ERROR:", e)
        return {
            "error": str(e)
        }