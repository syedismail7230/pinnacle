import React, { useEffect } from 'react';
import Shepherd from 'shepherd.js';
import { useLocation, useNavigate } from 'react-router-dom';

const Tour = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Only start tour on the dashboard overview page and if not previously completed
    const tourCompleted = localStorage.getItem('tourCompleted');
    if (tourCompleted === 'true' || !location.pathname.includes('/dashboard/overview')) {
      return;
    }

    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        classes: 'shadow-md bg-white text-gray-800',
        scrollTo: true,
        cancelIcon: {
          enabled: true
        }
      }
    });

    tour.addStep({
      id: 'welcome',
      title: 'Welcome to Pinnacle',
      text: 'Welcome to your new GST Analytics Dashboard! Let us show you around quickly.',
      attachTo: {
        element: 'body',
        on: 'bottom'
      },
      buttons: [
        {
          text: 'Skip',
          classes: 'shepherd-button-secondary',
          action: () => {
             tour.cancel();
             localStorage.setItem('tourCompleted', 'true');
          }
        },
        {
          text: 'Next',
          classes: 'shepherd-button',
          action: tour.next
        }
      ]
    });

    tour.addStep({
      id: 'sidebar',
      title: 'Navigation',
      text: 'Use this sidebar to access your ITC Analytics, Sales Register, and Compliance reports.',
      attachTo: {
        element: '#nav-item-input-tax-credit',
        on: 'right'
      },
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: tour.back
        },
        {
          text: 'Next',
          classes: 'shepherd-button',
          action: tour.next
        }
      ]
    });

    tour.addStep({
      id: 'stats',
      title: 'Key Metrics',
      text: 'Get an instant view of your Tax Liability, ITC Claimed, and Net Payable amounts here.',
      attachTo: {
        element: '#overview-stats-grid',
        on: 'bottom'
      },
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: tour.back
        },
        {
          text: 'Next',
          classes: 'shepherd-button',
          action: tour.next
        }
      ]
    });

    tour.addStep({
      id: 'alerts',
      title: 'Critical Alerts',
      text: 'Stay ahead of deadlines and mismatches. We will notify you of critical issues here.',
      attachTo: {
        element: '#overview-alerts-card',
        on: 'left'
      },
      buttons: [
        {
          text: 'Back',
          classes: 'shepherd-button-secondary',
          action: tour.back
        },
        {
            text: 'Finish',
            classes: 'shepherd-button',
            action: () => {
                tour.complete();
                localStorage.setItem('tourCompleted', 'true');
            }
        }
      ]
    });

    // Start the tour after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
        if(document.querySelector('#overview-stats-grid')) {
            tour.start();
        }
    }, 1500);

    return () => {
        clearTimeout(timer);
        if (tour.isActive()) {
            tour.cancel();
        }
    };
  }, [location.pathname]);

  return null;
};

export default Tour;