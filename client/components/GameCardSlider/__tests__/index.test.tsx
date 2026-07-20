import '@/.jest/match-media.mock';
import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import GameCardSlider from "@/components/GameCardSlider";
import gameCardSliderItems from "../mocks/mock";


describe('<GameCardSlider />', () => {
    it('should render with 4 active items', () => {
        const { container } = render(<GameCardSlider items={gameCardSliderItems} />);
        // eslint-disable-next-line testing-library/no-container
        expect(container.querySelectorAll('.slick-active')).toHaveLength(4);
    });

    it('should render white arrows if color passed', () => {
        render(<GameCardSlider items={gameCardSliderItems} color="white" />);

        expect(screen.getByLabelText(/previous games/i)).toHaveStyle({
            color: 'white'
        });
        expect(screen.getByLabelText(/next games/i)).toHaveStyle({
            color: 'white'
        });
    });
});