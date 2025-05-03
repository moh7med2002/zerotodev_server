import { unlink } from 'fs/promises';
import { join } from 'path';

export async function removeImage(imagePath: string) {
    if (!imagePath) return;

    const fullPath = join(process.cwd(), 'public', imagePath);
    try {
        await unlink(fullPath);
        console.log(`Deleted image: ${fullPath}`);
    } catch (err) {
        console.warn(`Failed to delete image: ${fullPath}`, err.message);
    }
}
