import FormForgotPassword from "@/components/FormForgotPassword"
import Auth from "@/components/Layouts/Auth"

const ForgotPasswordPage = () => {
    return (
        <Auth title="Request new password">
            <FormForgotPassword />
        </Auth>
    );
};

export default ForgotPasswordPage;