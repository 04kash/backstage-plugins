import { KeycloakAdminClientMock } from '../../__fixtures__/helpers'; // Adjust the import path if necessary

export const dynamicImport = jest.fn(async () => ({
  default: KeycloakAdminClientMock,
}));
