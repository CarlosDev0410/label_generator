// TypeScript augmentation for WebUSB API
interface USBDevice {
  open(): Promise<void>;
  selectConfiguration(configurationValue: number): Promise<void>;
  claimInterface(interfaceNumber: number): Promise<void>;
  transferOut(
    endpointNumber: number,
    data: BufferSource
  ): Promise<USBOutTransferResult>;
  close(): Promise<void>;
  readonly configuration: USBConfiguration | null;
}

interface USBConfiguration {
  readonly interfaces: ReadonlyArray<USBInterface>;
}

interface USBInterface {
  readonly alternate: USBAlternateInterface;
}

interface USBAlternateInterface {
  readonly endpoints: ReadonlyArray<USBEndpoint>;
}

interface USBEndpoint {
  readonly direction: "in" | "out";
  readonly endpointNumber: number;
}

interface USBOutTransferResult {
  readonly bytesWritten: number;
  readonly status: "ok" | "stall";
}

type USB = {
  requestDevice(options: { filters: Array<{ vendorId?: number }> }): Promise<USBDevice>;
};

declare global {
  interface Navigator {
    usb: USB;
  }
}
