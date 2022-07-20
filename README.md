# Storybook Addon Editable Context

Edit your react context in runtime trough a menu list in the toolbar.

## Install

    npm install -D storybook-react-editable-context

## Usage

Add the following code to your .storybook/main.js file

    module.exports = {
        addons: ['storybook-react-editable-context'],
    };

Then add EditableContextDecorator either locally or globally.
You will need to specify the react Context you want to edit, as well as the parameters you want to be able to edit, with the values you can choose and the default value.

For example, for adding it globally you can write the following:

    const decorators = [
        editableContextDecorator(MyContext, [
            {
                name: "Param1 name",
                field: "param1",
                vals: ["value1", "value2"],
                names: ["Value 1", "Value 2"],
                default: "value1",
            },
            {
                name: "Param 2 name",
                field: "param2",
                vals: ["value1", "value2", "value3"],
                names: ["Value 1", "Value 2", "Value 3"],
                default: "value3",
            },
        ]),
    ];

## Options

`editableContextDecorator` takes the following parameters:

* `Ctx`. The context that will be editable from the toolbar. It is created with CreateContext. Only contexts which are an object containing just string values are suported.
* `params`. The different parameters of the context that will be editable from the toolbar. Each parameters has its display name, its field's name, a list with all the values, a list containing the names for each value, and the default value (which overrides the context's default value for that field).
