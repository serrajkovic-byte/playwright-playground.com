import type { APIRequestContext, APIResponse } from '@playwright/test';

export type ApiRequestOptions = NonNullable<Parameters<APIRequestContext['get']>[1]>;

export class BaseApiClient {
  private readonly baseUrl: URL;

  constructor(
    protected readonly request: APIRequestContext,
    baseUrl: string,
  ) {
    this.baseUrl = new URL(baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`);
  }

  protected get(path: string, options?: ApiRequestOptions): Promise<APIResponse> {
    return this.request.get(this.resolveUrl(path), options);
  }

  protected post(path: string, options?: ApiRequestOptions): Promise<APIResponse> {
    return this.request.post(this.resolveUrl(path), options);
  }

  protected put(path: string, options?: ApiRequestOptions): Promise<APIResponse> {
    return this.request.put(this.resolveUrl(path), options);
  }

  protected patch(path: string, options?: ApiRequestOptions): Promise<APIResponse> {
    return this.request.patch(this.resolveUrl(path), options);
  }

  protected delete(path: string, options?: ApiRequestOptions): Promise<APIResponse> {
    return this.request.delete(this.resolveUrl(path), options);
  }

  private resolveUrl(path: string): string {
    return new URL(path, this.baseUrl).toString();
  }
}
