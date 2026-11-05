export interface Lead {
  firstName: string;
  lastName: string;
  company: string;
}

export function buildLead(overrides: Partial<Lead> = {}): Lead {
  return {
    firstName: 'Robot',
    lastName: `Teste ${Date.now()}`,
    company: 'OmniQA',
    ...overrides,
  };
}