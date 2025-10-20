// Mock JSON data (in a real app, you'd fetch from data.json)
const mockData = {
  "classifications": [
    {
      "id": 1,
      "imageName": "cat_001.jpg",
      "imageUrl": "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=300&h=300&fit=crop",
      "predictedClass": "Cat",
      "confidence": 0.98,
      "actualClass": "Cat",
      "status": "correct",
      "timestamp": "2025-01-20T10:30:00Z"
    },
    {
      "id": 2,
      "imageName": "dog_001.jpg",
      "imageUrl": "https://images.unsplash.com/photo-1633722715463-d30628519d84?w=300&h=300&fit=crop",
      "predictedClass": "Dog",
      "confidence": 0.95,
      "actualClass": "Dog",
      "status": "correct",
      "timestamp": "2025-01-20T10:35:00Z"
    },
    {
      "id": 3,
      "imageName": "bird_001.jpg",
      "imageUrl": "https://images.unsplash.com/photo-1444464666175-1bc29338b63f?w=300&h=300&fit=crop",
      "predictedClass": "Bird",
      "confidence": 0.87,
      "actualClass": "Bird",
      "status": "correct",
      "timestamp": "2025-01-20T10:40:00Z"
    },
    {
      "id": 4,
      "imageName": "car_001.jpg",
      "imageUrl": "https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=300&h=300&fit=crop",
      "predictedClass": "Truck",
      "confidence": 0.72,
      "actualClass": "Car",
      "status": "incorrect",
      "timestamp": "2025-01-20T10:45:00Z"
    },
    {
      "id": 5,
      "imageName": "flower_001.jpg",
      "imageUrl": "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=300&h=300&fit=crop",
      "predictedClass": "Flower",
      "confidence": 0.91,
      "actualClass": "Flower",
      "status": "correct",
      "timestamp": "2025-01-20T10:50:00Z"
    },
    {
      "id": 6,
      "imageName": "tree_001.jpg",
      "imageUrl": "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=300&fit=crop",
      "predictedClass": "Tree",
      "confidence": 0.93,
      "actualClass": "Tree",
      "status": "correct",
      "timestamp": "2025-01-20T10:55:00Z"
    }
  ]
};

// Chart initialization
function initChart() {
    const canvas = document.getElementById('severityChart');
    const ctx = canvas.getContext('2d');
    
    const data = database.severityData;
    const width = canvas.width = canvas.offsetWidth;
    const height = canvas.height = 300;
    
    const maxValue = Math.max(...data.map(d => d.severity));
    const padding = 60;
    const chartWidth = width - (padding * 2);
    const chartHeight = height - (padding * 2);
    
    // Background
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, width, height);
    
    // Y-axis labels and grid lines
    ctx.fillStyle = '#999';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'right';
    for (let i = 0; i <= 4; i++) {
        const y = padding + (chartHeight / 4) * i;
        const value = Math.round((maxValue / 4) * (4 - i));
        ctx.fillText(value, padding - 10, y + 4);
        
        ctx.strokeStyle = '#e0e0e0';
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }
    
    // Draw bars
    const barWidth = chartWidth / data.length;
    ctx.fillStyle = '#6b5ba1';
    
    data.forEach((item, index) => {
        const x = padding + (index * barWidth) + (barWidth * 0.2);
        const barHeight = (item.severity / maxValue) * chartHeight;
        const y = height - padding - barHeight;
        
        ctx.fillRect(x, y, barWidth * 0.6, barHeight);
    });
    
    // X-axis labels
    ctx.fillStyle = '#666';
    ctx.textAlign = 'center';
    data.forEach((item, index) => {
        const x = padding + (index * barWidth) + (barWidth / 2);
        const y = height - padding + 25;
        ctx.fillText(item.day, x, y);
    });
}

// In-memory database
const database = {
    models: [
        {
            id: 1,
            name: "Faster R-CNN + EfficientNet-B7",
            accuracy: 96,
            runtime: "2m 34s",
            widthGain: 64,
            lengthGain: 86,
            depthGain: 34,
            createdAt: new Date("2025-01-15")
        },
        {
            id: 2,
            name: "YOLOv8 + ResNet50",
            accuracy: 92,
            runtime: "1m 45s",
            widthGain: 58,
            lengthGain: 79,
            depthGain: 28,
            createdAt: new Date("2025-01-10")
        }
    ],
    severityData: [
        { day: "Mon", severity: 120 },
        { day: "Tue", severity: 160 },
        { day: "Wed", severity: 140 },
        { day: "Thu", severity: 90 },
        { day: "Fri", severity: 110 },
        { day: "Sat", severity: 200 },
        { day: "Sun", severity: 85 }
    ],
    users: [
        { id: 1, name: "Sam Wheeler", email: "samwheeler@example.com", points: 637, accuracy: 85, tier: 3 },
        { id: 2, name: "John Doe", email: "john@example.com", points: 520, accuracy: 78, tier: 2 }
    ],
    regions: [
        { id: 1, name: "Southeast Region", pointsPerUser: 52, tier: 3 }
    ]
};

// Display image classifications
function displayClassifications() {
    const container = document.getElementById('classificationsContainer');
    container.innerHTML = '';
    
    mockData.classifications.forEach(item => {
        const card = document.createElement('div');
        card.className = 'classification-card';
        
        const statusClass = item.status === 'correct' ? 'status-correct' : 'status-incorrect';
        const statusText = item.status === 'correct' ? '✓ Correct' : '✗ Incorrect';
        
        card.innerHTML = `
            <img src="${item.imageUrl}" alt="${item.imageName}" class="classification-image" onerror="this.src='https://via.placeholder.com/180?text=Image+Not+Found'">
            <div class="classification-info">
                <div class="classification-name">${item.imageName}</div>
                <div class="classification-predicted">${item.predictedClass}</div>
                <div class="classification-confidence">Confidence: ${(item.confidence * 100).toFixed(0)}%</div>
                <div class="classification-confidence-bar">
                    <div class="confidence-fill" style="width: ${item.confidence * 100}%"></div>
                </div>
                <div class="classification-status ${statusClass}">${statusText}</div>
            </div>
        `;
        
        container.appendChild(card);
    });
}

// Load dashboard data
function loadDashboard() {
    const model = database.models[0];
    document.getElementById('modelTitle').textContent = model.name;
    document.getElementById('accuracy').textContent = model.accuracy + '%';
    document.getElementById('runtime').textContent = model.runtime;
    document.getElementById('widthGain').textContent = model.widthGain + '%';
    document.getElementById('lengthGain').textContent = model.lengthGain + '%';
    document.getElementById('depthGain').textContent = '+' + model.depthGain + '%';
    
    displayClassifications();
    initChart();
}

// Event listeners
document.getElementById('timeframeFilter').addEventListener('change', (e) => {
    console.log('Timeframe changed to:', e.target.value);
    loadDashboard();
});

document.getElementById('peopleFilter').addEventListener('change', (e) => {
    console.log('People filter changed to:', e.target.value);
});

document.getElementById('topicFilter').addEventListener('change', (e) => {
    console.log('Topic filter changed to:', e.target.value);
});

document.getElementById('timeFilter').addEventListener('change', (e) => {
    console.log('Chart time filter changed to:', e.target.value);
    initChart();
});

// Initialize on load
window.addEventListener('load', loadDashboard);
window.addEventListener('resize', () => {
    initChart();
});