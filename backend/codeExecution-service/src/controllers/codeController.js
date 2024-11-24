import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';

// Helper function to execute the code
const runCode = async (code, language, input) => {
    const tempDir = path.join(process.cwd(), 'temp');
    let fileName;
    let filePath;
    let command;

    // Ensure the 'temp' directory exists
    await fs.mkdir(tempDir, { recursive: true });

    // Handle different languages and their respective file extensions
    switch (language) {
        case 'python':
            fileName = 'temp.py';
            filePath = path.join(tempDir, fileName);
            await fs.writeFile(filePath, code);
            command = `python3 "${filePath}"`;  // Using python3 for Python 3.x
            break;
        case 'javascript':
            fileName = 'temp.js';
            filePath = path.join(tempDir, fileName);
            await fs.writeFile(filePath, code);
            command = `node "${filePath}"`;   // Node.js for JavaScript
            break;
        case 'c':
            fileName = 'temp.c';
            filePath = path.join(tempDir, fileName);
            await fs.writeFile(filePath, code);
            command = `gcc "${filePath}" -o "${tempDir}/temp.out" && "${tempDir}/temp.out"`;  // Compile and run C
            break;
        case 'cpp':
            fileName = 'temp.cpp';
            filePath = path.join(tempDir, fileName);
            await fs.writeFile(filePath, code);
            command = `g++ "${filePath}" -o "${tempDir}/temp.out" && "${tempDir}/temp.out"`;  // Compile and run C++
            break;
        case 'java':
            fileName = 'Temp.java';
            filePath = path.join(tempDir, fileName);
            await fs.writeFile(filePath, code);
            command = `javac "${filePath}" && java -cp "${tempDir}" Temp`;  // Compile and run Java
            break;
        default:
            throw new Error('Unsupported language');
    }

    // Execute the command
    return new Promise((resolve, reject) => {
        const child = exec(command, { timeout: 5000 }, (error, stdout, stderr) => {
            if (error) {
                console.error('Error executing command:', error);
                console.error('stderr:', stderr);
                reject(`Execution failed: ${stderr || error.message}`);
            } else {
                console.log('Execution successful');
                console.log('stdout:', stdout);
                resolve(stdout);
            }
        });

        // If input is provided, write it to stdin
        if (input) {
            child.stdin.write(input);
            child.stdin.end();
        }
    });
};

// Compile & Run
export const executeCode = async (req, res) => {
    const { code, language, input } = req.body;
    try {
        const output = await runCode(code, language, input);
        res.status(200).json({ output });
    } catch (error) {
        console.error('Error in executeCode:', error);
        res.status(400).json({ error: `Execution failed: ${error.message}` });
    }
};

// Submit
export const submitCode = async (req, res) => {
    const { code, language, hiddenTestCases } = req.body;

    try {
        let passed = true;
        for (const testCase of hiddenTestCases) {
            const output = await runCode(code, language, testCase.input);
            if (output.trim() !== testCase.expected.trim()) {
                passed = false;
                break;
            }
        }

        if (passed) {
            res.status(200).json({ message: 'All test cases passed!' });
        } else {
            res.status(400).json({ message: 'Test cases failed.' });
        }
    } catch (error) {
        console.error('Error in submitCode:', error);
        res.status(400).json({ error: `Execution failed: ${error.message}` });
    }
};
