import { createContext } from "@lit/context";

export interface DeviceContext {
  isMobile: boolean;
}

export const deviceContext = createContext<DeviceContext>("device");
