/**
 * AWXZ Component
 * A component for displaying AWXZ Analysis information
 */

/**
 * Creates an AWXZ information display element
 * @param {Object} awxzData - The AWXZ data to display
 * @param {string} awxzData.title - The title of the AWXZ section
 * @param {string} [awxzData.description] - Optional description text
 * @param {Array<{label: string, value: string}>} [awxzData.metrics] - Optional metrics to display
 * @returns {HTMLElement} The AWXZ container element
 */
function createAWXZ(awxzData) {
  const container = document.createElement('div');
  container.className = 'awxz-container';
  
  // Create title element
  if (awxzData.title) {
    const titleElement = document.createElement('h2');
    titleElement.textContent = awxzData.title;
    container.appendChild(titleElement);
  }
  
  // Create description element
  if (awxzData.description) {
    const descElement = document.createElement('p');
    descElement.className = 'awxz-description';
    descElement.textContent = awxzData.description;
    container.appendChild(descElement);
  }
  
  // Create metrics section if metrics are provided
  if (awxzData.metrics && awxzData.metrics.length > 0) {
    const metricsContainer = document.createElement('div');
    metricsContainer.className = 'awxz-metrics';
    
    awxzData.metrics.forEach(metric => {
      const metricItem = document.createElement('div');
      metricItem.className = 'awxz-metric-item';
      
      const metricLabel = document.createElement('span');
      metricLabel.className = 'awxz-metric-label';
      metricLabel.textContent = metric.label;
      
      const metricValue = document.createElement('span');
      metricValue.className = 'awxz-metric-value';
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
 * Renders the AWXZ component into a container element
 * @param {string} containerId - The ID of the container element
 * @param {Object} awxzData - The AWXZ data to display
 * @param {string} awxzData.title - The title of the AWXZ section
 * @param {string} [awxzData.description] - Optional description text
 * @param {Array<{label: string, value: string}>} [awxzData.metrics] - Optional metrics to display
 */
function renderAWXZ(containerId, awxzData) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID '${containerId}' not found`);
    return;
  }
  
  const awxzElement = createAWXZ(awxzData);
  container.appendChild(awxzElement);
}

/**
 * Updates an existing AWXZ component with new data
 * @param {string} containerId - The ID of the container element
 * @param {Object} awxzData - The new AWXZ data to display
 * @param {string} awxzData.title - The title of the AWXZ section
 * @param {string} [awxzData.description] - Optional description text
 * @param {Array<{label: string, value: string}>} [awxzData.metrics] - Optional metrics to display
 */
function updateAWXZ(containerId, awxzData) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID '${containerId}' not found`);
    return;
  }
  
  // Clear existing content
  container.innerHTML = '';
  
  // Create and append new AWXZ element
  const awxzElement = createAWXZ(awxzData);
  container.appendChild(awxzElement);
}

/**
 * Creates a default AWXZ component with sample data
 * @returns {HTMLElement} The AWXZ container element with default data
 */
function createDefaultAWXZ() {
  const defaultData = {
    title: 'AWXZ Analysis',
    description: 'AWXZ monitoring and analysis system.',
    metrics: [
      { label: 'Current Status', value: 'Active' },
      { label: 'Performance', value: 'Optimal' },
      { label: 'Efficiency Rating', value: '95%' }
    ]
  };
  
  return createAWXZ(defaultData);
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createAWXZ, renderAWXZ, updateAWXZ, createDefaultAWXZ };
}
