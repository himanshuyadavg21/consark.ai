import {Page, Locator, expect} from '@playwright/test';

export class filePage {
    readonly page : Page
    readonly uploadInput: Locator
    readonly uploadSuccessMessage: Locator;
    readonly copyLinkButton: Locator;
    readonly threeDotsMenu: Locator;
    readonly addFileOption: Locator;
    readonly downloadAllButton: Locator;

    constructor(page: Page){
        this.page = page
        this.uploadInput = page.locator("//label[@for='select-files-input']")

        this.uploadSuccessMessage = page.locator("//p[@class='type-d-50 text-green-800']")
        this.copyLinkButton = page.locator('button:has-text("Copy Link"), .btn-success')
        this.threeDotsMenu = page.locator('[aria-label="menu"], .three-dots-icon, .menu-trigger')
        this.addFileOption = page.locator('text=Add File, .menu-item:has-text("Add File")')
        this.downloadAllButton = page.locator('button:has-text("Download All")')
    }

    async navigateToApp() {
        await this.page.goto('/')
        await this.page.waitForLoadState('networkidle')
    }

    async uploadFile(filePath : string) {
        await this.uploadInput.setInputFiles(filePath)
    }

    async verifyUploadSuccess(message?: string) {
        await this.page.waitForLoadState('load');
        const successElement = this.page.locator('text=/uploaded/i, text=/complete/i, text=/success/i, text=/share/i');
    
    // Assert that at least one of these indicator states becomes visible
        await expect(successElement.first()).toBeVisible({ timeout: 15000 });
    }

    async navigateToNextPage() {
        await expect(this.copyLinkButton).toBeVisible()
    }
    async openMoreMenu() {
        await this.threeDotsMenu.click()
        await this.addFileOption.waitFor({state : 'visible'})

    }

    async clickAddFile() {
        await this.addFileOption().click()
    }

    async clickDownloadAll() {
        const downloadPromise = this.page.waitForEvent('download')
        await this.downloadAllButton().click()
        return downloadPromise

    }


}