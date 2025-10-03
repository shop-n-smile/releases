# Releases Directory

This directory contains all release builds organized by application name and version.

## Structure

Each application should have its own directory with version subdirectories:

```
releases/
├── app-name-1/
│   ├── v1.0.0/
│   ├── v1.0.1/
│   └── v1.1.0/
├── app-name-2/
│   └── v2.0.0/
└── ...
```

## Example

See the `example-app/` directory for a reference structure.

## Adding Your Release

1. Create a directory with your app name (lowercase, use hyphens)
2. Create a version subdirectory (e.g., v1.0.0)
3. Place your build files in the version directory
4. Optionally add a README.md or CHANGELOG.md in the version directory

## Direct Download Links

Files in this directory are accessible via GitHub Pages at:
```
https://shop-n-smile.github.io/releases/releases/app-name/version/filename.ext
```

Example:
```
https://shop-n-smile.github.io/releases/releases/example-app/v1.0.0/example-app-v1.0.0.zip
```
