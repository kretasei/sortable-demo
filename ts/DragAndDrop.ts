class DragAndDrop {
    private prev: Element;

    constructor(private srcSelector: string, private tarSelector: string) { }

    moveToTarget() {
        const src = this.findSrc();
        const tar = this.findTar();
        this.doDnd(src, tar);
    }

    moveToSource() {
        const src = this.findTar();
        const tar = this.findSrc();
        this.doDnd(src, tar);
    }

    private doDnd(src: HTMLElement, tar: HTMLElement) {
        let event;

        let item = this.findItem(src);
        if (!item) {
            return;
        }

        /* dragstart */
        const dragEvent = this.createEvent('dragstart', true);
        item.dispatchEvent(dragEvent);

        /* dragover */
        if (this.prev) {
            event = this.createEvent('dragover');
            event.dataTransfer = dragEvent.dataTransfer;
            this.prev.dispatchEvent(event);
        } else {
            event = this.createEvent('dragover');
            event.dataTransfer = dragEvent.dataTransfer;
            tar.dispatchEvent(event);
        }

        /* drop */
        this.schedule(() => {
            event = this.createEvent('drop');
            event.dataTransfer = dragEvent.dataTransfer;
            tar.dispatchEvent(event);
        });

        /* dragend */
        this.schedule(() => {
            event = this.createEvent('dragend');
            event.dataTransfer = dragEvent.dataTransfer;
            item.dispatchEvent(event);
        });

        /* find ref item for next DnD */
        this.schedule(() => {
            this.prev = this.findItem(tar);
        });
    }

    private createEvent(type: string, needDataTransfer?: boolean) {
        const customEvent = new CustomEvent(type, {
            bubbles: true,
            cancelable: true
        }) as any;
        if (needDataTransfer) {
            customEvent.dataTransfer = new CustomDataTransfer();
        }
        return customEvent;
    }

    private schedule(fn: () => void, millis?: number) {
        let throttleTime = millis ? millis : 1;
        setTimeout(() => {
            fn();
        }, throttleTime);
    }

    private findItem(container: HTMLElement) {
        return container.querySelector('.draggable');
    }

    private findSrc() {
        const src = this.findElement(this.srcSelector);
        if (!src) {
            throw `Source is not found with: '${this.srcSelector}'`;
        }
        return src;
    }

    private findTar(): HTMLElement {
        const tar = this.findElement(this.tarSelector);
        if (!tar) {
            throw `Target is not found with: '${this.tarSelector}'`;
        }
        return tar;
    }

    private findElement(selector: string): HTMLElement | null {
        return document.querySelector(selector);
    }
}

class CustomDataTransfer {
    private data: {
        [key: string]: any;
    };

    constructor() {
        this.data = {};
    }

    getData(type: string) {
        return this.data[type];
    }

    setData(type: string, value: any) {
        this.data[type] = value;
    }
}

// TODO move to index.html
// let dnd = new DragAndDrop('#source', "#target");

// window.moveToSource = () => {
//     dnd.moveToSource()
// };
// window.moveToTarget = () => {
//     dnd.moveToTarget()
// };