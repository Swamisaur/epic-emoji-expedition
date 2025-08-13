/**
 * @file device.ts
 * @description Contains utility functions for device and browser detection.
 */

/**
 * Checks if the user is on an iOS device (iPhone, iPad, iPod).
 * This is useful for applying iOS-specific workarounds, such as for the Fullscreen API.
 * @returns {boolean} True if the user is on an iOS device, false otherwise.
 */
export const isIOS = (): boolean => {
    // The `!window.MSStream` part is to exclude IE11 on Windows Phone.
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
};
