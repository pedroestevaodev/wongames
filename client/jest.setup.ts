import '@testing-library/jest-dom/jest-globals';
import 'jest-styled-components';
import dotenv from 'dotenv';
import { TextEncoder, TextDecoder } from 'text-encoding';
import { TransformStream } from 'web-streams-polyfill';

dotenv.config({
    path: '.env.development',
});

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.TransformStream = TransformStream;

// Configuração do BroadcastChannel (usando jsdom)
if (typeof global.BroadcastChannel === 'undefined') {
    class MockBroadcastChannel {
        name: string;
        constructor(name: string) {
            this.name = name;
        };
        postMessage() { };
        close() { };
        onmessage() { };
        onmessageerror() { };
    };

    global.BroadcastChannel = MockBroadcastChannel as unknown as typeof BroadcastChannel;
}

jest.mock('@apollo/client', () => ({
    ...jest.requireActual('@apollo/client'),
    useQuery: jest.fn(),
    useMutation: jest.fn(),
}));