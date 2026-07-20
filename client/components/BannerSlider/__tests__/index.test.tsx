import '@/.jest/match-media.mock';
import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import BannerSlider from "@/components/BannerSlider";
import bannerSliderItems from "../mocks/mock";

describe('<BannerSlider />', () => {
    it('should render vertical slider', () => {
        const { container } = render(<BannerSlider items={bannerSliderItems} />);
        
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        expect(container.querySelector('.slick-vertical')).toBeInTheDocument();
    });

    it('should render with 1 active item', () => {
        render(<BannerSlider items={bannerSliderItems} />);

        expect(screen.getAllByRole('listitem')).toHaveLength(3);
        expect(screen.getAllByRole('listitem').filter(item => item.classList.contains('slick-active'))).toHaveLength(1);

        expect(
            screen.getByRole('heading', { name: /defy death 1/i, hidden: false })
        ).toBeInTheDocument();

        expect(
            screen.queryByRole('heading', { name: /defy death 2/i, hidden: true })
        ).not.toBeInTheDocument();
    });

    it('should render with the dots', () => {
        render(<BannerSlider items={bannerSliderItems} />);

        expect(screen.getByRole('list')).toBeInTheDocument();
    });
});