import { html, LitElement } from 'lit';
import { property, queryAssignedNodes } from 'lit/decorators.js';

export class HuiSwitch extends LitElement {
  @property({
    type: Boolean,
    reflect: true,
  })
  checked = false;

  @property({ type: String, attribute: 'checked-class' })
  checkedClass = '';

  @property({ type: String, attribute: 'unchecked-class' })
  uncheckedClass = '';

  @queryAssignedNodes()
  slottedNodes!: NodeListOf<HTMLElement>;

  connectedCallback() {
    super.connectedCallback();

    this.addEventListener('click', this.toggle);
    this.addEventListener('keydown', this.onKeyPress);

    this.updateClassList(this.checked);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener('click', this.toggle);
    this.removeEventListener('keydown', this.onKeyPress);
  }

  /**
   * The core of this component.
   *
   * This method dispatches a custom event called
   * hui.switch.toggle which supports cancellation,
   * but does not bubble beyond <hui-switch />.
   *
   * @param e The event to toggle this switch
   */
  toggle(e: Event) {
    if (
      this.dispatchEvent(
        new CustomEvent('hui.switch.toggle', {
          cancelable: true,
          bubbles: false,
        }),
      )
    ) {
      this.checked = !this.checked;
      this.updateClassList(this.checked);
    }
  }

  onKeyPress(e: KeyboardEvent) {
    if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();

      this.toggle(e);
    }
  }

  /**
   * Based on the state of checked,
   * removes or add classes to the relevant nodes.
   *
   * @param checked
   */
  updateClassList(checked: boolean) {
    const uncheckedClassList = this.uncheckedClass.split(' ');
    const checkedClassList = this.checkedClass.split(' ');

    const relevantSlottedNodes = Array.from(this.slottedNodes)
      .filter(
        node =>
          node.nodeType === Node.ELEMENT_NODE &&
          (node.hasAttribute('checked-class') ||
            node.hasAttribute('unchecked-class')),
      )
      .map(node => ({
        node,
        uncheckedClassList:
          node.getAttribute('unchecked-class')?.split(' ') || [],
        checkedClassList: node.getAttribute('checked-class')?.split(' ') || [],
      }));

    if (checked) {
      HuiSwitch.toggleClassLists(this, uncheckedClassList, checkedClassList);

      relevantSlottedNodes.forEach(
        ({ node, uncheckedClassList, checkedClassList }) => {
          HuiSwitch.toggleClassLists(
            node,
            uncheckedClassList,
            checkedClassList,
          );
        },
      );
    } else {
      HuiSwitch.toggleClassLists(this, checkedClassList, uncheckedClassList);

      relevantSlottedNodes.forEach(
        ({ node, uncheckedClassList, checkedClassList }) => {
          HuiSwitch.toggleClassLists(
            node,
            checkedClassList,
            uncheckedClassList,
          );
        },
      );
    }
  }

  render() {
    return html`<slot></slot>`;
  }

  /**
   * For a particular node, remove classes
   * from toRemove and add classes from toAdd.
   *
   * @param node The node to toggle classes on
   * @param toRemove The classes to remove
   * @param toAdd The classes to add
   */
  private static toggleClassLists(
    node: HTMLElement,
    toRemove: Iterable<string>,
    toAdd: Iterable<string>,
  ) {
    node.classList.remove(...toRemove);
    node.classList.add(...toAdd);
  }
}
