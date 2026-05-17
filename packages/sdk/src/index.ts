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

export class ShieldLimit {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, options?: { baseUrl?: string }) {
    this.apiKey = apiKey;
    // defaults to  prod api but allows local testing
    //will add baseurl once it deployed
    this.baseUrl = options?.baseUrl || "https://rate-limiter-swart.vercel.app/api/v1";
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
      success: response.ok,
      status: response.status,
      remaining: data.remaining,
      limit: data.limit,
      reset: data.reset,
      retryAfter: data.retryAfter, 
      error: data.error,
      message: data.message,
    };
    } catch (error) {
  
      return {
        success: false,
        error: "Could not connect to SDK server",
        status: 500,
      };
    }
  }
}