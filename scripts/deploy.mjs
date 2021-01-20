import {exec} from 'child_process';

process.env.PATH_PREFIX = 'aaa';
exec('gatsby build --prefix-paths', (error, stdout, stderr) => {
  if (error || stderr) {
    console.error(error);
    process.exit(1);
  }
  console.log(stdout);
});
