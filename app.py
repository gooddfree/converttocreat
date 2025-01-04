from flask import Flask, request, send_file
from PIL import Image
import pyembroidery

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return "No file uploaded", 400

    file = request.files['image']
    image = Image.open(file.stream)

    # Convert image to PES (simplified example)
    pattern = pyembroidery.EmbPattern()
    pattern.add_stitch_absolute(0, 0)  # Example stitch
    pattern.add_stitch_absolute(100, 100)  # Example stitch
    pyembroidery.write_pes(pattern, "output.pes")

    return send_file("output.pes", as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
