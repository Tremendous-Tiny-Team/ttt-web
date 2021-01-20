import {exec} from 'child_process';
import * as ghPages from 'gh-pages';

const deployEnv = 'lab'
process.env.PATH_PREFIX = deployEnv;

exec('gatsby build --prefix-paths', (error, stdout, stderr) => {
  if (error || stderr) {
    console.error(error);
    process.exit(1);
  }

  console.log(stdout);

  ghPages.publish('public', {
    branch: 'public/gh-pages',
    dest: deployEnv,
    tag: deployVersion || '',
    message: `Build from ${branch} ${commitHash}`,
    user: {
      name: authorName,
      email: authorEmail,
    },
  });
});
