if (module && module.hot && module.hot.decline) {
  module.hot.decline();
}

import { editableContextDecorator, EditableContext } from "./EditableContextDecorator";

// make it work with --isolatedModules
export default {editableContextDecorator, EditableContext};
