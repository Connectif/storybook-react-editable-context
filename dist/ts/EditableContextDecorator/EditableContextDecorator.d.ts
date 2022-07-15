import { Context } from "react";
import { EditableContext } from "./ReactEditableContext";
declare type Param = {
    name: string;
    field: string;
    vals: string[];
    names: string[];
    default: string;
};
declare type EditableContext = {
    params?: Param[];
    val?: any;
};
declare let editableContext: EditableContext;
declare const editableContextDecorator: (Ctx: Context<any>, params: Param[]) => (...args: any) => any;
export type { EditableContext, Param };
export { editableContextDecorator, editableContext };
