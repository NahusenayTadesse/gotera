import { u as uploadedFilePath } from '../../../../chunks/upload.js-ioWcWUDr.js';
import { v as error } from '../../../../chunks/utils.js-BQt5v-8G.js';
import fs__default from 'node:fs';
import { Readable } from 'node:stream';
import '../../../../chunks/shared-server.js-9-2j12mp.js';
import 'node:path';
import 'node:stream/promises';
import 'crypto';
import '../../../../chunks/shared.js-CgqsOrws.js';

//#region src/routes/files/[name]/+server.ts
/**
* Serves images uploaded through the dashboard (add-on photos and the like).
*
* File names are random UUIDs and never reused, so a response can be cached forever.
* `nosniff` stops a browser second-guessing the image type we send.
*/
var GET = async ({ params }) => {
	const file = uploadedFilePath(params.name);
	if (!file) error(404, "Not found");
	const { size } = await fs__default.promises.stat(file.path);
	const body = Readable.toWeb(fs__default.createReadStream(file.path));
	return new Response(body, { headers: {
		"content-type": file.type,
		"content-length": String(size),
		"cache-control": "public, max-age=31536000, immutable",
		"x-content-type-options": "nosniff"
	} });
};

export { GET };
//# sourceMappingURL=_server.ts.js-BqRn0I4K.js.map
