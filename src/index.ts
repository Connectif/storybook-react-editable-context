if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}

import { editableContextDecorator } from "./EditableContextDecorator";
import { EditableContext } from "./ReactEditableContext";

// make it work with --isolatedModules
export { editableContextDecorator, EditableContext };
