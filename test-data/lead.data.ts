export interface Lead {
  lastName: string;
  company: string;
}

export function buildLead(overrides: Partial<Lead> = {}): Lead {
  return {
    lastName: `Teste ${Date.now()}`,
    company: "OmniQA",
    ...overrides,
  };
}
