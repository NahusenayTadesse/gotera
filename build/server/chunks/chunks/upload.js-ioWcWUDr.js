import { b as private_env } from './shared-server.js-9-2j12mp.js';
import fs__default from 'node:fs';
import { Readable } from 'node:stream';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import { randomUUID } from 'crypto';

//#region src/lib/server/upload.ts
var FILES_DIR = private_env.FILES_DIR ?? ".tempFiles";
if (!fs__default.existsSync(FILES_DIR)) fs__default.mkdirSync(FILES_DIR, { recursive: true });
/** Image types the dashboard accepts, mapped to the extension we store them under. */
var ALLOWED_TYPES = {
	"image/jpeg": ".jpg",
	"image/png": ".png",
	"image/webp": ".webp",
	"image/gif": ".gif",
	"image/avif": ".avif"
};
/** Extension -> MIME type, for serving what `saveUploadedFile` wrote back out. */
var SERVED_TYPES = Object.fromEntries(Object.entries(ALLOWED_TYPES).map(([type, ext]) => [ext, type]));
/** 10 MB — comfortably above a compressed product photo. */
var MAX_BYTES = 10 * 1024 * 1024;
/**
* Save an uploaded image and return the stored file name.
*
* The extension comes from the validated MIME type, never from the client's file name,
* so an upload can't land on disk as `.html` or `.svg` and later be served as a page
* that runs script on our origin.
*
* @param file  File object coming from formData
* @returns     The generated file name (with extension) that was written to disk
* @throws      If the file is missing, too large, not an allowed image type, or the write fails
*/
async function saveUploadedFile(file) {
	if (!file || file.size === 0) throw new Error("No file uploaded");
	if (file.size > MAX_BYTES) throw new Error("File is too large");
	const ext = ALLOWED_TYPES[file.type];
	if (!ext) throw new Error(`Unsupported file type: ${file.type || "unknown"}`);
	const fileName = `${randomUUID()}${ext}`;
	const target = path.join(FILES_DIR, fileName);
	await pipeline(Readable.fromWeb(file.stream()), fs__default.createWriteStream(target));
	return fileName;
}
/**
* Resolve a stored upload name to its path on disk, or null if it isn't one of ours.
*
* Only names shaped like `saveUploadedFile` output (a UUID plus an allowed image
* extension) are accepted, so a request can't walk out of FILES_DIR or read anything
* that wasn't uploaded through the dashboard.
*/
function uploadedFilePath(name) {
	const match = /^[0-9a-f-]{36}(\.[a-z]+)$/i.exec(name);
	const type = match && SERVED_TYPES[match[1].toLowerCase()];
	if (!type) return null;
	const target = path.join(FILES_DIR, name);
	return fs__default.existsSync(target) ? {
		path: target,
		type
	} : null;
}

export { saveUploadedFile as s, uploadedFilePath as u };
//# sourceMappingURL=upload.js-ioWcWUDr.js.map
