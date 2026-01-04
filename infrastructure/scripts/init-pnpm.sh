#!/usr/bin/env bash
set -euo pipefail

# init-pnpm.sh
# Usage: run from repo (or run this script directly). It installs Corepack,
# prepares pnpm, and runs a workspace install: `pnpm -w install`.
#
# Required versions:
# - Node.js: 24.11.1 - see .nvmrc
# - Corepack: 0.34.5
# - pnpm: 10.27.0

# Move to repo root (script lives in infrastructure/scripts)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$REPO_ROOT"

echo "Repository root: $REPO_ROOT"

# Fixed versions for consistent development environment
COREPACK_VERSION="0.34.5"
PNPM_VERSION="10.27.0"
REQUIRED_NODE_VERSION="24"

# Check Node.js version
if command -v node >/dev/null 2>&1; then
  CURRENT_NODE_VERSION=$(node -v | cut -d'.' -f1 | sed 's/v//')
  echo "Current Node.js version: $(node -v)"
  
  if [ "$CURRENT_NODE_VERSION" != "$REQUIRED_NODE_VERSION" ]; then
    echo "⚠️  Warning: Node.js ${REQUIRED_NODE_VERSION}.x is required (found: $(node -v))"
    echo "   Please install Node.js ${REQUIRED_NODE_VERSION}.x or use nvm/fnm:"
    echo "   - nvm install ${REQUIRED_NODE_VERSION}"
    echo "   - nvm use ${REQUIRED_NODE_VERSION}"
    echo ""
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
      exit 1
    fi
  fi
else
  echo "❌ Error: Node.js not found. Please install Node.js 24.11.1"
  exit 1
fi

# Install Corepack globally
if command -v npm >/dev/null 2>&1; then
  echo "Installing corepack@${COREPACK_VERSION} globally via npm..."
  npm install -g "corepack@${COREPACK_VERSION}" --force
else
  echo "❌ Error: npm not found; cannot install corepack@${COREPACK_VERSION} automatically."
  exit 1
fi

# Enable corepack
if command -v corepack >/dev/null 2>&1; then
  echo "Enabling corepack..."
  corepack enable
else
  echo "❌ Error: corepack not found after installation."
  exit 1
fi

# Prepare and activate specific pnpm version
echo "Preparing pnpm@${PNPM_VERSION}..."
corepack prepare "pnpm@${PNPM_VERSION}" --activate

# Verify pnpm version
INSTALLED_PNPM_VERSION=$(pnpm --version)
echo "pnpm version: ${INSTALLED_PNPM_VERSION}"

echo "Running pnpm workspace install..."
pnpm -w install

echo "✅ pnpm workspace install finished successfully!"
echo "Development environment ready with:"
echo "  - Node.js: $(node -v)"
echo "  - Corepack: ${COREPACK_VERSION}"
echo "  - pnpm: ${INSTALLED_PNPM_VERSION}"
