export interface ShieldVerifyResponse {
    success: boolean;
    remaining?: number;
    error?: string;
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