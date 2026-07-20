export const ApolloNextAppProvider = ({ children }: { children: React.ReactNode }) => children;

jest.mock('@apollo/client', () => ({
    ...jest.requireActual('@apollo/client'),
    useQuery: jest.fn(),
    gql: jest.fn(),
    useMutation: jest.fn(() => [jest.fn(), { loading: false, error: null }]),
}));