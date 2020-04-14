import { Component, Element, Event, EventEmitter, Method, Prop, State, h } from '@stencil/core';

let id = 0;

/** @slot - The radio's label. */

@Component({
  tag: 'sl-radio',
  styleUrl: 'radio.scss',
  shadow: true
})
export class Radio {
  id = `sl-radio-${++id}`;
  labelId = `sl-radio-label-${id}`;
  input: HTMLInputElement;

  constructor() {
    this.handleClick = this.handleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  @Element() host: HTMLElement;

  @State() hasFocus = false;

  /** A native input's name attribute. */
  @Prop() name: string;

  /** The native input's value attribute. */
  @Prop() value: string;

  /** Set to true to disable the radio. */
  @Prop() disabled = false;

  /** Set to true to draw the radio in a checked state. */
  @Prop({ mutable: true }) checked = false;

  /** Emitted when the control loses focus. */
  @Event() slBlur: EventEmitter;

  /** Emitted when the control's state changes. */
  @Event() slChange: EventEmitter;

  /** Emitted when the control gains focus. */
  @Event() slFocus: EventEmitter;

  /** Sets focus on the radio. */
  @Method()
  async setFocus() {
    this.input.focus();
  }

  /** Removes focus from the radio. */
  @Method()
  async removeFocus() {
    this.input.blur();
  }

  handleClick(event: MouseEvent) {
    const slChange = this.slChange.emit();

    if (slChange.defaultPrevented) {
      event.preventDefault();
    } else {
      this.checked = this.input.checked;
    }
  }

  handleBlur() {
    this.hasFocus = false;
    this.slBlur.emit();
  }

  handleFocus() {
    this.hasFocus = true;
    this.slFocus.emit();
  }

  render() {
    return (
      <label
        htmlFor={this.id}
        role="radio"
        class={{
          'sl-radio': true,
          'sl-radio--checked': this.checked,
          'sl-radio--disabled': this.disabled,
          'sl-radio--focused': this.hasFocus
        }}
      >
        <span class="sl-radio__control">
          <span class="sl-radio__icon">
            <svg viewBox="0 0 16 16">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g fill="currentColor">
                  <circle cx="8" cy="8" r="3.42857143"></circle>
                </g>
              </g>
            </svg>
          </span>

          <input
            ref={el => (this.input = el)}
            id={this.id}
            type="radio"
            name={this.name}
            value={this.value}
            checked={this.checked}
            disabled={this.disabled}
            aria-labeledby={this.labelId}
            onClick={this.handleClick}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
          />
        </span>

        <span id={this.labelId} class="sl-radio__label">
          <slot />
        </span>
      </label>
    );
  }
}
