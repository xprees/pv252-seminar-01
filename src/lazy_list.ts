const template = document.createElement("template");
template.innerHTML = `
<style>
#list {
  height: var(--height);
  width: var(--width);  
  border: var(--border);
  padding: var(--padding);
  overflow: scroll;
  scrollbar-width: none;
}
#spacer-top {
  width: 100%;
  height: 0px;
}
#spacer-bottom {
  width: 100%;
  height: 1000px;
}
</style>
<div id="list">
  <div id="spacer-top"></div>
  <slot></slot>
  <div id="spacer-bottom"></div>
</div>
`;

export type Renderer<T> = (item: T) => HTMLElement;

export class LazyList<T> extends HTMLElement {
  // By default, the list renders the items as div-s with strings in them.
  #renderFunction: Renderer<T> = (item) => {
    const element = document.createElement("div");
    element.innerText = JSON.stringify(item);
    return element;
  };

  // These could be useful properties to consider, but not mandatory to use.
  // Similarly, feel free to edit the shadow DOM template in any way you want.

  // By default, the list is empty.
  #data: T[] = [];

  // The index of the first visible data item.
  #visiblePosition: number = 0;

  // The amount of space that needs to be shown before the first visible item.
  #topOffset: number = 0;
  #topOffsetElement: HTMLElement;
  // The amount of space that needs to be shown after the last visible item.
  #bottomOffset: number = 0;
  #bottomOffsetElement: HTMLElement;

  // The container that stores the spacer elements and the slot where items are inserted.
  #listElement: HTMLElement;

  static register() {
    customElements.define("lazy-list", LazyList);
  }

  constructor() {
    super();
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.#topOffsetElement =
      this.shadowRoot.querySelector<HTMLElement>("#spacer-top")!;
    this.#bottomOffsetElement =
      this.shadowRoot.querySelector<HTMLElement>("#spacer-bottom")!;
    this.#listElement = this.shadowRoot.querySelector<HTMLElement>("#list")!;

    this.#listElement.onscroll = () =>
      this.onScrollPositionChanged(this.#listElement.scrollTop);
  }

  setData(data: T[]) {
    this.#data = data;
    this.reRenderData(data);
  }

  setRenderer(renderer: Renderer<T>) {
    this.#renderFunction = renderer;
    this.reRenderData(this.#data);
  }

  private reRenderData(data: T[]) {
    // Render the items that are visible
    for (const item of data.slice(this.#visiblePosition, 1)) {
      const renderedItem = this.#renderFunction(item);
      this.appendChild(renderedItem);
    }
    // TODO Implement

    // Update the visible position.
  }

  private onScrollPositionChanged(topOffset: number) {
    this.#topOffsetElement.style.height = `${topOffset}}px`;

    console.log(topOffset);
    // TODO Implement
    // Calculate the height of the spacer-top.
    // Calculate the height of the spacer-bottom.

    // TODO update visible items

    this.#listElement.scrollTop = topOffset;
  }
}
