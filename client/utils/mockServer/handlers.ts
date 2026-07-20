import { http, HttpResponse } from 'msw';

type LoginReqBody = {
    email: string;
};

type ResetReqBody = {
    code: string
    password: string
    passwordConfirmation: string
};

const mockErrorResponse = (message: string) => ({
    error: 'Bad Request',
    message: [{
        messages: [{ message }],
    }],
});

export const handlers = [
    http.post<LoginReqBody>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/forgot-password`,
        async ({ request }) => {
            let body: LoginReqBody;

            try {
                body = (await request.json()) as LoginReqBody;
            } catch {
                return HttpResponse.json(mockErrorResponse('Invalid request body'), { status: 400 });
            }

            const { email } = body;

            if (email === "false@email.com") {
                return HttpResponse.json(mockErrorResponse('This email does not exist'), { status: 400 });
            }

            return HttpResponse.json({ ok: true }, { status: 200 });
        }
    ),

    http.post<ResetReqBody>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reset-password`,
        async ({ request }) => {
            let body: ResetReqBody;

            try {
                body = (await request.json()) as ResetReqBody;
            } catch {
                return HttpResponse.json(mockErrorResponse('Invalid request body'), { status: 400 });
            }

            const { code } = body;

            if (code === "wrong_code") {
                return HttpResponse.json(mockErrorResponse('Incorrect code provided.'), { status: 400 });
            }

            return HttpResponse.json({ user: 'valid@email.com' }, { status: 200 });
        }
    ),
];