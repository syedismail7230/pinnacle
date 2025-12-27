import React, { useEffect } from 'react';
import Shepherd from 'shepherd.js';
import { useLocation, useNavigate } from 'react-router-dom';

const Tour = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if tour is already completed or if we are not on the dashboard overview
    const tourCompleted = localStorage.getItem('tourCompleted');
    if (tourCompleted === 'true' || !location.pathname.includes('/dashboard/overview')) {
      return;
    }

    // Only run tour on desktop for better UX
    if (window.innerWidth < 1024) return;

    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      defaultStepOptions: {
        classes: 'shadow-2xl bg-white text-gray-800 rounded-2xl',
        scrollTo: { behavior: 'smooth', block: 'center' },
        cancelIcon: {
          enabled: true
        }
      }
    });

    // 1. Welcome Step
    tour.addStep({
      id: 'welcome',
      title: 'Welcome to Pinnacle',
      text: 'Your comprehensive GST Analytics dashboard. Let us show you around quickly to help you get the most out of our platform.',
      attachTo: { element: 'body', on: 'center' },
      buttons: [
        {
          text: 'Skip Tour',
          classes: 'shepherd-button-secondary',
          action: () => {
             tour.cancel();
             localStorage.setItem('tourCompleted', 'true');
          }
        },
        {
          text: 'Start Tour',
          classes: 'shepherd-button',
          action: tour.next
        }
      ]
    });

    // 2. Global Search
    tour.addStep({
        id: 'search',
        title: 'Global Search',
        text: 'Quickly find invoices, vendors, or navigate to any page using our smart search. Just press <b>Cmd+K</b> or <b>Ctrl+K</b> anywhere.',
        attachTo: { element: '#global-search-container', on: 'bottom' },
        buttons: [
            { text: 'Back', classes: 'shepherd-button-secondary', action: tour.back },
            { text: 'Next', classes: 'shepherd-button', action: tour.next }
        ]
    });

    // 3. Sidebar Navigation
    tour.addStep({
        id: 'navigation',
        title: 'Main Navigation',
        text: 'Access different modules here. Switch between your <b>Input Tax Credit</b> analysis, <b>Sales Register</b>, and <b>Compliance</b> checks.',
        attachTo: { element: '#sidebar-nav', on: 'right' },
        buttons: [
            { text: 'Back', classes: 'shepherd-button-secondary', action: tour.back },
            { text: 'Next', classes: 'shepherd-button', action: tour.next }
        ]
    });

    // 4. Key Metrics
    tour.addStep({
      id: 'stats',
      title: 'Financial Pulse',
      text: 'Get an instant snapshot of your Tax Liability, ITC Claimed, and Net Payable amounts.',
      attachTo: { element: '#overview-stats-grid', on: 'bottom' },
      buttons: [
        { text: 'Back', classes: 'shepherd-button-secondary', action: tour.back },
        { text: 'Next', classes: 'shepherd-button', action: tour.next }
      ]
    });

    // 5. Charts
    tour.addStep({
        id: 'charts',
        title: 'Analytics & Trends',
        text: 'Visualize your monthly sales trends and liability vs. ITC comparison charts to identify gaps instantly.',
        attachTo: { element: '#overview-charts-section', on: 'top' },
        buttons: [
          { text: 'Back', classes: 'shepherd-button-secondary', action: tour.back },
          { text: 'Next', classes: 'shepherd-button', action: tour.next }
        ]
    });

    // 6. Alerts
    tour.addStep({
      id: 'alerts',
      title: 'Compliance Alerts',
      text: 'Never miss a deadline. We notify you of critical issues like ITC mismatches or upcoming filing dates here.',
      attachTo: { element: '#overview-alerts-card', on: 'left' },
      buttons: [
        { text: 'Back', classes: 'shepherd-button-secondary', action: tour.back },
        { text: 'Next', classes: 'shepherd-button', action: tour.next }
      ]
    });

    // 7. Credits & Profile
    tour.addStep({
        id: 'credits',
        title: 'Credits & Profile',
        text: 'Check your report generation credits here. Click your profile to manage settings or connect more GSTINs.',
        attachTo: { element: '#header-profile', on: 'bottom' },
        buttons: [
          { text: 'Back', classes: 'shepherd-button-secondary', action: tour.back },
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

    // Delay start slightly to ensure DOM is fully painted
    const timer = setTimeout(() => {
        if(document.querySelector('#overview-stats-grid')) {
            tour.start();
        }
    }, 1000);

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