"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShieldLimit = void 0;
class ShieldLimit {
    constructor(apiKey, options) {
        this.apiKey = apiKey;
        // defaults to  prod api but allows local testing
        this.baseUrl = options?.baseUrl || "http://localhost:3000/api/v1";
    }
    async verify() {
        try {
            const response = await fetch(`${this.baseUrl}/verify`, {
                method: "POST",
                headers: {
                    "x-shield-key": this.apiKey, // Your custom header
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            return {
                success: response.ok, // status 200-299
                remaining: data.remaining,
                error: data.error,
                status: response.status,
            };
        }
        catch (error) {
            return {
                success: false,
                error: "Could not connect to ShieldLimit",
                status: 500,
            };
        }
    }
}
exports.ShieldLimit = ShieldLimit;
