async function generateEnhancement() {
    const promptInput = document.getElementById('prompt').value;
    if (!promptInput) {
        alert('Please enter your project context and request.');
        return;
    }
    
    const fullPrompt = `You are an expert Python developer specializing in trading bots. Analyze the following Alt-Scanner project code and generate precise enhancements. Maintain modularity, use existing libraries (e.g., pandas, numpy, yaml), and ensure compatibility with the scoring engine.

Project Overview:
- Repo: sanshr75/Alt-Scanner
- Key Files: src/scoring.py (score_signal function), src/indicators.py (EMA, MACD, etc.)
- Current Features: MEXC API fetch, indicators, scoring with config.yaml, Telegram alerts.

User Request & Code Snippet:
${promptInput}

Output only the updated code snippet(s), followed by a brief explanation of changes. Do not include full file rewrites.`;
    
    try {
        document.getElementById('output').innerHTML = '<p>Generating with Opus 4.5...</p>';
        
        const response = await puter.ai.chat(fullPrompt, {
            model: 'claude-opus-4-5',  // Specify Opus 4.5 for advanced reasoning
            stream: true  // Enable streaming for real-time output (optional, for longer responses)
        });
        
        let outputText = '';
        for await (const part of response) {
            if (part?.text) {
                outputText += part.text;
                document.getElementById('output').innerHTML = `<pre>${outputText}</pre><button onclick="copyOutput()">Copy Code</button>`;
            }
        }
    } catch (error) {
        document.getElementById('output').innerHTML = `<p>Error: ${error.message}. Check console for details.</p>`;
    }
}

function copyOutput() {
    const output = document.getElementById('output').querySelector('pre').textContent;
    navigator.clipboard.writeText(output).then(() => alert('Code copied to clipboard!'));
}
