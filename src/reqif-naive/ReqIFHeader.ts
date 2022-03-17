import { Identifiable, IIdentifiable } from "./basic/ReqIFBasicClasses";

export interface IReqIFHeader extends IIdentifiable {
    comment?: string; //[0..1]
    creationTime?: Date;
    repositoryId?: string; //[0..1]
    reqIFToolId: string;
    reqIFVersion?: string; //default = 1
    sourceToolId?: string;
    title?: string
}

export class ReqIFHeader extends Identifiable {
    comment: string; //[0..1]
    creationTime: Date;
    repositoryId: string; //[0..1]
    reqIFToolId: string;
    reqIFVersion: string; //default = 1
    sourceToolId: string;
    title: string

    constructor(props?: IReqIFHeader) {
        super(props);
        if(props) {
            this.comment = props["comment"] || "";
            this.creationTime = props["creationTime"] || new Date();
            this.repositoryId = props["repositoryId"] || "";
            this.reqIFToolId = props["reqIFToolId"] || "";
            this.reqIFVersion = props["reqIFVersion"] || "";
            this.sourceToolId = props["sourceToolId"] || "";
            this.title = props["title"] || "";
        } else {
            this.comment = "";
            this.creationTime =  new Date();
            this.repositoryId = "";
            this.reqIFToolId = "yreqif"
            this.reqIFVersion = "1"
            this.sourceToolId = "yreqif"
            this.title = "New reqif file";
        }
    }
}