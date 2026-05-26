
import {test,expect} from '@playwright/test'
import {filePage} from '../pages/filePage'
import { DownloadHelper } from '../utils/downloadHelper';
import * as path from 'path';


test.describe('Consark.ai QA Assignment - File Upload & Download Workflow', () => {
    const csvPath = path.resolve(__dirname, '../test-data/sample.csv');
    const pngPath = path.resolve(__dirname, '../test-data/image.jpg');
    const pdfPath = path.resolve(__dirname, '../test-data/document.pdf');
    const downloadDir = path.resolve(__dirname, '../downloads');

        test('execute multi-file handling suite', async ({page}) => {
           console.log("Looking for CSV at:", csvPath);
            
            const FilePage = new filePage(page)

            //scenario-1
            await FilePage.navigateToApp()
            await FilePage.uploadFile(csvPath);
            await FilePage.verifyUploadSuccess(); // Validates CSV Success message explicitly
            await FilePage.navigateToNextPage()

            // --- SCENARIO 2: Upload Additional Files via Contextual Menu ---
        // Handle image.png upload execution
        await filePage.openMoreMenu();
        await filePage.clickAddFile();
        await filePage.uploadFile(pngPath);
        await filePage.verifyUploadSuccess();

        // Handle document.pdf upload execution
        await filePage.openMoreMenu();
        await filePage.clickAddFile();
        await filePage.uploadFile(pdfPath);
        await filePage.verifyUploadSuccess();

        // --- SCENARIO 3: Download and Asset Validations ---
        const downloadEvent = await filePage.clickDownloadAll();
        
        // Save the artifact and perform file presence checks
        const savedFileName = await DownloadHelper.verifyAndSaveDownload(downloadEvent, downloadDir);
        
        // Final Assertion confirming non-empty naming conventions matching the system expectations
        expect(savedFileName).toBeTruthy();
        console.log(`Successfully verified and archived download instance: ${savedFileName}`);
        })
})
