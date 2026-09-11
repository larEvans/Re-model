import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const isUserOrOrgPagesRepo = repositoryName.endsWith('.github.io');

const basePath = isGitHubActions
  ? (isUserOrOrgPagesRepo ? '/' : `/${repositoryName}/`)
  : '/';

export default defineConfig({
  plugins: [react()],
  base: basePath,
});
