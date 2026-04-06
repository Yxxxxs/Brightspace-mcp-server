# Brightspace MCP Server

> **By [Yousef Alami](https://github.com/Yxxxxs), Carleton University**

Connect your Brightspace to AI. Ask Claude or ChatGPT about your grades, due dates, announcements, course content, and more -- directly in the chat.

Works with any school that uses D2L Brightspace.

## What can I do with this?

Once set up, you can ask your AI things like:

- "What's due this week across all my courses?"
- "Am I passing all my classes?"
- "Download my lecture slides and turn them into flashcards"
- "Build me a study schedule based on my upcoming due dates"
- "Who are the TAs for my course?"
- "Did any professor post something important today?"

## Before you start

You need two things installed on your computer:

1. **Node.js 18 or newer** -- Download it here: [https://nodejs.org](https://nodejs.org) (click the big green "LTS" button, run the installer, click Next through everything)

2. **Claude Desktop** or **ChatGPT Desktop** -- This is the app you'll chat with after setup. Download Claude Desktop here: [https://claude.ai/download](https://claude.ai/download)

## Setup (Mac)

### Step 1: Open Terminal

Press **Command + Space** on your keyboard, type **Terminal**, and hit Enter. A window with a black or white text screen will appear. This is where you'll paste commands.

### Step 2: Install everything

Copy this entire block below. Go back to Terminal, right-click and choose **Paste** (or press Command + V). Then hit **Enter** and wait for it to finish. It may take a few minutes.

```
git clone https://github.com/Yxxxxs/Brightspace-mcp-server.git
cd Brightspace-mcp-server
npm install --ignore-scripts
npx playwright install chromium
npm run build
mkdir -p ~/.npm-global && npm config set prefix '~/.npm-global'
npm install -g .
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc
source ~/.zshrc
chmod +x ~/.npm-global/bin/brightspace-mcp-server ~/.npm-global/bin/brightspace-auth ~/.npm-global/bin/brightspace-setup 2>/dev/null
```

You'll see a bunch of text scroll by. That's normal. Wait until you see your username again with a `$` or `%` sign -- that means it's done.

If you see any red text saying "WARN", that's fine. Only "ERROR" matters.

### Step 3: Run setup

In the same Terminal window, paste this and hit Enter:

```
brightspace-mcp-server setup
```

It will ask: **"What is your Brightspace URL?"**

Type your school's Brightspace web address. For example:
- Carleton students type: `https://brightspace.carleton.ca`
- Other schools: type whatever URL you normally go to for Brightspace

Then it will ask for your **username** and **password** (the ones you use to log into Brightspace).

### Step 4: Authenticate

In the same Terminal window, paste this and hit Enter:

```
brightspace-mcp-server auth
```

A browser window will pop up showing your school's login page. **Log in like you normally would** (enter your username, password, and approve MFA/Duo if your school uses it).

After you log in, go back to the Terminal window. Wait until you see:

```
=== Authentication successful! ===
```

If you see that, you're almost done!

### Step 5: Connect to Claude Desktop

Now you need to tell Claude Desktop where to find the Brightspace server. Here's how:

1. **Open Finder** (the smiley face icon in your dock)
2. In the menu bar at the top, click **Go** then **Go to Folder...**
3. Paste this path and hit Enter:
   ```
   ~/Library/Application Support/Claude
   ```
4. You should see a folder open. Look for a file called `claude_desktop_config.json`
   - If the file exists: double-click it to open in TextEdit
   - If the file doesn't exist: open TextEdit (Command + Space, type TextEdit, hit Enter), then click **Format** in the menu bar and choose **Make Plain Text**
5. Replace everything in the file (or paste into the blank file) with exactly this:
   ```json
   {
     "mcpServers": {
       "brightspace": {
         "command": "brightspace-mcp-server"
       }
     }
   }
   ```
6. Save the file (Command + S). If you created a new file, save it as `claude_desktop_config.json` in that same Claude folder. **Make sure it doesn't save as .txt** -- if TextEdit adds .txt, rename it to remove the .txt part.

**Using ChatGPT Desktop instead?** Open ChatGPT, go to Settings > Tools > Add MCP tool > "Add manually", and paste:
```json
{
  "command": "brightspace-mcp-server"
}
```

### Step 6: Restart Claude Desktop

1. If Claude Desktop is open, click **Claude** in the top menu bar, then click **Quit Claude**. (Don't just click the red X -- that doesn't fully close it.)
2. Open Claude Desktop again.
3. Try asking: **"What are my Brightspace courses?"**

If Claude responds with your list of courses, everything is working!

## Setup (Windows)

### Step 1: Open Command Prompt

Press the **Windows key**, type **cmd**, and hit Enter.

### Step 2: Install everything

Copy and paste this into Command Prompt, one line at a time:

```
git clone https://github.com/Yxxxxs/Brightspace-mcp-server.git
cd Brightspace-mcp-server
npm install --ignore-scripts
npx playwright install chromium
npm run build
npm install -g .
```

### Step 3: Run setup

```
brightspace-mcp-server setup
```

Enter your school's Brightspace URL when asked (e.g. `https://brightspace.carleton.ca`).

### Step 4: Authenticate

```
brightspace-mcp-server auth
```

A browser will open. Log in to Brightspace. Wait for "Authentication successful!" in the Command Prompt.

### Step 5: Connect to Claude Desktop

1. Press **Windows key + R**, paste this, and hit Enter:
   ```
   %APPDATA%\Claude
   ```
2. Open `claude_desktop_config.json` in Notepad (right-click > Open with > Notepad). If the file doesn't exist, create a new text file and name it `claude_desktop_config.json`.
3. Paste this in:
   ```json
   {
     "mcpServers": {
       "brightspace": {
         "command": "cmd",
         "args": ["/c", "brightspace-mcp-server"]
       }
     }
   }
   ```
4. Save and close.

### Step 6: Restart Claude Desktop

Fully quit Claude Desktop and reopen it. Ask: **"What are my Brightspace courses?"**

## Session Expired?

If Claude stops being able to access Brightspace, open Terminal (Mac) or Command Prompt (Windows) and run:

```
brightspace-mcp-server auth
```

Log in again in the browser that opens. Then restart Claude Desktop.

## Troubleshooting

**"command not found"** -- Open Terminal and run: `echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc && source ~/.zshrc`

**"permission denied"** -- Open Terminal and run: `chmod +x ~/.npm-global/bin/brightspace-mcp-server ~/.npm-global/bin/brightspace-auth ~/.npm-global/bin/brightspace-setup`

**Claude doesn't respond about Brightspace** -- Make sure you fully quit Claude Desktop (not just close the window) and reopened it.

**"Not authenticated"** -- Run `brightspace-mcp-server auth` in Terminal and log in again.

**Need to redo everything** -- Run `brightspace-mcp-server setup` in Terminal.

**Browser crashes during auth** -- Run `rm -rf ~/.d2l-session` in Terminal, then try `brightspace-mcp-server auth` again.

## Confirmed Working

- Carleton University (Ottawa, ON)

If you get this working at your school, open an issue to add it to this list.

## Security

- Your credentials stay on your computer only
- Session tokens are encrypted
- All traffic uses HTTPS
- Nothing is sent anywhere except your school's login page

Licensed under AGPL-3.0. See [LICENSE](LICENSE) for details.
