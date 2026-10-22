// @ts-check
import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test.describe("API tests for Restful-booker", () => {
    const BASE_URL = "https://restful-booker.herokuapp.com";
    const BOOKING_DATA = {
        firstname: "Test",
        lastname: "User",
        totalprice: 100,
        depositpaid: true,
        bookingdates: {
            checkin: "2026-01-01",
            checkout: "2027-01-01",
        },
        additionalneeds: "Breakfast",
    };

    /**
     * @type {string | undefined}
     */
    let sharedBookingId;

    test("Create a booking", async ({ request }) => {
        const response = await request.post(`${BASE_URL}/booking`, {
            data: BOOKING_DATA,
            headers: { "Content-Type": "application/json" },
        });

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody).toHaveProperty("bookingid");
        expect(responseBody.booking).toMatchObject(BOOKING_DATA);

        sharedBookingId = responseBody.bookingid;
    });

    test("Get booking information", async ({ request }) => {
        const responseUrl = `${BASE_URL}/booking/${sharedBookingId}`;

        const response = await request.get(responseUrl);

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody).toMatchObject(BOOKING_DATA);
    });
});
