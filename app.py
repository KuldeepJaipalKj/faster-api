from faster_whisper import WhisperModel
from flask import Flask, request, jsonify
import os
import uuid

app = Flask(__name__)

model = WhisperModel("small", device="cuda", compute_type="float16")

@app.route("/transcribe", methods=["POST"])
def transcribe():
    file = request.files["audio"]

    path = f"temp_{uuid.uuid4()}.mp3"
    file.save(path)

    segments, info = model.transcribe(path)

    text = " ".join([s.text for s in segments])

    os.remove(path)

    return jsonify({
        "text": text,
        "language": info.language
    })

app.run(host="0.0.0.0", port=5000)
