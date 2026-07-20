jest.mock('@/services/auth', () => ({
    auth: jest.fn(() => Promise.resolve(null)),
}));

jest.mock('next-auth/react', () => {
    const actual = jest.requireActual('next-auth/react');

    return {
        ...actual,
        useSession: jest.fn(() => ({
            data: {
                user: {
                    id: '1',
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                },
            },
            status: 'authenticated',
            update: jest.fn(),
        })),
        signIn: jest.fn(),
        signOut: jest.fn(),
        getSession: jest.fn(),
    };
});