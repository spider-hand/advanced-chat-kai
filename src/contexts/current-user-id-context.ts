import { createContext } from "@lit/context";

export const currentUserIdContext = createContext<string | null>("current-user-id");
