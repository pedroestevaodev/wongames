import '@/.jest/match-media.mock';
import { fireEvent, render, screen, waitFor } from '@/utils/testsHelper';
import { expect } from '@jest/globals';
import Gallery from "@/components/Gallery";
import GalleryMock from "../mocks/mock";

describe('<Gallery />', () => {
	it('should render thumbnails as buttons', () => {
		render(<Gallery items={GalleryMock.slice(0, 2)} />);

		expect(
			screen.getByRole('button', { name: /Thumb da galeria: Gallery Image 1/i })
		).toHaveAttribute('src', expect.stringContaining(encodeURIComponent(GalleryMock[0].src)));

		expect(
			screen.getByRole('button', { name: /Thumb da galeria: Gallery Image 2/i })
		).toHaveAttribute('src', expect.stringContaining(encodeURIComponent(GalleryMock[1].src)));
	});

	it('should handle open modal', () => {
		render(<Gallery items={GalleryMock.slice(0, 2)} />);

		const modal = screen.getByLabelText('modal');

		expect(modal).toHaveAttribute('aria-hidden', 'true');
		expect(modal).toHaveStyle({ opacity: 0, pointerEvents: 'none' });

		fireEvent.click(
			screen.getByRole('button', { name: /Thumb da galeria: Gallery Image 1/i })
		);
		expect(modal).toHaveAttribute('aria-hidden', 'false');
		expect(modal).toHaveStyle({ opacity: 1 });
	})

	it('should open modal with selected image', async () => {
		render(<Gallery items={GalleryMock.slice(0, 2)} />);

		fireEvent.click(
			screen.getByRole('button', { name: /Thumb da galeria: Gallery Image 2/i })
		);

		const img = await screen.findByRole('img', { name: /Gallery Image 2/i });
		expect(img.parentElement?.parentElement).toHaveClass('slick-active');
	});

	it('should handle close modal when overlay or button clicked', async () => {
		render(<Gallery items={GalleryMock.slice(0, 2)} />);

		const modal = screen.getByLabelText('modal');

		fireEvent.click(
			screen.getByRole('button', { name: /Thumb da galeria: Gallery Image 1/i })
		);

		fireEvent.click(screen.getByRole('button', { name: /close modal/i }));

		await waitFor(() => expect(modal).toHaveAttribute('aria-hidden', 'true'));
		expect(modal).toHaveStyle({ opacity: 0 });
	});

	it('should handle close modal when ESC button is pressed', async () => {
		const { container } = render(<Gallery items={GalleryMock.slice(0, 2)} />);

		const modal = screen.getByLabelText('modal');

		fireEvent.click(
			screen.getByRole('button', { name: /Thumb da galeria: Gallery Image 1/i })
		);

		fireEvent.keyUp(container, { key: 'Escape' });

		await waitFor(() => expect(modal).toHaveAttribute('aria-hidden', 'true'));
		expect(modal).toHaveStyle({ opacity: 0 });
	});
});