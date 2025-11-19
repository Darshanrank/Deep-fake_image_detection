import os
import uuid
import numpy as np
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from tensorflow.keras.models import load_model  # if deep learning
from tensorflow.keras.preprocessing import image
from flask_cors import CORS

# Initialize Flask
app = Flask(__name__)
CORS(app) 
app.config["UPLOAD_FOLDER"] = "uploads"
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)



model = load_model("/app/deepfake_model.h5", compile=False)

# Save in newer TF SavedModel format
# model.save("deepfake_model_converted")


# ====== Image Preprocessing Function ======
def preprocess_image(img_path):
    """Preprocess uploaded image before feeding into model."""
    img = image.load_img(img_path, target_size=(256, 256))  # resize for model
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)  # (1,256,256,3)
    img_array = img_array / 255.0  # normalize
    return img_array

# ====== API Routes ======

@app.route('/api', methods=['GET'])
def api_home():
    return jsonify({"message": "Hello from model API"})

@app.route("/api/deepware/scan", methods=["POST"])
def scan_image():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    filename = secure_filename(file.filename)
    file_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)
    file.save(file_path)

    # Generate a fake "report ID"
    report_id = str(uuid.uuid4())

    # Store path in memory (or DB/cache for real project)
    # Here we’ll just return immediately
    return jsonify({"report-id": report_id, "path": file_path}), 200


@app.route("/api/deepware/report/<report_id>", methods=["GET"])
def get_report(report_id):
    # Normally, you'd fetch report info from DB/cache
    # Here we assume "path" was provided in query params for simplicity
    img_path = request.args.get("path")
    if not img_path or not os.path.exists(img_path):
        return jsonify({"error": "Report not found"}), 404

    # Preprocess and predict
    img_array = preprocess_image(img_path)
    prediction = model.predict(img_array)[0]

    # Example: binary classification (0=fake, 1=real)
    confidence = float(prediction[0]) * 100
    result = "Real" if prediction[0] > 0.5 else "Fake"

    response = {
        "complete": True,
        "status": "done",
        "result": result,
        "confidence": confidence
    }
    return jsonify(response), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050, debug=True)
