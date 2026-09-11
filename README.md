🥗 Advanced Secure Dietician App
A 100% client-side clinical nutrition assistant with a real computational diet engine —no backend, no API keys, no data ever leaves your browser. 

✨ Features
👤 User Profiles
Verified registration flow with 4-digit confirmation code
Multiple saved profiles with per-user data isolation
Auto-restores your last active profile
All data persisted in browser localStorage
🧮 Real Clinical Math (not canned answers)
BMI + WHO category classification
BMR via Mifflin-St Jeor equation
TDEE with 5 activity levels
Goal engine — safe deficit (floor-protected above BMR) or lean-gain surplus
Macro split — protein g/kg, carb/fat grams computed from your target
Hydration target — 33 ml/kg, boosted +500 ml for constipation
Fiber target — 14 g per 1000 kcal
Progress projection — deficit × 7 ÷ 7700 = kg/week
🤖 Clinical Assistant Bot (Profile-Correlated Engine)
Ask questions and get answers computed from your actual numbers:

📅 Clock-timed meal schedule built from your wake/bed times
🍽️ GI-condition-specific meal spacing (GERD = 3 h pre-bed cutoff, etc.)
🔍 ~55-food nutrition database with per-condition verdicts + portion math
🩺 Symptom protocols (heartburn, bloating, constipation)
⏰ Late-night eating, meal skipping, caffeine timing, exercise windows
One-click question chips for quick demos
🔍 Smart Food Checker
Type any food → database lookup → verdict (SAFE ✅ / LIMIT ⚠️ / AVOID 🚫) tailored toyour specific GI condition and weight goal, with the physiological mechanism explained.

💧 Hydration Tracker + 🧠 Mood Log
Per-user glass logging and daily mood/energy reflection, both persisted.

📊 Recommendation Dashboard
What to eat / avoid + wellness habits, generated per goal + GI condition.

🩺 Supported GI Conditions
Condition	Engine Behavior
GERD / Acid Reflux	3 h pre-bed food cutoff, LES-trigger database, left-side sleeping advice
IBS	FODMAP-level scoring, strict meal rhythm, small portions
Gastritis	Never-skip-meal scheduling, bland meal templates
Constipation	+500 ml water, fiber-forward breakfast, gastrocolic reflex timing
None	Balanced 4-meal rhythm
🚀 Run It
Option 1 — just open it

Double-click index.html. Works offline. That's it.

Option 2 — GitHub Pages

1. Push index.html to a repo2. Settings → Pages → Deploy from branch → main / root3. Live in ~1 minute
No build step. No dependencies. No install.

🔒 Privacy & Security
What this app does right:

✅ Zero network transmission — the bot is a local deterministic engine, not an API call
✅ All user inputs sanitized and HTML-escaped (XSS-hardened output)
✅ Strict Content-Security-Policy, frame-buster, clickjacking defenses
✅ Per-user data keys — profiles don't leak into each other
Honest limitations (read before entering real data):

⚠️ Registration is a UX flow, not real authentication — there is no backend
⚠️ Data is stored as plaintext in localStorage — anyone with device access can read it
⚠️ This is a demo/portfolio application, not a HIPAA/GDPR-compliant medical platform
⚠️ Medical Disclaimer
This application is an educational tool only. It does not provide medical advice,diagnosis, or treatment. Nutritional calculations are estimates based on populationformulas. Always consult a qualified physician or registered dietitian before makingchanges to your diet, especially if you have a diagnosed medical condition.

🛠️ Tech
Vanilla HTML / CSS / JavaScript — single file, zero dependencies
~55-entry nutrition database (kcal, protein, acidity, caffeine, FODMAP, fiber, GI)
Mifflin-St Jeor BMR · WHO BMI bands · standard sports-nutrition macro formulas
📄 License
MIT — see LICENSE

MIT License

Copyright (c) 2025 ⟨MOHAMMAD ASHRAF ALI SHAIK⟩

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


