import FormResetPassword from "@/components/FormResetPassword"
import Auth from "@/components/Layouts/Auth"

const ResetPasswordPage = () => {
    return (
        <Auth title="Reset password">
            <FormResetPassword />
        </Auth>
    );
};

export default ResetPasswordPage;