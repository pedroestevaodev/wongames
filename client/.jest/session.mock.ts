import { useSession } from 'next-auth/react';

jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
}));

const session = {
    user: { 
        email: 'loren@ipsum.com',
        jwt: '123',
    },
    expires: '9999-12-31T23:59:59.999Z',
};

(useSession as jest.Mock).mockReturnValue({
    data: session,
    status: 'authenticated',
});