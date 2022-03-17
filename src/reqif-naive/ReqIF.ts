import { ReqIFHeader } from "./ReqIFHeader"
import { ReqIFContent } from "./ReqIFContent"
import { ReqIFToolExtension } from "./ReqIFToolExtension";

export interface IReqIF {
    lang?: string; //[0..1]
    theHeader?: ReqIFHeader;
    coreContent?: ReqIFContent
    toolExtension?: ReqIFToolExtension;
}

export class ReqIF implements IReqIF {
    theHeader: ReqIFHeader;
    coreContent: ReqIFContent
    toolExtension: ReqIFToolExtension; 

    constructor(props?: IReqIF) {
        if(props) {
            this.theHeader = props['theHeader'] || new ReqIFHeader();
            this.coreContent = props['coreContent'] || new ReqIFContent();
            this.toolExtension = props['toolExtension'] || new ReqIFToolExtension();
        } else {
            this.theHeader = new ReqIFHeader();
            this.coreContent = new ReqIFContent();
            this.toolExtension = new ReqIFToolExtension();
        }
    }
}

//---------------------
//Reserved for future usage to reflect XML properties like lang or used schema
export interface IReqIFMeta {
    lang?: string; //[0..1]
}

export class ReqIFMeta implements IReqIFMeta {
    lang?: string; //[0..1]

    constructor(props?: IReqIFMeta) {
        if(props) {
            this.lang = props['lang'] || "en";
            // this.theHeader = props['theHeader'] || new ReqIFHeader();
            // this.coreContent = props['coreContent'] || new ReqIFContent();
            // this.toolExtension = props['toolExtension'] || new ReqIFToolExtension();
            // this.meta = props['meta'] || new ReqIFMeta();

        } else {
            this.lang = "en";
        }
    }
}