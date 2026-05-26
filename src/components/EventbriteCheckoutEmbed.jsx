import { useEffect } from 'react';

export default function EventbriteCheckoutEmbed({ eventId, height = 425 }) {
  const containerId = `eventbrite-widget-container-${eventId}`;

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;

    const tryCreate = () => {
      if (cancelled) return;
      if (window.EBWidgets && typeof window.EBWidgets.createWidget === 'function') {
        try {
          window.EBWidgets.createWidget({
            widgetType: 'checkout',
            eventId: String(eventId),
            iframeContainerId: containerId,
            iframeContainerHeight: height,
          });
          console.info('[Eventbrite] widget initialized for event', eventId);
        } catch (err) {
          console.error('[Eventbrite] createWidget failed:', err);
        }
        return;
      }
      attempts += 1;
      if (attempts > 50) {
        console.warn('[Eventbrite] eb_widgets.js never loaded — falling back to link');
        return;
      }
      setTimeout(tryCreate, 100);
    };

    tryCreate();
    return () => { cancelled = true; };
  }, [eventId, containerId, height]);

  return <div id={containerId} className="eventbrite-embed" />;
}
