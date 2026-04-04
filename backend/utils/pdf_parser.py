import fitz  # PyMuPDF

def extract_pdf_data(file_path):
    doc = fitz.open(file_path)
    text = ""
    images = []

    for page_num, page in enumerate(doc):
        text += page.get_text()

        for img_index, img in enumerate(page.get_images(full=True)):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]

            image_path = f"uploads/image_{page_num}_{img_index}.png"
            with open(image_path, "wb") as f:
                f.write(image_bytes)

            images.append(image_path)

    return text, images