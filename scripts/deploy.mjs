import { exec } from 'child_process';
import * as ghPages from 'gh-pages';

const branch = process.env.GITHUB_REF.replace('refs/heads/', '');
console.log(branch);
const deployEnv = branch.match(
  /^main|^release|^production|^hotfix|^lab-\d+/
)?.[0];
const deployVersion = deployEnv?.search(/release|production|hotfix/)
  ? branch.split('/')?.[0]
  : null;

process.env.PATH_PREFIX = deployEnv;

exec('gatsby build --prefix-paths', (error, stdout, stderr) => {
  if (error || stderr) {
    console.error(error);
    process.exit(1);
  }

  console.log(stdout);

  ghPages.publish(
    'public',
    {
      user: {
        name: process.env.GITHUB_ACTOR,
        email: 'victor77.dev@gmail.com',
      },
      repo: `https://${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git`,
      branch: 'public/gh-pages',
      dest: deployEnv,
      tag: deployVersion || '',
      message: `Build from ${branch} ${process.env.GITHUB_SHA}`,
    },
    (data) => {
      console.log(data);
    }
  );
  console.log({
    user: {
      name: process.env.GITHUB_ACTOR,
      email: 'victor77.dev@gmail.com',
    },
    repo: `https://${process.env.GITHUB_TOKEN}@github.com/${process.env.GITHUB_REPOSITORY}.git`,
    branch: 'public/gh-pages',
    dest: deployEnv,
    tag: deployVersion || '',
    message: `Build from ${branch} ${process.env.GITHUB_SHA}`,
  });
});
