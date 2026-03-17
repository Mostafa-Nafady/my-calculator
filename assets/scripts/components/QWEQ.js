/**
 * QWEQ Component
 * A component for displaying QWEQ Analysis information
 */

/**
 * Creates a QWEQ information display element
 * @param {Object} qweqData - The QWEQ data to display
 * @param {string} qweqData.title - The title of the QWEQ section
 * @param {string} [qweqData.description] - Optional description text
 * @param {Array<{label: string, value: string}>} [qweqData.metrics] - Optional metrics to display
 * @returns {HTMLElement} The QWEQ container element
 */
function createQWEQ(qweqData) {
  const container = document.createElement('div');
  container.className = 'qweq-container';
  
  // Create title element
  if (qweqData.title) {
    const titleElement = document.createElement('h2');
    titleElement.textContent = qweqData.title;
    container.appendChild(titleElement);
  }
  
  // Create description element
  if (qweqData.description) {
    const descElement = document.createElement('p');
    descElement.className = 'qweq-description';
    descElement.textContent = qweqData.description;
    container.appendChild(descElement);
  }
  
  // Create metrics section if metrics are provided
  if (qweqData.metrics && qweqData.metrics.length > 0) {
    const metricsContainer = document.createElement('div');
    metricsContainer.className = 'qweq-metrics';
    
    qweqData.metrics.forEach(metric => {
      const metricItem = document.createElement('div');
      metricItem.className = 'qweq-metric-item';
      
      const metricLabel = document.createElement('span');
      metricLabel.className = 'qweq-metric-label';
      metricLabel.textContent = metric.label;
      
      const metricValue = document.createElement('span');
      metricValue.className = 'qweq-metric-value';
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
 * Renders the QWEQ component into a container element
 * @param {string} containerId - The ID of the container element
 * @param {Object} qweqData - The QWEQ data to display
 * @param {string} qweqData.title - The title of the QWEQ section
 * @param {string} [qweqData.description] - Optional description text
 * @param {Array<{label: string, value: string}>} [qweqData.metrics] - Optional metrics to display
 */
function renderQWEQ(containerId, qweqData) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID '${containerId}' not found`);
    return;
  }
  
  const qweqElement = createQWEQ(qweqData);
  container.appendChild(qweqElement);
}

/**
 * Updates an existing QWEQ component with new data
 * @param {string} containerId - The ID of the container element
 * @param {Object} qweqData - The new QWEQ data to display
 * @param {string} qweqData.title - The title of the QWEQ section
 * @param {string} [qweqData.description] - Optional description text
 * @param {Array<{label: string, value: string}>} [qweqData.metrics] - Optional metrics to display
 */
function updateQWEQ(containerId, qweqData) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container with ID '${containerId}' not found`);
    return;
  }
  
  // Clear existing content
  container.innerHTML = '';
  
  // Create and append new QWEQ element
  const qweqElement = createQWEQ(qweqData);
  container.appendChild(qweqElement);
}

/**
 * Creates a default QWEQ component with sample data
 * @returns {HTMLElement} The QWEQ container element with default data
 */
function createDefaultQWEQ() {
  const defaultData = {
    title: 'QWEQ Analysis',
    description: 'QWEQ monitoring and analysis system.',
    metrics: [
      { label: 'Current Status', value: 'Active' },
      { label: 'Performance', value: 'Optimal' },
      { label: 'Efficiency Rating', value: '95%' }
    ]
  };
  
  return createQWEQ(defaultData);
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createQWEQ, renderQWEQ, updateQWEQ, createDefaultQWEQ };
}

