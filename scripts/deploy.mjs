import {exec} from 'child_process';

process.env.PATH_PREFIX = 'aaa';
exec('gatsby build --prefix-paths', (error, stdout, stderr) => {
  console.log(stdout);
});
