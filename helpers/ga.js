export const GA_ID = "UA-133544678-3";

export const trackPageView = url => {
  try {
    // eslint-disable-next-line
    window.gtag("config", GA_ID, {
      page_location: url
    });
  } catch (error) {
    // silence possible errors
  }
};

export const trackEvent = (eventName, label) => {
  try {
    // eslint-disable-next-line
    window.gtag("event", eventName, {
      send_to: GA_ID,
      event_category: "general",
      event_label: label
    });
  } catch (error) {
    // silence possible errors
  }
};
