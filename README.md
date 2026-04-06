# Brightspace MCP Server

> **By [Yousef Alami](https://github.com/Yxxxxs), Carleton University**

Connect your Brightspace to AI. Ask Claude, ChatGPT, Cursor, or Windsurf about your grades, due dates, announcements, course content, and more -- directly in the chat.

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

2. **An AI chatbot app** -- Pick one:
   - [Claude Desktop](https://claude.ai/download) (free)
   - [ChatGPT Desktop](https://openai.com/chatgpt/desktop/) (free)
   - [Cursor](https://cursor.sh) (free)
   - [Windsurf](https://windsurf.com) (free)

---

## Setup (Mac)

### Step 1: Open Terminal

Press **Command + Space** on your keyboard, type **Terminal**, and hit Enter. A window with a black or white text screen will appear. This is where you'll paste commands.

### Step 2: Install everything

Copy this entire block below. Go back to Terminal, right-click and choose **Paste** (or press **Command + V**). Then hit **Enter** and wait for it to finish. It may take a few minutes.

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

If you see any text saying "WARN", that's fine. Only "ERROR" matters.

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

### Step 5: Connect to your AI app

Pick whichever app you're using and follow those instructions:

---

<details>
<summary><strong>Claude Desktop (click to expand)</strong></summary>

1. **Open Finder** (the smiley face icon in your dock)
2. In the menu bar at the top of your screen, click **Go**, then click **Go to Folder...**
3. Paste this and hit Enter:
   ```
   ~/Library/Application Support/Claude
   ```
4. A folder will open. Look for a file called `claude_desktop_config.json`
   - **If the file exists:** double-click it to open in TextEdit
   - **If the file doesn't exist:** open TextEdit (Command + Space, type TextEdit, hit Enter). Click **Format** in the menu bar and choose **Make Plain Text**
5. Delete everything in the file (if anything is there) and paste exactly this:
   ```json
   {
     "mcpServers": {
       "brightspace": {
         "command": "brightspace-mcp-server"
       }
     }
   }
   ```
6. Save the file (**Command + S**). If you created a new file, save it as `claude_desktop_config.json` in that Claude folder. Make sure it doesn't save as `.txt` -- if it does, rename it to remove the `.txt` part.
7. **Quit Claude Desktop completely:** click **Claude** in the top menu bar, then **Quit Claude**. (Don't just click the red X -- that doesn't fully close it.)
8. Open Claude Desktop again.
9. Try asking: **"What are my Brightspace courses?"**

If Claude responds with your list of courses, you're all set!

</details>

---

<details>
<summary><strong>ChatGPT Desktop (click to expand)</strong></summary>

1. Open the ChatGPT Desktop app
2. Click **ChatGPT** in the top menu bar, then click **Settings**
3. Click **Tools** on the left side
4. Click **Add MCP tool**
5. Click **"Add manually"**
6. Paste this:
   ```json
   {
     "command": "brightspace-mcp-server"
   }
   ```
7. Click **Save** or **Add**
8. **Quit ChatGPT completely:** click **ChatGPT** in the top menu bar, then **Quit ChatGPT**
9. Open ChatGPT again
10. Try asking: **"What are my Brightspace courses?"**

</details>

---

<details>
<summary><strong>Cursor (click to expand)</strong></summary>

1. **Open Finder** (the smiley face icon in your dock)
2. In the menu bar at the top, click **Go**, then **Go to Folder...**
3. Paste this and hit Enter:
   ```
   ~/.cursor
   ```
4. Look for a file called `mcp.json`
   - **If it exists:** double-click to open in TextEdit
   - **If it doesn't exist:** open TextEdit, click **Format** > **Make Plain Text**, and create a new file
5. Delete everything and paste exactly this:
   ```json
   {
     "mcpServers": {
       "brightspace": {
         "command": "brightspace-mcp-server"
       }
     }
   }
   ```
6. Save the file as `mcp.json` in the `.cursor` folder
7. **Quit Cursor completely** and reopen it
8. Try asking: **"What are my Brightspace courses?"**

</details>

---

<details>
<summary><strong>Windsurf (click to expand)</strong></summary>

1. **Open Finder** (the smiley face icon in your dock)
2. In the menu bar at the top, click **Go**, then **Go to Folder...**
3. Paste this and hit Enter:
   ```
   ~/.windsurf
   ```
4. Look for a file called `mcp.json`
   - **If it exists:** double-click to open in TextEdit
   - **If it doesn't exist:** open TextEdit, click **Format** > **Make Plain Text**, and create a new file
5. Delete everything and paste exactly this:
   ```json
   {
     "mcpServers": {
       "brightspace": {
         "command": "brightspace-mcp-server"
       }
     }
   }
   ```
6. Save the file as `mcp.json` in the `.windsurf` folder
7. **Quit Windsurf completely** and reopen it
8. Try asking: **"What are my Brightspace courses?"**

</details>

---

## Setup (Windows)

### Step 1: Open Command Prompt

Press the **Windows key** on your keyboard, type **cmd**, and hit Enter.

### Step 2: Install everything

Copy and paste these lines into Command Prompt **one line at a time**, hitting Enter after each:

```
git clone https://github.com/Yxxxxs/Brightspace-mcp-server.git
```
```
cd Brightspace-mcp-server
```
```
npm install --ignore-scripts
```
```
npx playwright install chromium
```
```
npm run build
```
```
npm install -g .
```

### Step 3: Run setup

```
brightspace-mcp-server setup
```

Enter your school's Brightspace URL when asked (e.g. `https://brightspace.carleton.ca`), then your username and password.

### Step 4: Authenticate

```
brightspace-mcp-server auth
```

A browser will open. Log in to Brightspace. Wait for "Authentication successful!" in the Command Prompt.

### Step 5: Connect to your AI app

Pick whichever app you're using:

---

<details>
<summary><strong>Claude Desktop - Windows (click to expand)</strong></summary>

1. Press **Windows key + R** on your keyboard
2. Paste this and hit Enter:
   ```
   %APPDATA%\Claude
   ```
3. A folder will open. Look for `claude_desktop_config.json`
   - **If it exists:** right-click it > Open with > Notepad
   - **If it doesn't exist:** right-click in the folder > New > Text Document. Name it `claude_desktop_config.json` (make sure file extensions are visible in Windows so it doesn't become `.json.txt`)
4. Delete everything and paste:
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
5. Save and close
6. **Fully quit Claude Desktop** (right-click the icon in the system tray near the clock and choose Quit)
7. Reopen Claude Desktop
8. Ask: **"What are my Brightspace courses?"**

</details>

---

<details>
<summary><strong>ChatGPT Desktop - Windows (click to expand)</strong></summary>

1. Open the ChatGPT Desktop app
2. Click the menu (three lines or gear icon), then **Settings**
3. Click **Tools**
4. Click **Add MCP tool** > **"Add manually"**
5. Paste this:
   ```json
   {
     "command": "cmd",
     "args": ["/c", "brightspace-mcp-server"]
   }
   ```
6. Click **Save** or **Add**
7. Fully quit ChatGPT and reopen it
8. Ask: **"What are my Brightspace courses?"**

</details>

---

<details>
<summary><strong>Cursor - Windows (click to expand)</strong></summary>

1. Press **Windows key + R**
2. Paste this and hit Enter:
   ```
   %USERPROFILE%\.cursor
   ```
3. Open or create `mcp.json` in Notepad
4. Paste:
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
5. Save and close
6. Fully quit Cursor and reopen it
7. Ask: **"What are my Brightspace courses?"**

</details>

---

<details>
<summary><strong>Windsurf - Windows (click to expand)</strong></summary>

1. Press **Windows key + R**
2. Paste this and hit Enter:
   ```
   %USERPROFILE%\.windsurf
   ```
3. Open or create `mcp.json` in Notepad
4. Paste:
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
5. Save and close
6. Fully quit Windsurf and reopen it
7. Ask: **"What are my Brightspace courses?"**

</details>

---

## Session Expired?

If your AI stops being able to access Brightspace, open Terminal (Mac) or Command Prompt (Windows) and run:

```
brightspace-mcp-server auth
```

Log in again in the browser that opens. Then quit and reopen your AI app.

## Troubleshooting

**"command not found"** -- Open Terminal and run: `echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc && source ~/.zshrc`

**"permission denied"** -- Open Terminal and run: `chmod +x ~/.npm-global/bin/brightspace-mcp-server ~/.npm-global/bin/brightspace-auth ~/.npm-global/bin/brightspace-setup`

**AI doesn't respond about Brightspace** -- Make sure you fully quit the AI app (not just close the window) and reopened it.

**"Not authenticated"** -- Run `brightspace-mcp-server auth` in Terminal and log in again.

**Need to start over** -- Run `brightspace-mcp-server setup` in Terminal.

**Browser crashes during auth** -- Run `rm -rf ~/.d2l-session` in Terminal to clear old data, then try `brightspace-mcp-server auth` again.

## Confirmed Working

- Carleton University (Ottawa, ON)

If you get this working at your school, open an issue to add it to this list.

## Security

- Your credentials stay on your computer only
- Session tokens are encrypted
- All traffic uses HTTPS
- Nothing is sent anywhere except your school's login page

Licensed under AGPL-3.0. See [LICENSE](LICENSE) for details.
