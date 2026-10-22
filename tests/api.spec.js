// @ts-check
import { expect, test } from "@playwright/test";

test.describe.configure({ mode: "serial" });

test.describe("API tests for Restful-booker", () => {
    const BASE_URL = "https://restful-booker.herokuapp.com";

    /**
     * @type {string | undefined}
     */
    let sharedBookingId;

    test("Create a booking", async ({ request }) => {
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

        const response = await request.post(`${BASE_URL}/booking`, {
            data: BOOKING_DATA,
            headers: { "Content-Type": "application/json" },
        });

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(200);

        const responseBody = await response.json();

        expect(responseBody).toHaveProperty("bookingid");

        expect(responseBody.booking.firstname).toBe(BOOKING_DATA.firstname);
        expect(responseBody.booking.lastname).toBe(BOOKING_DATA.lastname);
        expect(responseBody.booking.totalprice).toBe(BOOKING_DATA.totalprice);
        expect(responseBody.booking.depositpaid).toBe(BOOKING_DATA.depositpaid);
        expect(responseBody.booking.bookingdates.checkin).toBe(BOOKING_DATA.bookingdates.checkin);
        expect(responseBody.booking.bookingdates.checkout).toBe(BOOKING_DATA.bookingdates.checkout);
        expect(responseBody.booking.additionalneeds).toBe(BOOKING_DATA.additionalneeds);

        sharedBookingId = responseBody.bookingid;
    });
});
