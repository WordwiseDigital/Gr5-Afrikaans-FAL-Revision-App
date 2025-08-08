import os
from playwright.sync_api import sync_playwright, expect

def run_verification():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # 1. Navigate to the local index.html file
        page.goto('file://' + os.path.abspath('index.html'))

        # 2. Take a screenshot of the initial screen
        page.screenshot(path='jules-scratch/verification/01_initial_screen.png')

        # 3. Click on a topic button
        page.get_by_text("Voornaamwoorde").click()

        # 4. Click on the start button
        page.get_by_text("Begin Speletjie").click()

        # 5. Take a screenshot of the game screen with the first question
        expect(page.get_by_text("Kies die korrekte voornaamwoord: '___ het die boek gelees.'")).to_be_visible()
        page.screenshot(path='jules-scratch/verification/02_question_screen.png')

        # 6. Click on an answer
        page.get_by_role("button", name="Ek").click()

        # 7. Take a screenshot of the screen with the feedback
        expect(page.get_by_text("Reg!")).to_be_visible()
        page.screenshot(path='jules-scratch/verification/03_feedback_screen.png')

        browser.close()

if __name__ == '__main__':
    run_verification()
