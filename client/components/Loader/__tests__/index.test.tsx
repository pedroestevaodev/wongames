import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import Loader from "@/components/Loader";

describe('<Loader />', () => {
    it('Should render correctly', () => {
        render(<Loader />);

        expect(screen.getByTitle(/loading/i)).toBeInTheDocument();
    });
});