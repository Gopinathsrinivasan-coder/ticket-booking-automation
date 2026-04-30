# CI/CD Setup Guide

## GitHub Actions Workflow

This project is configured with GitHub Actions to automatically run Playwright tests on every push and pull request.

### Workflow File
**Location:** `.github/workflows/playwright.yml`

### What It Does

✅ **Runs on:**
- Push to `main` and `develop` branches
- All pull requests targeting `main` and `develop`

✅ **Test Matrix:**
- Node.js 18.x
- Node.js 20.x
- All 3 browsers (Chromium, Firefox, WebKit)

✅ **Automated Steps:**
1. Checkout code
2. Install Node.js
3. Install dependencies (`npm ci`)
4. Install Playwright browsers
5. Run all tests (`npm test`)
6. Upload test reports as artifacts
7. Comment on PR with test results

### Artifacts

Test reports are uploaded and retained for 30 days:
- `playwright-report-18.x` - HTML test report (Node 18)
- `playwright-report-20.x` - HTML test report (Node 20)
- `test-results-18.x` - Detailed test results (Node 18)
- `test-results-20.x` - Detailed test results (Node 20)

You can download these from the GitHub Actions page.

### Setup Instructions

1. **Initialize Git** (if not already done):
   ```bash
   cd /Users/srinivasgopinath/Projects/Playwrightmcp
   git init
   ```

2. **Add all files**:
   ```bash
   git add .
   ```

3. **Create initial commit**:
   ```bash
   git commit -m "Initial commit: Add Playwright test suite with CI/CD"
   ```

4. **Add remote** (replace with your repo URL):
   ```bash
   git remote add origin https://github.com/your-username/your-repo.git
   ```

5. **Push to GitHub**:
   ```bash
   git push -u origin main
   ```

### Viewing Workflow Results

1. Go to your GitHub repository
2. Click **"Actions"** tab
3. Select a workflow run
4. View test results and download artifacts

### Local Testing Before Push

Test locally before pushing to ensure tests pass:

```bash
# Run all tests
npm test

# Run specific test file
npx playwright test tests/search-tshirts.spec.ts

# Run in UI mode
npm run test:ui

# Run in debug mode
npm run test:debug
```

### Troubleshooting CI/CD

**If tests fail in CI but pass locally:**
- Check Node.js version differences
- Verify environment variables
- Check for timing issues (add more wait times if needed)
- Review browser differences

**To debug a specific branch:**
1. Push to a feature branch
2. Create a Pull Request
3. Check Actions tab for the workflow run
4. Review logs and artifacts

### Customizing the Workflow

Edit `.github/workflows/playwright.yml` to:
- Add more branches: Update `on.push.branches` and `on.pull_request.branches`
- Change Node versions: Modify `matrix.node-version`
- Add more browsers: Update `playwright.config.ts`
- Change retention: Adjust `retention-days`
- Add Slack notifications: Add a step with Slack webhook

### Example: Add Slack Notification

Add this step to `.github/workflows/playwright.yml`:

```yaml
- name: Notify Slack
  if: failure()
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
    payload: |
      {
        "text": "Playwright tests failed on ${{ github.repository }}"
      }
```

Then add your Slack webhook as a GitHub secret.

### Next Steps

1. **Set up the repository** on GitHub
2. **Push code** to trigger the workflow
3. **Monitor Actions** for test results
4. **Configure notifications** (email, Slack, etc.)
5. **Add branch protection** requiring tests to pass before merge

### Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Playwright Documentation](https://playwright.dev)
- [Upload Artifact Action](https://github.com/actions/upload-artifact)
