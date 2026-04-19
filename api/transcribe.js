import fs from "fs";
import fetch from "node-fetch";
import FormData from "form-data";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    const file = files.audio;

    const formData = new FormData();
    formData.append("audio", fs.createReadStream(file.filepath));

    const response = await fetch("https://YOUR-RUNPOD-URL/transcribe", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    res.json(data);
  });
}
