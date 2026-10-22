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
    const UPDATED_BOOKING_DATA = {
        firstname: "Test2",
        lastname: "User2",
        totalprice: 200,
        depositpaid: true,
        bookingdates: {
            checkin: "2024-02-03",
            checkout: "2025-03-04",
        },
        additionalneeds: "Dinner",
    };

    /**
     * @type {string | undefined}
     */
    let sharedBookingId;
    /**
     * @type {string | undefined}
     */
    let sharedAuthToken;

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

    /*
    ! В задании в качестве примера изменения указано, что можно выбрать
    ! только firstName и totalPrice, однако же PUT это полная замена объекта,
    ! а не частичная, поэтому я заменил объект полностью.
    */
    test("Update a booking ", async ({ request }) => {
        const USER_DATA = {
            username: "admin",
            password: "password123",
        };

        const tokenResponse = await request.post(`${BASE_URL}/auth`, {
            data: USER_DATA,
            headers: {
                "Content-Type": "application/json",
            },
        });

        expect(tokenResponse.ok()).toBeTruthy();
        expect(tokenResponse.status()).toBe(200);

        const authToken = (await tokenResponse.json()).token;

        const responseUrl = `${BASE_URL}/booking/${sharedBookingId}`;

        const putResponse = await request.put(responseUrl, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Cookie: `token=${authToken}`,
            },
            data: UPDATED_BOOKING_DATA,
        });

        expect(putResponse.ok()).toBeTruthy();
        expect(putResponse.status()).toBe(200);

        const putResponseBody = await putResponse.json();

        expect(putResponseBody).toMatchObject(UPDATED_BOOKING_DATA);

        sharedAuthToken = authToken;
    });

    test("Delete a booking", async ({ request }) => {
        const responseUrl = `${BASE_URL}/booking/${sharedBookingId}`;

        /**
         * @param {string} url
         * @param {string | undefined} token
         */
        const sendDeleteRequest = async (url, token) =>
            await request.delete(url, {
                headers: {
                    Cookie: `token=${token}`,
                },
            });

        const response = await sendDeleteRequest(responseUrl, sharedAuthToken);

        expect(response.ok()).toBeTruthy();
        expect(response.status()).toBe(201);

        const repeatedResponse = await sendDeleteRequest(responseUrl, sharedAuthToken);

        expect(repeatedResponse.ok()).toBeFalsy();
        expect(repeatedResponse.status()).toBe(405);
    });
});
