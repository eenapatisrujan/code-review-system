require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// --- Health check endpoint ---
app.get('/api/health', (req, res) => {
  res.json({ status: "ok" });
});

// --- Load Gemini API key ---
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY is not set in .env file!");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// --- Optional: List available Gemini models ---
async function listAvailableModels() {
  try {
    const response = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`
    );
    console.log("✅ Available Gemini models:");
    response.data.models?.forEach(m => console.log("-", m.name));
  } catch (err) {
    console.error("⚠️ Could not fetch Gemini models:", err.message);
  }
}
listAvailableModels();

// --- Main Analyze Endpoint ---
app.post(
  '/api/analyze',
  (req, res, next) => {
    if (req.headers['content-type']?.includes('multipart/form-data')) {
      upload.single('file')(req, res, next);
    } else {
      next();
    }
  },
  async (req, res) => {
    let filePath = null;

    try {
      let code = '';
      let lineCount = 0;

      if (req.file) {
        filePath = req.file.path;
        code = fs.readFileSync(filePath, 'utf8');
        lineCount = code.split('\n').length;
        console.log(`📄 Uploaded file: ${req.file.originalname}, ${lineCount} lines`);
      } else if (req.body.code) {
        code = req.body.code;
        lineCount = code.split('\n').length;
        console.log(`📝 Code received as text (${lineCount} lines)`);
      }

      if (!code.trim()) {
        if (filePath) fs.unlinkSync(filePath);
        return res.status(400).json({ error: "No code provided" });
      }

      // --- Return a mock report, no API key or Gemini required ---
      const analysis = `
AI Code Review Report

1. Readability:
- Variable names are clear and descriptive.
- Code is mostly well-formatted and commented.

2. Structure:
- Functions are logically separated.
- Some repeated logic could be refactored into helpers.

3. Algorithms used:
- Standard algorithms are used appropriately.
- No major inefficiencies detected.

4. Time complexity:
- Most functions are O(n) or better.
- No obvious bottlenecks for typical input sizes.

5. Suggested improvements:
- Refactor repeated code into utility functions.
- Add more edge case handling and input validation.

6. Possible bug fixes:
- Ensure all user input is sanitized.
- Add error handling for file operations.

7. Better methods or optimizations:
- Consider using built-in array methods for clarity.
- Use async/await for asynchronous operations.

8. Overall score: 8/10

This is an automated sample report. For a more detailed review, enable AI integration.
      `;

      if (filePath) fs.unlinkSync(filePath);
      res.json({ analysis, lineCount });

    } catch (err) {
      if (filePath) try { fs.unlinkSync(filePath); } catch {}
      console.error("❌ Backend error:", err);
      res.status(500).json({
        error: "Failed to analyze code",
        details: err.message
      });
    }
  }
);

// --- Start Server ---
app.listen(3001, () => console.log("✅ Server running on port 3001"));
