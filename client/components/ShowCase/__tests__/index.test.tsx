import '@/.jest/match-media.mock';
import { render, screen } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import Showcase from "@/components/ShowCase";
import highlightItems from "@/components/Highlight/mocks/mock";
import gameCardSliderItems from "@/components/GameCardSlider/mocks/mock";

const props = {
    title: 'Most Popular',
    highlight: highlightItems,
    games: gameCardSliderItems.slice(0, 1)
}

describe('<Showcase />', () => {
    it('should render full showcase', () => {
        render(<Showcase {...props} />)

        expect(
            screen.getByRole('heading', { name: /most popular/i })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', { name: highlightItems.title })
        ).toBeInTheDocument()

        expect(
            screen.getByRole('heading', { name: gameCardSliderItems[0].title })
        ).toBeInTheDocument()
    })

    it('should render without title', () => {
        render(<Showcase games={props.games} highlight={props.highlight} />)

        screen.getByRole('heading', { name: highlightItems.title })
        screen.getByRole('heading', { name: gameCardSliderItems[0].title })

        expect(
            screen.queryByRole('heading', { name: /most popular/i })
        ).not.toBeInTheDocument()
    })

    it('should render without highlight', () => {
        render(<Showcase title={props.title} games={props.games} />)

        screen.getByRole('heading', { name: /most popular/i })
        screen.getByRole('heading', { name: gameCardSliderItems[0].title })

        expect(
            screen.queryByRole('heading', { name: highlightItems.title })
        ).not.toBeInTheDocument()
    })

    it('should render without games', () => {
        render(<Showcase title={props.title} highlight={props.highlight} />)

        screen.getByRole('heading', { name: /most popular/i })
        screen.getByRole('heading', { name: highlightItems.title })

        expect(
            screen.queryByRole('heading', { name: gameCardSliderItems[0].title })
        ).not.toBeInTheDocument()
    })
})