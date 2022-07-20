import { Context } from "react";
import { EditableContext } from "./ReactEditableContext";
/**
 * a struct for indicating an editable context field
 **/
declare type Param = {
    /**
     * the display name on the tooltip
     **/
    name: string;
    /**
     * the field of the context associated to this Param
     **/
    field: string;
    /**
     * a list of the values you can select for the field in the tooltip (they must be strings)
     **/
    vals: string[];
    /**
     * a list of the names associated with the values. They should appear in the same order.
     **/
    names: string[];
    /**
     * the default value selected
     **/
    default: string;
};
declare type EditableContext = {
    params?: Param[];
    val?: any;
};
declare let editableContext: EditableContext;
/**
 * make a decorator for creating the context you want to edit.
 * @param Ctx the context you want to be able to edit
 * @param params a list with the parameters you want to be able to edit in the context, which are references to Ctx parameters
 **/
declare const editableContextDecorator: (Ctx: Context<any>, params: Param[]) => (...args: any) => any;
export type { EditableContext, Param };
export { editableContextDecorator, editableContext };
