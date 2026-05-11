export interface ShieldVerifyResponse {
  success: boolean;
  remaining?: number;
  error?: string;
  status: number;
}

export class ShieldLimit {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, options?: { baseUrl?: string }) {
    this.apiKey = apiKey;
    // defaults to  prod api but allows local testing
    this.baseUrl = options?.baseUrl || "http://localhost:3000/api/v1";
  }

  
  async verify(): Promise<ShieldVerifyResponse> {
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
        success: response.ok, // status 200-299
        remaining: data.remaining,
        error: data.error,
        status: response.status,
      };
    } catch (error) {
  
      return {
        success: false,
        error: "Could not connect to ShieldLimit",
        status: 500,
      };
    }
  }
}