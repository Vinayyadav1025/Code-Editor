const express = require("express");
const { exec } = require("child_process");
const fs = require("fs");
const cors = require("cors");

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true,
  })
);

app.use(express.json()); // Parse incoming JSON data

// Handle POST request to execute code
app.post("/execute", (req, res) => {
  let responseSent = false; // Flag to track if a response has been sent

  try {
    let { language, code, input_data } = req.body;
    console.log("Input Data:", input_data);
    console.log("Code:", code);

    const tempFiles = {
      python: "temp_script.py",
      javascript: "temp_script.js",
      c: "temp_script.c",
      cpp: "temp_script.cpp",
      java: "TempScript.java",
    };

    const commands = {
      python: `python3 ${tempFiles.python}`,
      javascript: `node ${tempFiles.javascript}`,
      c: `gcc ${tempFiles.c} -o temp_executable && ./temp_executable`,
      cpp: `g++ ${tempFiles.cpp} -o temp_executable && ./temp_executable`,
      java: `javac ${tempFiles.java} && java TempScript`,
    };

    if (!commands[language]) {
      return res.status(400).json({ error: "Unsupported programming language" });
    }

    const tempFile = tempFiles[language];
    fs.writeFileSync(tempFile, code); // Write the code to a temp file
    console.log(`Temporary file created: ${tempFile}`);

    // Ensure file creation
    if (!fs.existsSync(tempFile)) {
      return res.status(500).json({ error: "Failed to create temporary file" });
    }

    // Execute the script/compiled program
    console.log("Executing command:", commands[language]);
    const process = exec(commands[language], { encoding: 'utf8' });

    let output = "";
    let errorOutput = "";

    // Pipe input_data into the process using stdin
    process.stdin.write(input_data + '\n');
    process.stdin.end();

    // Capture stdout and stderr and print them to the console
    process.stdout.on("data", (data) => {
      console.log("stdout:", data); // Log output to the console
      output += data; // Collect standard output
    });

    process.stderr.on("data", (data) => {
      console.error("stderr:", data); // Log error output to the console
      errorOutput += data; // Collect error output
    });

    // Use exit event instead of close
    process.on("exit", (code) => {
      if (responseSent) return; // Prevent multiple responses
      console.log("Process exited with code:", code);
      cleanUpTempFiles(language);
      if (code === 0) {
        console.log("Execution successful!");
        res.status(200).json({ stdout: output.trim(), stderr: errorOutput.trim() });
      } else {
        console.log("Execution failed!");
        res.status(500).json({ error: errorOutput.trim() || "Execution failed" });
      }
      responseSent = true; // Mark that a response has been sent
    });

    // Add timeout for debugging to check if the process hangs
    const timeout = setTimeout(() => {
      if (responseSent) return; // Prevent multiple responses
      console.error("Process timed out");
      process.kill(); // Forcefully kill the process
      res.status(500).json({ error: "Execution timed out" });
      responseSent = true; // Mark that a response has been sent
    }, 5000); // Timeout after 5 seconds

    // Clean up files after process exits
    function cleanUpTempFiles(language) {
      fs.unlinkSync(tempFile);
      if (language === "c" || language === "cpp") {
        if (fs.existsSync("temp_executable")) fs.unlinkSync("temp_executable");
      } else if (language === "java") {
        if (fs.existsSync("TempScript.class")) fs.unlinkSync("TempScript.class");
      }
    }

  } catch (e) {
    console.error("Error processing the request:", e);
    if (!responseSent) {
      res.status(500).json({ error: "Internal Server Error" });
      responseSent = true; // Mark that a response has been sent
    }
  }
});

// Start server on port 5000
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
