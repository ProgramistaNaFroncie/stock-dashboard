import { NextRouter } from "next/router";

export const createMockRouter = (router: Partial<NextRouter>): NextRouter => ({
  basePath: "",
  pathname: "",
  route: "",
  asPath: "",
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  prefetch: jest.fn().mockResolvedValue(undefined),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn(),
  },
  isFallback: false,
  isReady: true,
  isLocaleDomain: false,
  isPreview: false,
  ...router,
});

export const createMockUser = () => ({
  uid: "123",
  email: "test@wp.pl",
  emailVerified: true,
  displayName: "Bartosz Szafarek",
  isAnonymous: false,
  providerData: [],
  phoneNumber: null,
  photoURL: null,
  metadata: {
    creationTime: "123",
    lastSignInTime: "123",
  },
  refreshToken: "test",
  tenantId: null,
  providerId: "",
  delete: jest.fn(),
  getIdToken: jest.fn().mockResolvedValue("testIdToken"),
  getIdTokenResult: jest.fn(),
  reload: jest.fn(),
  toJSON: jest.fn(),
});
