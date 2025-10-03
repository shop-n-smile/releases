# Shop-n-Smile Releases

This repository hosts release builds of our applications for download via GitHub Pages. Only organization members can upload releases.

## 🌐 Live Site

Visit [https://shop-n-smile.github.io/releases/](https://shop-n-smile.github.io/releases/) to access and download releases.

## 📦 For Organization Members: How to Upload Releases

### Directory Structure

Organize releases in the `releases/` directory following this structure:

```
releases/
├── app-name/
│   ├── v1.0.0/
│   │   ├── app-name-v1.0.0-windows.zip
│   │   ├── app-name-v1.0.0-mac.dmg
│   │   └── app-name-v1.0.0-linux.tar.gz
│   ├── v1.0.1/
│   │   └── ...
│   └── latest/
│       └── ... (symlink or copy of latest version)
```

### Steps to Upload a Release

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shop-n-smile/releases.git
   cd releases
   ```

2. **Create the app directory structure:**
   ```bash
   mkdir -p releases/your-app-name/v1.0.0
   ```

3. **Add your release files:**
   ```bash
   cp /path/to/your/build.zip releases/your-app-name/v1.0.0/
   ```

4. **Update the index page (optional):**
   - Edit `index.html` to add your app to the releases list
   - Or create a `releases.json` file (see below)

5. **Commit and push:**
   ```bash
   git add releases/
   git commit -m "Add release for your-app-name v1.0.0"
   git push origin main
   ```

6. **Wait for GitHub Pages to deploy** (usually takes 1-2 minutes)

### Using releases.json (Optional)

You can create a `releases.json` file to dynamically list releases:

```json
[
  {
    "name": "My App",
    "version": "v1.0.0",
    "description": "Description of the app",
    "downloadUrl": "releases/my-app/v1.0.0/my-app-v1.0.0.zip"
  }
]
```

### Best Practices

- **Naming Convention:** Use consistent naming: `app-name-version-platform.ext`
- **Version Tags:** Always use semantic versioning (e.g., v1.0.0)
- **File Size:** Keep individual files under 100MB (GitHub file size limit)
- **Documentation:** Include a README.md or CHANGELOG.md in each version directory
- **Testing:** Test download links after pushing to ensure they work

## 🔒 Access Control

- Only organization members with write access can upload releases
- Anyone with a link can download releases (public repository)
- Use GitHub branch protection rules if needed

## 📝 License

This repository is for internal use by Shop-n-Smile organization members.