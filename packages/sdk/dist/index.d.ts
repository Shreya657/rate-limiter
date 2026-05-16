export interface ShieldVerifyResponse {
    success: boolean;
    remaining?: number;
    limit?: number;
    reset?: number;
    retryAfter?: number;
    error?: string;
    message?: string;
    status: number;
}
export declare class ShieldLimit {
    private apiKey;
    private baseUrl;
    constructor(apiKey: string, options?: {
        baseUrl?: string;
    });
    verify(): Promise<ShieldVerifyResponse>;
}
//# sourceMappingURL=index.d.ts.map