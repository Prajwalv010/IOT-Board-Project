const express = require('express');
const app = express();
const port = 3001;
const HOST = '0.0.0.0'; // Phone Hotspot IP 

// Simple state object to hold commands
let currentCommand = {
    led: "OFF",
    motor: "STOP"
};

// --- API Endpoint for the Pico to Poll ---
app.get('/api/state', (req, res) => {
    res.json(currentCommand);
});


// ---- LED Endpoints ----
app.get('/led/on', (req, res) => {
    currentCommand.led = "ON";
    console.log('💡 LED turned ON');
    res.redirect('/');
});

app.get('/led/off', (req, res) => {
    currentCommand.led = "OFF";
    console.log('💡 LED turned OFF');
    res.redirect('/');
});

// ---- Motor Endpoints ----
app.get('/motor/forward', (req, res) => {
    currentCommand.motor = "FORWARD";
    console.log('⚙️  MOTOR -> FORWARD');
    res.redirect('/');
});

app.get('/motor/reverse', (req, res) => {
    currentCommand.motor = "REVERSE";
    console.log('⚙️  MOTOR -> REVERSE');
    res.redirect('/');
});

app.get('/motor/stop', (req, res) => {
    currentCommand.motor = "STOP";
    console.log('⚙️  MOTOR -> STOP');
    res.redirect('/');
});

// ---- The Web UI Dashboard ----
app.get('/', (req, res) => {
    const ledColor = currentCommand.led === 'ON' ? '#4CAF50' : '#f44336';
    const motorLabel = currentCommand.motor;
    const motorColor = motorLabel === 'FORWARD' ? '#4CAF50' : motorLabel === 'REVERSE' ? '#FF9800' : '#f44336';

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>IoT Control Dashboard</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { 
                    font-family: 'Segoe UI', Arial, sans-serif; 
                    text-align: center; 
                    background: linear-gradient(135deg, #0f0c29, #302b63, #24243e);
                    color: #fff;
                    min-height: 100vh;
                    padding: 30px 15px;
                }
                h1 { 
                    font-size: 28px; 
                    margin-bottom: 25px;
                    text-shadow: 0 2px 10px rgba(0,0,0,0.3);
                }
                .status-board { 
                    margin: 0 auto 30px; 
                    padding: 20px; 
                    background: rgba(255,255,255,0.08); 
                    border-radius: 16px; 
                    display: inline-block; 
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255,255,255,0.1);
                    min-width: 280px;
                }
                .status-board h3 { margin-bottom: 12px; font-size: 18px; opacity: 0.8; }
                .status-row { font-size: 20px; margin: 8px 0; }
                .status-val { font-weight: bold; padding: 3px 12px; border-radius: 6px; }
                
                .control-section {
                    margin: 20px auto;
                    max-width: 350px;
                }
                .control-section h2 { font-size: 20px; margin-bottom: 12px; opacity: 0.9; }
                .btn { 
                    padding: 14px 28px; 
                    font-size: 17px; 
                    margin: 6px; 
                    border: none; 
                    border-radius: 12px; 
                    cursor: pointer; 
                    color: white; 
                    min-width: 130px; 
                    box-shadow: 0 4px 15px rgba(0,0,0,0.3); 
                    transition: transform 0.1s, box-shadow 0.1s;
                    font-weight: 600;
                }
                .btn:active { transform: scale(0.95); box-shadow: 0 2px 8px rgba(0,0,0,0.3); }
                .btn-on { background: linear-gradient(135deg, #4CAF50, #45a049); }
                .btn-off { background: linear-gradient(135deg, #f44336, #d32f2f); }
                .btn-fwd { background: linear-gradient(135deg, #2196F3, #1976D2); }
                .btn-rev { background: linear-gradient(135deg, #FF9800, #F57C00); }
            </style>
            <!-- Auto-refresh the page to show state changes if done via another device -->
            <meta http-equiv="refresh" content="2">
        </head>
        <body>
            <h1>⚡ Edge AI DevKit Dashboard</h1>
            
            <div class="status-board">
                <h3>Live Status</h3>
                <p class="status-row">💡 LED: <span class="status-val" style="background:${ledColor}">${currentCommand.led}</span></p>
                <p class="status-row">⚙️ Motor: <span class="status-val" style="background:${motorColor}">${motorLabel}</span></p>
            </div>

            <div class="control-section">
                <h2>💡 LED Control</h2>
                <button class="btn btn-on" onclick="location.href='/led/on'">LED ON</button>
                <button class="btn btn-off" onclick="location.href='/led/off'">LED OFF</button>
            </div>

            <div class="control-section">
                <h2>⚙️ Motor Control</h2>
                <button class="btn btn-fwd" onclick="location.href='/motor/forward'">FORWARD</button>
                <button class="btn btn-rev" onclick="location.href='/motor/reverse'">REVERSE</button>
                <button class="btn btn-off" onclick="location.href='/motor/stop'">STOP</button>
            </div>
        </body>
        </html>
    `);
});

app.listen(port, HOST, () => {
    console.log('--------------------------------------------------');
    console.log(`✅ IoT Control Server (HTTP POLLING) is running!`);
    console.log(`--> Dashboard: http://${HOST}:${port}`);
    console.log(`--> API URL for Pico: http://${HOST}:${port}/api/state`);
    console.log('--------------------------------------------------');
});
