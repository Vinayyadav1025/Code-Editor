const express = require("express");
const { exec } = require("child_process");
const fs = require("fs");
const cors = require("cors");

const app = express();

// CORS configuration
app.use(cors({
  origin: "http://localhost:3000", // Frontend URL
  credentials: true,
}));

app.use(express.json()); // Parse incoming JSON data

// Handle POST request to execute Python code
app.post("/execute", (req, res) => {
  try {
    const { code, input_data = "" } = req.body;
    console.log("Received code and input data:", code, input_data);

    // Create temporary Python script file
    const script = "temp_script.py";
    fs.writeFileSync(script, code);  // Write the code to a temp script file

    // Execute Python script with input data passed as a command-line argument
    const pythonProcess = exec(`python3 ${script} "${input_data}"`);

    let output = '';
    let errorOutput = '';

    // Capture stdout and stderr
    pythonProcess.stdout.on('data', (data) => {
      output += data; // Collect standard output
    });

    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data; // Collect error output (stderr)
    });

    pythonProcess.on('close', (code) => {
      fs.unlinkSync(script);  // Clean up the temporary Python script file

      if (code === 0) {
        // Send the output back to the frontend as a JSON response
        res.status(200).json({ stdout: output.trim(), stderr: errorOutput.trim() });
      } else {
        // If there was an error executing the Python script, send the error back
        res.status(500).json({ error: errorOutput.trim() || "Execution failed" });
      }
    });
  } catch (e) {
    console.error("Error processing the request:", e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start server on port 5000
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
