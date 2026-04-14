import ButtonSize from '../components/Button/ButtonSize.vue'

export default {
  title: 'Components/Button/ButtonSize',
  component: ButtonSize,
  tags: ['autodocs'],
  argTypes: {},
  args: {}
}

/**
 * Display button size variants
 * Shows small, medium, and large buttons
 */
export const AllSizes = {
  render: () => ({
    components: { ButtonSize },
    template: `
      <div style="display: flex; flex-direction: column; gap: 20px; padding: 20px;">
        <div>
          <h4>Small Button</h4>
          <ButtonSize />
        </div>
      </div>
    `
  })
}

export const SizeComparison = {
  render: () => ({
    components: { ButtonSize },
    template: `
      <div style="display: flex; flex-direction: column; gap: 30px; padding: 20px;">
        <div>
          <h4>Button Size Comparison</h4>
          <p style="font-size: 12px; color: #666;">Shows Bootstrap button size variation</p>
          <ButtonSize />
        </div>
        
        <div style="padding: 15px; background-color: #f5f5f5; border-radius: 8px;">
          <h5>Size Classes Used:</h5>
          <ul style="margin: 0; padding-left: 20px;">
            <li><code>btn-sm</code> - Small button</li>
            <li><code>btn</code> - Medium button (default)</li>
            <li><code>btn-lg</code> - Large button</li>
          </ul>
        </div>
      </div>
    `
  })
}
