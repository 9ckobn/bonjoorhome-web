// Utility functions for the application

export const smoothScrollTo = (elementId: string) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

export const makePhoneCall = (phoneNumber: string) => {
  const cleanNumber = phoneNumber.replace(/[^\d+]/g, "");
  window.location.href = `tel:${cleanNumber}`;
};
