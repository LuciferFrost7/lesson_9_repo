// @ts-check
import { expect, test } from "@playwright/test";

test.describe("API tests for Restful-booker", () => {
    const baseURL = "https://restful-booker.herokuapp.com";

    test("Get list of booking IDs", async ({ request }) => {
        // Send a GET request
        const response = await request.get(`${baseURL}/booking`);

        // Check 1: Response status code
        console.log(`Status code: ${response.status()}`);
        expect(response.status()).toBe(200);

        // Check 2: Response body is not empty
        const responseBody = await response.json();
        console.log("Response body:", responseBody);

        expect(responseBody.length).toBeGreaterThan(0);

        // Check 3: The response contains objects with the key 'bookingid'
        expect(responseBody[0]).toHaveProperty("bookingid");
    });
});
