import { Download } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

export class DownloadHelper {
    /**
     * Accepts a Playwright Download object, saves it locally, and verifies its existence/name.
     */
    static async verifyAndSaveDownload(download: Download, targetDirectory: string): Promise<string> {
        const fileName = download.suggestedFilename();
        const fullSavePath = path.join(targetDirectory, fileName);

        // Ensure target directory exists cleanly
        if (!fs.existsSync(targetDirectory)) {
            fs.mkdirSync(targetDirectory, { recursive: true });
        }

        // Save the downloadable stream to path
        await download.saveAs(fullSavePath);

        // Explicit Assertion: Assert that file physically exists on the disk space
        if (!fs.existsSync(fullSavePath)) {
            throw new Error(`Downloaded file verification failed: ${fileName} was not found at path.`);
        }

        return fileName;
    }
}