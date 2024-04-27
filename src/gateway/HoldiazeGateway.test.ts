import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { HolidazeGateWay } from '../gateway/HolidazeGateway';

import type { Venue } from "../types/types";

const holidazeGateWay = new HolidazeGateWay();

describe('HolidazeGateWay', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
    });

    it('should handle login correctly', async () => {
        const mockFetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ data: { token: "fake_token" }, message: "success!", success: true })
            })
        );
        vi.stubGlobal('fetch', mockFetch);

        const formData = new FormData();
        formData.append('username', 'testuser');
        formData.append('password', 'testpassword');

        const response = await holidazeGateWay.login(formData);

        expect(response.success).toBe(true);
        expect(response.data.token).toEqual("fake_token");
        expect(mockFetch).toHaveBeenCalled();
    });

    it('should handle errors during login', async () => {
        const mockFetch = vi.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ errors: [{ message: 'Invalid credentials' }] })
            })
        );
        vi.stubGlobal('fetch', mockFetch);

        const formData = new FormData();
        formData.append('username', 'testuser');
        formData.append('password', 'wrongpassword');

        await expect(holidazeGateWay.login(formData)).rejects.toThrow('Invalid credentials');

        expect(mockFetch).toHaveBeenCalled();
    });

    it('successfully retrieves venues', async () => {
        const mockFetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ data: [{ id: 1, name: "Beach Resort" }], success: true })
            })
        );
        vi.stubGlobal('fetch', mockFetch);

        let data: Array<Venue>;
        const response = await holidazeGateWay.getVenues({ query: "" });
        if (Array.isArray(response?.data)) {
            data = response.data;
        } else {
            data = [];
        }
        expect(data).toHaveLength(1);
        expect(data[0]).toEqual({ id: 1, name: "Beach Resort" });
        expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it('should register a new user', async () => {
        const mockFetch = vi.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ data: { token: "fake_token" }, message: "success!", success: true })
            })
        );
        vi.stubGlobal('fetch', mockFetch);

        const formData = new FormData();
        formData.append('name', 'testuser');
        formData.append('password', 'testpassword');
        formData.append("email", "testemail")


        const response = await holidazeGateWay.register(formData);

        expect(response.success).toBe(true);
        expect(response.data.token).toEqual("fake_token");
        expect(mockFetch).toHaveBeenCalled();
    });

});
