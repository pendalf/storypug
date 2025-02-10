import { resolve  } from 'path';
import bundle from 'microbundle';
import { deleteAsync } from 'del';
(async function() {
  const cwd = resolve(process.cwd(), '');

  try {
    await deleteAsync(['dist/**/*'], { cwd });
    const output = await bundle({
      entries: ['./src/index.js'],
      format: 'cjs,es',
      cwd,
    });
    console.log(output);
  } catch (err) {
    console.error(err);
  }
})();
