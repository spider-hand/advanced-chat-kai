import { AdvancedChatKai } from "../components/advanced-chat-kai";
import { ChatActionList } from "../components/shared/action-list";
import { ChatAvatar } from "../components/shared/avatar";
import { ChatContainer } from "../components/container/container";
import { ChatDeletedMessage } from "../components/container/message/deleted-message";
import { ChatDialog } from "../components/container/dialog";
import { ChatEmojiPicker } from "../components/shared/emoji-picker";
import { ChatFooterAttachmentSection } from "../components/container/footer-attachment-section";
import { ChatFooterReplyToSection } from "../components/container/footer-reply-to-section";
import { ChatFooter } from "../components/container/footer";
import { ChatHeader } from "../components/container/header";
import { ChatLoader } from "../components/shared/loader";
import { ChatMessageAttachmentList } from "../components/container/message/message-attachment-list";
import { ChatMessageDivider } from "../components/container/message/message-divider";
import { ChatMessageItem } from "../components/container/message/message-item";
import { ChatMessageList } from "../components/container/message/message-list";
import { ChatMessageMenu } from "../components/container/message/message-menu";
import { ChatMessageReactionList } from "../components/container/message/message-reaction-list";
import { ChatMessageReplyTo } from "../components/container/message/message-reply-to";
import { ChatMessageTyping } from "../components/container/message/message-typing";
import { ChatNotificationBadge } from "../components/container/message/notification-badge";
import { ChatRoomItem } from "../components/sidebar/room-item";
import { ChatRoomList } from "../components/sidebar/room-list";
import { ChatSearch } from "../components/sidebar/search";
import { ChatSidebar } from "../components/sidebar/sidebar";
import { ChatSuggestionList } from "../components/container/message/suggestion-list";

customElements.define("advanced-chat-kai", AdvancedChatKai);
customElements.define("chat-action-list", ChatActionList);
customElements.define("chat-avatar", ChatAvatar);
customElements.define("chat-container", ChatContainer);
customElements.define("chat-deleted-message", ChatDeletedMessage);
customElements.define("chat-dialog", ChatDialog);
customElements.define("chat-emoji-picker", ChatEmojiPicker);
customElements.define(
  "chat-footer-attachment-section",
  ChatFooterAttachmentSection,
);
customElements.define("chat-footer-reply-to-section", ChatFooterReplyToSection);
customElements.define("chat-footer", ChatFooter);
customElements.define("chat-header", ChatHeader);
customElements.define("chat-loader", ChatLoader);
customElements.define("chat-message-divider", ChatMessageDivider);
customElements.define(
  "chat-message-attachment-list",
  ChatMessageAttachmentList,
);
customElements.define("chat-message-item", ChatMessageItem);
customElements.define("chat-message-list", ChatMessageList);
customElements.define("chat-message-menu", ChatMessageMenu);
customElements.define("chat-message-reaction-list", ChatMessageReactionList);
customElements.define("chat-message-reply-to", ChatMessageReplyTo);
customElements.define("chat-message-typing", ChatMessageTyping);
customElements.define("chat-notification-badge", ChatNotificationBadge);
customElements.define("chat-room-item", ChatRoomItem);
customElements.define("chat-room-list", ChatRoomList);
customElements.define("chat-search", ChatSearch);
customElements.define("chat-sidebar", ChatSidebar);
customElements.define("chat-suggestion-list", ChatSuggestionList);
