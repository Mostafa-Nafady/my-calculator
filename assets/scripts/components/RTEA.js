/**
 * RTEA Component
 * A component for displaying Real-Time Energy Analysis (RTEA) information
 */

/**
 * Creates an RTEA information display element
 * @param {Object} rteaData - The RTEA data to display
 * @param {string} rteaData.title - The title of the RTEA section
 * @param {string} [rteaData.description] - Optional description text
 * @param {Array<{label: string, value: string}>} [rteaData.metrics] - Optional metrics to display
 * @returns {HTMLElement} The RTEA container element
 */
function createRTEA(rteaData) {
  const container = document.createElement('div');
  container.className = 'rtea-container';
  
  // Create title element
  if (rteaData.title) {
    const titleElement = document.createElement('h2');
    titleElement.textContent = rteaData.title;
    container.appendChild(titleElement);
  }
  
  // Create description element
  if (rteaData.description) {
    const descElement = document.createElement('p');
    descElement.className = 'rtea-description';
    descElement.textContent = rteaData.description;
    container.appendChild(descElement);
  }
  
  // Create metrics section if metrics are provided
  if (rteaData.metrics && rteaData.metrics.length > 0) {
    const metricsContainer = document.createElement('div');
    metricsContainer.className = 'rtea-metrics';
    
    rteaData.metrics.forEach(metric => {
      const metricItem = document.createElement('div');
      metricItem.className = 'rtea-metric-item';
      
      const metricLabel = document.createElement('span');
      metricLabel.className = 'rtea-metric-label';
      metricLabel.textContent = metric.label;
      
      const metricValue = document.createElement('span');
      metricValue.className = 'rtea-metric-value';
      metricValue.textContent = metric.value;
      
      metricItem.appendChild(metricLabel);
      metricItem.appendChild(metricValue);
      metricsContainer.appendChild(metricItem);
    });
    
    container.appendChild(metricsContainer);
  }
  
  return container;
}

/**
 * Renders the RTEA component into a container element
 * @param {string} containerId - The ID of the container element
 * @param {Object} rteaData - The RTEA data to display
 * @param {string} rteaData.title - The title of the RTEA section
 * @param {string} [rteaData.description] - Optional description text
 * @param {Array<{label: string, value: string}>} [rteaData.metrics] - Optional metrics to display
 */
function renderRTEA(containerId, rteaData) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID '${containerId}' not found`);
    return;
  }
  
  const rteaElement = createRTEA(rteaData);
  container.appendChild(rteaElement);
}

/**
 * Updates an existing RTEA component with new data
 * @param {string} containerId - The ID of the container element
 * @param {Object} rteaData - The new RTEA data to display
 * @param {string} rteaData.title - The title of the RTEA section
 * @param {string} [rteaData.description] - Optional description text
 * @param {Array<{label: string, value: string}>} [rteaData.metrics] - Optional metrics to display
 */
function updateRTEA(containerId, rteaData) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID '${containerId}' not found`);
    return;
  }
  
  // Clear existing content
  container.innerHTML = '';
  
  // Create and append new RTEA element
  const rteaElement = createRTEA(rteaData);
  container.appendChild(rteaElement);
}

/**
 * Creates a default RTEA component with sample data
 * @returns {HTMLElement} The RTEA container element with default data
 */
function createDefaultRTEA() {
  const defaultData = {
    title: 'Real-Time Energy Analysis',
    description: 'Monitor and analyze energy consumption in real-time.',
    metrics: [
      { label: 'Current Usage', value: '0 kWh' },
      { label: 'Peak Demand', value: '0 kW' },
      { label: 'Efficiency Rating', value: 'N/A' }
    ]
  };
  
  return createRTEA(defaultData);
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createRTEA, renderRTEA, updateRTEA, createDefaultRTEA };
}

