document.getElementById("uploadForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select a file to upload.");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("http://localhost:3000/upload", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            alert("File uploaded successfully!");
        } else {
            alert("Failed to upload file.");
        }
    } catch (error) {
        console.error("Error uploading file:", error);
    }
});
