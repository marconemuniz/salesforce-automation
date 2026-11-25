import { APIRequestContext, expect } from "@playwright/test";
import { requireEnv } from "../utils/env";

export class LeadApi {
  readonly api: APIRequestContext;
  readonly basePath: string;

  constructor(api: APIRequestContext) {
    this.api = api;
    this.basePath = `/services/data/${requireEnv("SF_API_VERSION")}`;
  }

  async findIdsByLastName(lastName: string): Promise<string[]> {
    const safeName = lastName.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
    const soql = `SELECT Id FROM Lead WHERE LastName = '${safeName}'`;

    const response = await this.api.get(`${this.basePath}/query`, {
      params: { q: soql },
    });
    expect(
      response.ok(),
      `${response.status()} ${new URL(response.url()).pathname} ${await response.text()}`,
    ).toBeTruthy();

    const body = await response.json();
    return body.records.map((record: { Id: string }) => record.Id);
  }

  async deleteById(id: string) {
    const response = await this.api.delete(
      `${this.basePath}/sobjects/Lead/${id}`,
    );
    expect(response.status(), await response.text()).toBe(204);
  }

  async deleteByLastName(lastName: string) {
    const ids = await this.findIdsByLastName(lastName);
    for (const id of ids) {
      await this.deleteById(id);
    }
  }
}
