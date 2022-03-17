//TODO: write correct implementation

export class ReqIFToolExtension {
    extensions: string[]; //temporary data to prevent linter error. To be removed

    constructor(props?: ReqIFToolExtension) {
        if(props) {
            this.extensions = props['extensions'] || [];
        } else {
            this.extensions = [];
        }
    }
}