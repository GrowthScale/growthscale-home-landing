import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { AccessibleButton, PrimaryButton, SecondaryButton } from '../ui/accessible-button';

describe('AccessibleButton', () => {
  it('renders correctly with default props', () => {
    render(<AccessibleButton>Click me</AccessibleButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders with primary variant', () => {
    render(<AccessibleButton variant="primary">Primary Button</AccessibleButton>);
    const button = screen.getByText('Primary Button');
    expect(button).toHaveClass('bg-primary-600');
  });

  it('renders with secondary variant', () => {
    render(<AccessibleButton variant="secondary">Secondary Button</AccessibleButton>);
    const button = screen.getByText('Secondary Button');
    expect(button).toHaveClass('bg-secondary-500');
  });

  it('renders with outline variant', () => {
    render(<AccessibleButton variant="outline">Outline Button</AccessibleButton>);
    const button = screen.getByText('Outline Button');
    expect(button).toHaveClass('border-neutral-300');
  });

  it('renders with ghost variant', () => {
    render(<AccessibleButton variant="ghost">Ghost Button</AccessibleButton>);
    const button = screen.getByText('Ghost Button');
    expect(button).toHaveClass('text-neutral-700');
  });

  it('renders with destructive variant', () => {
    render(<AccessibleButton variant="destructive">Destructive Button</AccessibleButton>);
    const button = screen.getByText('Destructive Button');
    expect(button).toHaveClass('bg-destructive');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<AccessibleButton size="sm">Small</AccessibleButton>);
    expect(screen.getByText('Small')).toHaveClass('h-9');

    rerender(<AccessibleButton size="md">Medium</AccessibleButton>);
    expect(screen.getByText('Medium')).toHaveClass('h-10');

    rerender(<AccessibleButton size="lg">Large</AccessibleButton>);
    expect(screen.getByText('Large')).toHaveClass('h-11');

    rerender(<AccessibleButton size="xl">Extra Large</AccessibleButton>);
    expect(screen.getByText('Extra Large')).toHaveClass('h-12');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<AccessibleButton onClick={handleClick}>Click me</AccessibleButton>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles keyboard events', () => {
    const handleClick = vi.fn();
    render(<AccessibleButton onClick={handleClick}>Click me</AccessibleButton>);
    const button = screen.getByText('Click me');
    
    fireEvent.keyDown(button, { key: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);
    
    fireEvent.keyDown(button, { key: ' ' });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('renders with loading state', () => {
    render(<AccessibleButton loading>Loading</AccessibleButton>);
    const button = screen.getByText('Loading');
    expect(button).toHaveClass('cursor-wait');
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('renders with icon on left', () => {
    const icon = <span data-testid="icon">🚀</span>;
    render(<AccessibleButton icon={icon} iconPosition="left">With Icon</AccessibleButton>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toHaveClass('mr-2');
  });

  it('renders with icon on right', () => {
    const icon = <span data-testid="icon">🚀</span>;
    render(<AccessibleButton icon={icon} iconPosition="right">With Icon</AccessibleButton>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toHaveClass('ml-2');
  });

  it('applies custom className', () => {
    render(<AccessibleButton className="custom-class">Custom</AccessibleButton>);
    expect(screen.getByText('Custom')).toHaveClass('custom-class');
  });

  it('renders disabled state', () => {
    render(<AccessibleButton disabled>Disabled</AccessibleButton>);
    const button = screen.getByText('Disabled');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50');
  });

  it('renders with aria attributes', () => {
    render(
      <AccessibleButton 
        ariaLabel="Custom label"
        ariaDescribedBy="description"
        ariaExpanded={true}
        ariaPressed={false}
        ariaControls="menu"
        ariaLive="polite"
        role="menuitem"
      >
        Accessible
      </AccessibleButton>
    );
    
    const button = screen.getByText('Accessible');
    expect(button).toHaveAttribute('aria-label', 'Custom label');
    expect(button).toHaveAttribute('aria-describedby', 'description');
    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(button).toHaveAttribute('aria-controls', 'menu');
    expect(button).toHaveAttribute('aria-live', 'polite');
    expect(button).toHaveAttribute('role', 'menuitem');
  });

  it('has minimum touch target size for accessibility', () => {
    render(<AccessibleButton>Touch Target</AccessibleButton>);
    const button = screen.getByText('Touch Target');
    expect(button).toHaveClass('min-h-[44px]');
    expect(button).toHaveClass('min-w-[44px]');
  });

  it('has focus styles for accessibility', () => {
    render(<AccessibleButton>Focusable</AccessibleButton>);
    const button = screen.getByText('Focusable');
    expect(button).toHaveClass('focus-visible:ring-2');
    expect(button).toHaveClass('focus-visible:ring-primary-600');
  });
});

describe('PrimaryButton', () => {
  it('renders with primary variant by default', () => {
    render(<PrimaryButton>Primary</PrimaryButton>);
    const button = screen.getByText('Primary');
    expect(button).toHaveClass('bg-primary-600');
  });
});

describe('SecondaryButton', () => {
  it('renders with secondary variant by default', () => {
    render(<SecondaryButton>Secondary</SecondaryButton>);
    const button = screen.getByText('Secondary');
    expect(button).toHaveClass('bg-secondary-500');
  });
});
