import fs from 'node:fs';
import { Readable } from 'node:stream';
import { error } from '@sveltejs/kit';
import { uploadedFilePath } from '$lib/server/upload';
import type { RequestHandler } from './$types';

/**
 * Serves images uploaded through the dashboard (add-on photos and the like).
 *
 * File names are random UUIDs and never reused, so a response can be cached forever.
 * `nosniff` stops a browser second-guessing the image type we send.
 */
export const GET: RequestHandler = async ({ params }) => {
	const file = uploadedFilePath(params.name);
	if (!file) error(404, 'Not found');

	const { size } = await fs.promises.stat(file.path);
	const body = Readable.toWeb(fs.createReadStream(file.path)) as ReadableStream;

	return new Response(body, {
		headers: {
			'content-type': file.type,
			'content-length': String(size),
			'cache-control': 'public, max-age=31536000, immutable',
			'x-content-type-options': 'nosniff'
		}
	});
};
