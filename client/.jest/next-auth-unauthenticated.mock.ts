jest.mock('@/services/auth', () => ({
    auth: jest.fn(() => Promise.resolve(null)),
}));

jest.mock('next-auth/react', () => ({
    useSession: jest.fn(() => ({
        data: null,
        status: 'unauthenticated',
        update: jest.fn(),
    })),
    signIn: jest.fn(),
    signOut: jest.fn(),
    getSession: jest.fn(),
}));