"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShieldLimit = void 0;
class ShieldLimit {
    constructor(apiKey, options) {
        this.apiKey = apiKey;
        // defaults to  prod api but allows local testing
        //will add baseurl once it deployed
        this.baseUrl = options?.baseUrl || "http://localhost:3000/api/v1";
    }
    async verify() {
        try {
            const response = await fetch(`${this.baseUrl}/verify`, {
                method: "POST",
                headers: {
                    "x-shield-key": this.apiKey, //  custom header
                    "Content-Type": "application/json",
                    "Origin": typeof window !== "undefined" ? window.location.origin : "server-side-sdk",
                },
            });
            const data = await response.json();
            return {
                success: response.ok,
                status: response.status,
                remaining: data.remaining,
                limit: data.limit,
                reset: data.reset,
                retryAfter: data.retryAfter,
                error: data.error,
                message: data.message,
            };
        }
        catch (error) {
            return {
                success: false,
                error: "Could not connect to SDK server",
                status: 500,
            };
        }
    }
}
exports.ShieldLimit = ShieldLimit;
